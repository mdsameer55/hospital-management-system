import { render, screen } from '@testing-library/react';
import App from './App';

// Avoid real network calls (and axios ESM issues in Jest)
jest.mock('./api', () => ({
  fetchAppointments: jest.fn(() => Promise.resolve({ data: { data: [] } })),
  updateAppointmentStatus: jest.fn(),
  fetchPatients: jest.fn(() => Promise.resolve({ data: { data: [] } })),
  fetchDoctors: jest.fn(() => Promise.resolve({ data: { data: [] } })),
  createAppointment: jest.fn(),
  createPatient: jest.fn(),
  createDoctor: jest.fn(),
}));

test('renders navigation links', () => {
  render(<App />);
  expect(screen.getByText('Book Appointment')).toBeInTheDocument();
  expect(screen.getByText('Add Patient')).toBeInTheDocument();
  expect(screen.getByText('Add Doctor')).toBeInTheDocument();
});
