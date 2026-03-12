import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBrain, FaHeartbeat, FaSyringe, FaCalendarPlus, FaChevronRight } from 'react-icons/fa';
import ImmersiveModel from '../components/ImmersiveModel';

const Dashboard = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Brain Tumor Predictor",
      icon: <FaBrain className="text-4xl text-primary-neon mb-4 drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]" />,
      path: "/brain-tumor"
    },
    {
      title: "Heart Disease Predictor",
      icon: <FaHeartbeat className="text-4xl text-[#ef4444] mb-4 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />,
      path: "/heart-disease"
    },
    {
      title: "Diabetes Predictor",
      icon: <FaSyringe className="text-4xl text-accent mb-4 drop-shadow-[0_0_10px_rgba(45,212,191,0.8)]" />,
      path: "/diabetes"
    },
    {
      title: "Book Consultation",
      icon: <FaCalendarPlus className="text-4xl text-secondary mb-4 drop-shadow-[0_0_10px_rgba(129,140,248,0.8)]" />,
      path: "/appointment"
    }
  ];

  return (
    <div className="dashboard-container relative min-h-[90vh] w-full overflow-hidden flex flex-col">
      {/* Immersive 3D Background */}
      <ImmersiveModel />

      {/* Main Hero Content (Centered Text over 3D model) */}
      <div className="dashboard-content relative z-10 flex flex-col items-center justify-center pt-20 pb-40 px-4 flex-grow">
        <motion.h1 
          className="main-title text-5xl md:text-7xl mb-4 text-center tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#38bdf8] via-[#3b82f6] to-[#0ea5e9]">
            MedVision AI
          </span>
        </motion.h1>
        
        <motion.p 
          className="subtitle text-lg md:text-xl font-medium tracking-wide max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Intelligent Disease Prediction System
        </motion.p>
      </div>

      {/* Bottom Floating Cards Layout */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-12 mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {features.map((feature, index) => (
            <motion.div
              key={index}
              onClick={() => navigate(feature.path)}
              className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-light)] hover:border-[#38bdf8]/50 rounded-2xl p-6 flex flex-col items-start cursor-pointer group transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(56,189,248,0.2)]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 rounded-xl bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center mb-6 group-hover:bg-[#3b82f6]/20 transition-colors">
                {feature.icon}
              </div>
              
              <div className="flex items-center justify-between w-full mb-2">
                <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[#38bdf8] transition-colors">{feature.title}</h3>
                <FaChevronRight className="text-slate-500 group-hover:text-[#38bdf8] opacity-50 group-hover:opacity-100 transition-all" />
              </div>
              
              <p className="text-[var(--text-secondary)] text-xs font-medium tracking-wide">
                Advanced AI Analysis Module
              </p>
            </motion.div>
          ))}

        </div>

        {/* Prediction and Appointment History Links */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div 
            onClick={() => navigate('/prediction-history')}
            className="flex items-center gap-4 bg-[var(--card-bg)] backdrop-blur-md rounded-xl p-6 border border-[var(--border-light)] cursor-pointer hover:border-[#38bdf8]/30 transition-colors group"
          >
            <FaBrain className="text-3xl text-[#38bdf8] group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs text-[var(--text-secondary)] uppercase tracking-widest">Medical Records</p>
              <p className="text-2xl font-bold text-[var(--text-primary)] group-hover:text-[#38bdf8] transition-colors">Prediction History</p>
            </div>
          </div>
          
          <div 
            onClick={() => navigate('/appointment-history')}
            className="flex items-center gap-4 bg-[var(--card-bg)] backdrop-blur-md rounded-xl p-6 border border-[var(--border-light)] cursor-pointer hover:border-[#3b82f6]/30 transition-colors group"
          >
            <FaCalendarPlus className="text-3xl text-[#3b82f6] group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs text-[var(--text-secondary)] uppercase tracking-widest">Consultations</p>
              <p className="text-2xl font-bold text-[var(--text-primary)] group-hover:text-[#3b82f6] transition-colors">Appointment History</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;
