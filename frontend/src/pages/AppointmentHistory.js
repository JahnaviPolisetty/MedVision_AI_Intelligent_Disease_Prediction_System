import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaUserMd } from 'react-icons/fa';

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Standard patient ID for demonstration
  const patientId = 2;

  // Fetch all appointments on mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const API_URL = "https://medvision-ai-intelligent-disease-ugst.onrender.com";
        const response = await fetch(`${API_URL}/appointments/${patientId}`);
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        }
      } catch (error) {
        console.error("Failed to fetch appointment history:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAppointments();
  }, [patientId]);

  // Filter appointments by doctor name or status
  const filteredAppointments = appointments.filter(appt => 
    appt.doctor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appt.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      className="max-w-7xl mx-auto flex flex-col gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-card p-8 rounded-2xl relative h-fit flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <FaCalendarAlt className="text-4xl text-primary" />
          <div>
            <h2 className="text-2xl font-bold glow-text text-[var(--text-primary)]">Appointment History</h2>
            <p className="text-muted text-sm mt-1">Track and manage your scheduled consultations</p>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full xl:w-72 mt-4 xl:mt-0">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search Specialist or Status..." 
            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-light)] text-[var(--text-primary)] rounded-lg pl-12 pr-4 py-2 focus:outline-none focus:border-primary transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <motion.div 
        className="glass-card p-6 rounded-2xl flex-grow min-h-[500px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center py-20 text-primary">
            <span className="animate-pulse font-semibold tracking-wide">LOADING SCHEDULE...</span>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="w-full h-full flex flex-col justify-center items-center py-20 text-muted">
            <p className="border border-dashed border-gray-700 p-8 rounded-xl">No appointments found matching your search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-4 px-6 text-[var(--accent-blue)] font-bold text-xs tracking-widest uppercase bg-[var(--bg-secondary)] rounded-tl-lg">Reference ID</th>
                  <th className="py-4 px-6 text-[var(--accent-blue)] font-bold text-xs tracking-widest uppercase bg-[var(--bg-secondary)]">Doctor / Specialist</th>
                  <th className="py-4 px-6 text-[var(--accent-blue)] font-bold text-xs tracking-widest uppercase bg-[var(--bg-secondary)]">Scheduled Date</th>
                  <th className="py-4 px-6 text-[var(--accent-blue)] font-bold text-xs tracking-widest uppercase bg-[var(--bg-secondary)]">Time</th>
                  <th className="py-4 px-6 text-[var(--accent-blue)] font-bold text-xs tracking-widest uppercase bg-[var(--bg-secondary)] rounded-tr-lg">Current Status</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredAppointments.map((appt, idx) => (
                    <motion.tr 
                      key={appt.id || idx} 
                      className="border-b border-gray-800/60 hover:bg-gray-800/40 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <td className="py-4 px-6 text-[var(--text-secondary)] font-mono text-sm">#{appt.id}</td>
                      <td className="py-4 px-6 text-[var(--text-primary)] font-medium flex items-center gap-2">
                        <FaUserMd className="text-primary/70" />
                        {appt.doctor_name}
                      </td>
                      <td className="py-4 px-6 text-[var(--text-secondary)]">
                        {appt.appointment_date}
                      </td>
                      <td className="py-4 px-6 text-[var(--text-secondary)]">
                        <span className="bg-[var(--bg-secondary)] px-2 py-1 rounded text-sm font-mono border border-[var(--border-light)]">{appt.appointment_time}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm inline-block uppercase tracking-wider ${appt.status === 'Scheduled' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'}`}>
                          {appt.status || 'Active'}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AppointmentHistory;
