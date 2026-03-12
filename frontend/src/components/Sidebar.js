import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaBrain, FaSyringe, FaCalendarCheck, FaHome, FaInfoCircle } from 'react-icons/fa';
import './Sidebar.css'; 

const Sidebar = () => {
  const links = [
    { to: "/", icon: <FaHome />, label: "Dashboard" },
    { to: "/heart-disease", icon: <FaHeartbeat />, label: "Heart Disease Prediction" },
    { to: "/diabetes", icon: <FaSyringe />, label: "Diabetes Prediction" },
    { to: "/brain-tumor", icon: <FaBrain />, label: "Brain Tumor Detection" },
    { to: "/prediction-history", icon: <FaInfoCircle />, label: "Prediction History" },
    { to: "/appointment", icon: <FaCalendarCheck />, label: "Book Appointment" },
    { to: "/appointment-history", icon: <FaInfoCircle />, label: "Appointment History" },
  ];

  return (
    <motion.aside 
      className="sidebar glass-panel"
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="sidebar-header">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="logo-container"
        >
          <div className="pulse-ring"></div>
          <FaBrain className="text-4xl text-primary" />
        </motion.div>
        <motion.h2 
          className="font-bold mt-4 text-center text-[1rem] leading-tight px-2 text-[var(--accent)]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          MedVision AI <br/><span className="text-xs font-normal text-[var(--text-secondary)]">Intelligent Disease Prediction</span>
        </motion.h2>
      </div>

      <nav className="sidebar-nav">
        {links.map((link, index) => (
          <NavLink 
            key={link.to} 
            to={link.to} 
            end={link.to === '/'}
            className={({ isActive }) => (isActive ? 'nav-link active glow-border' : 'nav-link')}
          >
            {({ isActive }) => (
              <motion.div 
                className="nav-link-content"
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <motion.span 
                  className="nav-icon"
                  animate={isActive ? { scale: [1, 1.2, 1], filter: 'drop-shadow(0 0 8px var(--primary))' } : {}}
                  transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
                >
                  {link.icon}
                </motion.span>
                <span className="nav-label">{link.label}</span>
                {isActive && (
                  <motion.div 
                    className="active-indicator"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
