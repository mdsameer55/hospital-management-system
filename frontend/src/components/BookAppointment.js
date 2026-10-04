import React, { useEffect, useState } from 'react';
import { createAppointment, fetchPatients, fetchDoctors } from '../api';

const emptyForm = { patientId: '', doctorId: '', appointmentDate: '', notes: '' };

const BookAppointment = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchPatients().then((res) => setPatients(res.data.data)).catch(console.error);
    fetchDoctors().then((res) => setDoctors(res.data.data)).catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAppointment(formData);
      alert('Appointment Scheduled Successfully!');
      setFormData(emptyForm);
    } catch (err) {
      alert(`Error: ${err.response?.data?.error || 'Failed to schedule appointment'}`);
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Schedule Appointment</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label>Select Patient:</label>
        <select
          value={formData.patientId}
          onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
          required
          style={{ padding: '8px' }}
        >
          <option value="">-- Select Patient --</option>
          {patients.map((p) => (
            <option key={p._id} value={p._id}>{p.name} ({p.email})</option>
          ))}
        </select>

        <label>Select Doctor:</label>
        <select
          value={formData.doctorId}
          onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
          required
          style={{ padding: '8px' }}
        >
          <option value="">-- Select Doctor --</option>
          {doctors.map((d) => (
            <option key={d._id} value={d._id}>{d.name} - {d.specialization}</option>
          ))}
        </select>

        <label>Date & Time:</label>
        <input
          type="datetime-local"
          value={formData.appointmentDate}
          onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
          required
          style={{ padding: '8px' }}
        />

        <textarea
          placeholder="Notes or Symptoms"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows="3"
          style={{ padding: '8px' }}
        />

        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Schedule Appointment
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
