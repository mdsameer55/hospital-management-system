import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BookAppointment from './components/BookAppointment';
import AddPatient from './components/AddPatient';
import AddDoctor from './components/AddDoctor';

const linkStyle = { color: '#fff', textDecoration: 'none', fontWeight: 'bold' };

function App() {
  return (
    <Router>
      <nav style={{ display: 'flex', gap: '20px', padding: '15px 30px', background: '#333' }}>
        <Link to="/" style={linkStyle}>Dashboard</Link>
        <Link to="/book" style={linkStyle}>Book Appointment</Link>
        <Link to="/add-patient" style={linkStyle}>Add Patient</Link>
        <Link to="/add-doctor" style={linkStyle}>Add Doctor</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/add-patient" element={<AddPatient />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
      </Routes>
    </Router>
  );
}

export default App;
