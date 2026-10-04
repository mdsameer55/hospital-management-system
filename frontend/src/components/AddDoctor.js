import React, { useState } from 'react';
import { createDoctor } from '../api';

const emptyDoctor = {
  name: '',
  specialization: '',
  email: '',
  availableDays: 'Monday, Wednesday, Friday',
};

const AddDoctor = () => {
  const [doctor, setDoctor] = useState(emptyDoctor);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...doctor,
        availableDays: doctor.availableDays.split(',').map((d) => d.trim()).filter(Boolean),
      };
      const res = await createDoctor(payload);
      alert(`Doctor added! ID: ${res.data.data._id}`);
      setDoctor(emptyDoctor);
    } catch (err) {
      alert(`Error: ${err.response?.data?.error || 'Failed to add doctor'}`);
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Add New Doctor</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input type="text" placeholder="Doctor Name (e.g. Dr. John)" value={doctor.name} onChange={(e) => setDoctor({ ...doctor, name: e.target.value })} required style={{ padding: '8px' }} />
        <input type="text" placeholder="Specialization (e.g. Cardiology)" value={doctor.specialization} onChange={(e) => setDoctor({ ...doctor, specialization: e.target.value })} required style={{ padding: '8px' }} />
        <input type="email" placeholder="Email" value={doctor.email} onChange={(e) => setDoctor({ ...doctor, email: e.target.value })} required style={{ padding: '8px' }} />
        <input type="text" placeholder="Available Days (comma separated)" value={doctor.availableDays} onChange={(e) => setDoctor({ ...doctor, availableDays: e.target.value })} required style={{ padding: '8px' }} />

        <button type="submit" style={{ padding: '10px', backgroundColor: '#17a2b8', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
