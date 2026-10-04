import React, { useEffect, useState } from 'react';
import { fetchAppointments, updateAppointmentStatus } from '../api';

const statusColor = { Confirmed: 'green', Cancelled: 'red', Pending: 'orange' };

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = () => {
    fetchAppointments()
      .then((res) => setAppointments(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateAppointmentStatus(id, newStatus);
      loadAppointments();
    } catch (err) {
      alert(`Error: ${err.response?.data?.error || 'Failed to update status.'}`);
    }
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Loading appointments...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
      <h2>Hospital Dashboard</h2>
      {appointments.length === 0 ? (
        <p>No appointments scheduled yet.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date & Time</th>
              <th>Notes</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((item) => (
              <tr key={item._id}>
                <td>{item.patientId?.name || 'N/A'}</td>
                <td>
                  {item.doctorId?.name || 'N/A'} ({item.doctorId?.specialization || 'N/A'})
                </td>
                <td>{new Date(item.appointmentDate).toLocaleString()}</td>
                <td>{item.notes || '-'}</td>
                <td>
                  <strong style={{ color: statusColor[item.status] || 'orange' }}>{item.status}</strong>
                </td>
                <td>
                  <button
                    onClick={() => handleStatusChange(item._id, 'Confirmed')}
                    disabled={item.status === 'Confirmed'}
                    style={{ marginRight: '5px', padding: '4px 8px', cursor: 'pointer', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', opacity: item.status === 'Confirmed' ? 0.5 : 1 }}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleStatusChange(item._id, 'Cancelled')}
                    disabled={item.status === 'Cancelled'}
                    style={{ padding: '4px 8px', cursor: 'pointer', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', opacity: item.status === 'Cancelled' ? 0.5 : 1 }}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
