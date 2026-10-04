const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    age: { type: Number, required: true, min: 0, max: 150 },
    gender: { type: String, enum: ["Male", "Female", "Other"], default: "Male" },
    medicalHistory: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Hash password whenever it is set or changed (works with save() and create())
patientSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("Patient", patientSchema);
