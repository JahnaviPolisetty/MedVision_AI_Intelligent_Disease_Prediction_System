import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserMd, FaCalendarCheck, FaCheckCircle } from 'react-icons/fa';

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    doctor: '',
    date: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const patientId = 2; // Hard-coded for demo purposes

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 1. Send POST request
      const API_URL = "https://medvision-ai-intelligent-disease-ugst.onrender.com";
      const response = await fetch(`${API_URL}/book-appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          patient_id: patientId,
          doctor_name: formData.doctor,
          appointment_date: formData.date,
          appointment_time: formData.time
        })
      });

      if (response.ok) {
        // 2. Alert success, clear fields
        alert("Appointment booked successfully");
        setFormData({
          name: '', email: '', doctor: '', date: '', time: ''
        });
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        alert("Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("An error occurred while booking.");
    }
  };

  const doctors = [
    'Dr. Ramesh Kumar - Neurologist',
    'Dr. Lakshmi Priya - Cardiologist',
    'Dr. Suresh Babu - Endocrinologist',
    'Dr. Anitha Reddy - General Surgeon',
    'Dr. Venkatesh Rao - Orthopedist',
    'Dr. Harika Devi - Radiologist',
    'Dr. Sharma - General Physician'
  ];

  return (
    <motion.div 
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-card p-8 rounded-2xl relative h-fit">
        <div className="flex items-center gap-4 mb-6">
          <FaCalendarCheck className="text-4xl text-primary" />
          <h2 className="text-2xl font-bold glow-text text-[var(--text-primary)]">Book Consultation</h2>
        </div>
        
        <p className="text-muted mb-8">
          Schedule a priority appointment with our AI-assisted medical specialists.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label className="form-label">Patient Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="cyber-input"
              placeholder="e.g., John Doe"
            />
          </div>

          <div className="form-group mb-4">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="cyber-input"
              placeholder="e.g., john@example.com"
            />
          </div>

          <div className="form-group mb-4">
            <label className="form-label">Select Specialist</label>
            <div className="relative">
              <FaUserMd className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary z-10 pointer-events-none" />
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
                className="cyber-input pr-10 appearance-none outline-none leading-normal"
                style={{ paddingLeft: '3rem' }}
              >
                <option value="" disabled className="bg-[var(--bg-secondary)] text-[var(--text-secondary)]">Select a specialist...</option>
                {doctors.map((doc, idx) => (
                  <option key={idx} value={doc.split(' - ')[0]} className="bg-[var(--bg-primary)] text-[var(--text-primary)] py-2">
                    {doc}
                  </option>
                ))}
              </select>
              {/* Custom Dropdown Arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                 <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 mb-8">
            <div className="form-group">
              <label className="form-label">Appointment Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="cyber-input"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Appointment Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="cyber-input"
              />
            </div>
          </div>

          <button type="submit" className="btn-cyber primary w-full text-lg py-3 flex justify-center items-center relative overflow-hidden">
            <AnimatePresence>
              {isSuccess && (
                <motion.div 
                  className="absolute inset-0 bg-success flex items-center justify-center text-black font-bold z-10"
                  initial={{ rotateX: 90 }}
                  animate={{ rotateX: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <FaCheckCircle className="mr-2" /> Booking Confirmed
                </motion.div>
              )}
            </AnimatePresence>
            Confirm Appointment
          </button>
        </form>

      </div>
    </motion.div>
  );
};

export default Appointment;
