import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const GlowingNode = ({ title, delay, position, onClick }) => {
  return (
    <motion.div 
      className={`absolute ${position} flex flex-col items-center justify-center cursor-pointer group z-20`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
    >
      <div className="relative flex items-center justify-center w-24 h-24 mb-3">
        {/* Core Node */}
        <div className="w-12 h-12 bg-[#0ea5e9] rounded-full blur-[2px] z-10"></div>
        <div className="absolute w-8 h-8 bg-[#ffffff] rounded-full z-20"></div>
        
        {/* Pulsing Rings */}
        <motion.div 
          className="absolute inset-0 border-2 border-[#38bdf8] rounded-full"
          animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute inset-2 border border-[#3b82f6] rounded-full"
          animate={{ scale: [1, 1.3, 1.6], opacity: [0.6, 0.2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
        />
      </div>
      
      {/* Tooltip / Label */}
      <div className="bg-[var(--bg-secondary)] backdrop-blur-md border border-[#3b82f6]/50 px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 group-hover:border-[#38bdf8] group-hover:shadow-[0_0_20px_rgba(56,189,248,0.8)]">
        <span className="text-[var(--text-primary)] text-sm font-medium tracking-wider whitespace-nowrap glow-text">{title}</span>
      </div>
    </motion.div>
  );
};

const MedicalScanner = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[550px] relative rounded-xl overflow-hidden bg-[var(--card-bg)] border border-[#3b82f6]/20">
      
      {/* Background Grid */}
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="absolute top-5 left-6 z-30 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] animate-pulse shadow-[0_0_12px_#38bdf8]"></div>
          <span className="text-[#38bdf8] tracking-widest text-xs uppercase font-bold drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">System Live</span>
        </div>
        <p className="text-muted text-[10px] uppercase tracking-widest pl-4">Diagnostic Nodes Active</p>
      </div>

      {/* Frame Container */}
      <div className="w-full h-full relative flex items-center justify-center p-10 z-10">
        
        {/* Animated Scanning Line */}
        <motion.div 
          className="absolute left-0 w-full h-[2px] bg-[#38bdf8] shadow-[0_0_15px_#38bdf8,0_0_30px_#38bdf8] z-0"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 6, ease: "linear", repeat: Infinity }}
        />
        
        {/* Central Hub Ring */}
        <div className="absolute w-[300px] h-[300px] rounded-full border border-[#3b82f6]/30 flex items-center justify-center z-0">
          <div className="w-[200px] h-[200px] rounded-full border border-dashed border-[#38bdf8]/40 animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute w-[100px] h-[100px] rounded-full bg-[#3b82f6]/10 blur-xl"></div>
        </div>

        {/* Nodes */}
        <GlowingNode 
          title="Brain Tumor Detection" 
          delay={0.2} 
          position="top-10 lg:top-16" 
          onClick={() => navigate('/brain-tumor')}
        />
        
        <GlowingNode 
          title="Heart Disease Prediction" 
          delay={0.4} 
          position="bottom-20 left-10 lg:left-24" 
          onClick={() => navigate('/heart-disease')}
        />
        
        <GlowingNode 
          title="Diabetes Prediction" 
          delay={0.6} 
          position="bottom-20 right-10 lg:right-24" 
          onClick={() => navigate('/diabetes')}
        />

        {/* Connecting Lines (Visual representation via SVG) */}
        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <motion.path 
            d="M 50% 25% L 25% 75% L 75% 75% Z" 
            fill="none" 
            stroke="rgba(59, 130, 246, 0.3)" 
            strokeWidth="2" 
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
          />
        </svg>

      </div>
      
      {/* Decorative corner brackets */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#3b82f6]/60 rounded-tl-lg z-30 pointer-events-none"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#3b82f6]/60 rounded-tr-lg z-30 pointer-events-none"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#3b82f6]/60 rounded-bl-lg z-30 pointer-events-none"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#3b82f6]/60 rounded-br-lg z-30 pointer-events-none"></div>
    </div>
  );
};

export default MedicalScanner;
