import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

export const fetchAppointments = () => API.get('/appointments');
export const createAppointment = (data) => API.post('/appointments', data);
export const updateAppointmentStatus = (id, status) =>
  API.patch(`/appointments/${id}/status`, { status });

export const fetchPatients = () => API.get('/patients');
export const createPatient = (data) => API.post('/patients', data);

export const fetchDoctors = () => API.get('/doctors');
export const createDoctor = (data) => API.post('/doctors', data);
