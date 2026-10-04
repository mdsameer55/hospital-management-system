const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAllAppointments,
  updateAppointmentStatus
} = require("../controllers/appointmentController");

router.get("/", getAllAppointments);
router.post("/", createAppointment);
router.patch("/:id/status", updateAppointmentStatus);

module.exports = router;