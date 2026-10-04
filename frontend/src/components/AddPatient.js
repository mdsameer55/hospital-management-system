import React, { useState } from 'react';
import { createPatient } from '../api';

const emptyPatient = {
  name: '',
  email: '',
  password: '',
  age: '',
  gender: 'Male',
  medicalHistory: '',
};

const AddPatient = () => {
  const [patient, setPatient] = useState(emptyPatient);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...patient,
        age: Number(patient.age),
        medicalHistory: patient.medicalHistory
          ? patient.medicalHistory.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
      };
      const res = await createPatient(payload);
      alert(`Patient created! ID: ${res.data.data._id}`);
      setPatient(emptyPatient);
    } catch (err) {
      alert(`Error: ${err.response?.data?.error || 'Failed to register patient'}`);
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Register New Patient</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input type="text" placeholder="Full Name" value={patient.name} onChange={(e) => setPatient({ ...patient, name: e.target.value })} required style={{ padding: '8px' }} />
        <input type="email" placeholder="Email" value={patient.email} onChange={(e) => setPatient({ ...patient, email: e.target.value })} required style={{ padding: '8px' }} />
        <input type="password" placeholder="Password (min 6 characters)" minLength={6} value={patient.password} onChange={(e) => setPatient({ ...patient, password: e.target.value })} required style={{ padding: '8px' }} />
        <input type="number" placeholder="Age" min="0" value={patient.age} onChange={(e) => setPatient({ ...patient, age: e.target.value })} required style={{ padding: '8px' }} />

        <select value={patient.gender} onChange={(e) => setPatient({ ...patient, gender: e.target.value })} style={{ padding: '8px' }}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input type="text" placeholder="Medical History (comma separated)" value={patient.medicalHistory} onChange={(e) => setPatient({ ...patient, medicalHistory: e.target.value })} style={{ padding: '8px' }} />

        <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Register Patient
        </button>
      </form>
    </div>
  );
};

export default AddPatient;
