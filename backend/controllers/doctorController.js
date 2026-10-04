const Doctor = require("../models/Doctor");

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ name: 1 });
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: "A doctor with this email already exists" });
    }
    res.status(400).json({ success: false, error: error.message });
  }
};
