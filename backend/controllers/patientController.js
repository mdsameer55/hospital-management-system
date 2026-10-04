const Patient = require("../models/Patient");

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ name: 1 });
    res.status(200).json({ success: true, data: patients });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    // Never send the password hash back
    const { password, ...safe } = patient.toObject();
    res.status(201).json({ success: true, data: safe });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: "A patient with this email already exists" });
    }
    res.status(400).json({ success: false, error: error.message });
  }
};
