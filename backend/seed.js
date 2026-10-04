const mongoose = require('mongoose');
require('dotenv').config();

const Patient = require('./models/Patient');
const Doctor = require('./models/Doctor');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hospital_db')
  .then(async () => {
    console.log('MongoDB Connected for Seeding...');

    // Clear existing sample data
    await Patient.deleteMany({});
    await Doctor.deleteMany({});

    // Create Doctors
    const doctors = await Doctor.insertMany([
      { name: 'Dr. Sarah Smith', specialization: 'Cardiology', email: 'sarah.smith@hospital.com', availableDays: ['Monday', 'Wednesday'] },
      { name: 'Dr. Rajesh Kumar', specialization: 'Neurology', email: 'rajesh.kumar@hospital.com', availableDays: ['Tuesday', 'Thursday'] }
    ]);

    // Create Patients
    const patients = await Patient.insertMany([
      { name: 'John Doe', email: 'john@example.com', password: 'password123', age: 34, gender: 'Male', medicalHistory: ['Hypertension'] },
      { name: 'Jane Miller', email: 'jane@example.com', password: 'password123', age: 28, gender: 'Female', medicalHistory: ['Asthma'] }
    ]);

    console.log('\n--- SAMPLE SEED DATA CREATED ---');
    console.log('\nDoctors:');
    doctors.forEach(doc => console.log(`ID: ${doc._id} | Name: ${doc.name} (${doc.specialization})`));

    console.log('\nPatients:');
    patients.forEach(pat => console.log(`ID: ${pat._id} | Name: ${pat.name}`));

    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Seeding Error:', err);
    mongoose.connection.close();
  });