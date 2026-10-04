const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

const errorCode = (error) =>
  error.name === "CastError" || error.name === "ValidationError" ? 400 : 500;

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId", "name email")
      .populate("doctorId", "name specialization")
      .sort({ appointmentDate: 1 });
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, appointmentDate, notes } = req.body;

    const [patient, doctor] = await Promise.all([
      Patient.findById(patientId),
      Doctor.findById(doctorId),
    ]);
    if (!patient) return res.status(404).json({ success: false, error: "Patient not found" });
    if (!doctor) return res.status(404).json({ success: false, error: "Doctor not found" });

    const date = new Date(appointmentDate);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ success: false, error: "Invalid appointment date" });
    }

    // Prevent double-booking the same doctor at the same time
    const clash = await Appointment.findOne({
      doctorId,
      appointmentDate: date,
      status: { $ne: "Cancelled" },
    });
    if (clash) {
      return res
        .status(409)
        .json({ success: false, error: "Doctor already has an appointment at this time" });
    }

    const appointment = await Appointment.create({ patientId, doctorId, appointmentDate: date, notes });
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    res.status(errorCode(error)).json({ success: false, error: error.message });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, error: "Status is required" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!appointment) {
      return res.status(404).json({ success: false, error: "Appointment not found" });
    }
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(errorCode(error)).json({ success: false, error: error.message });
  }
};
