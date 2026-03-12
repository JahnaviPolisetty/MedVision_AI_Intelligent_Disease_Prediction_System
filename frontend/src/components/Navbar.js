import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaSun, FaMoon, FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  
  // Initialize theme from localStorage or default to dark
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });
  
  useEffect(() => {
    // Apply theme to document element
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'te', name: 'Telugu' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ta', name: 'Tamil' },
    { code: 'kn', name: 'Kannada' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' }
  ];

  return (
    <motion.header 
      className="navbar glass-panel"
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      <div className="navbar-left flex items-center gap-4">
        <h3 className="text-xl font-bold tracking-wide text-[var(--accent)]">
          MedVision AI <span className="text-sm font-medium opacity-80 text-[var(--text-secondary)] hidden md:inline ml-2">– Intelligent Disease Prediction System</span>
        </h3>
      </div>
      
      <div className="navbar-right flex items-center gap-5">
        <Link to="/about" className="text-[var(--text-main)] hover:text-primary transition-colors font-medium text-sm tracking-wide uppercase">
          {t('About')}
        </Link>
        
        <div className="nav-item lang-selector-container">
          <div className="cyber-input-small flex items-center gap-2 px-3 py-1.5 focus-within:border-primary focus-within:shadow-[0_0_8px_var(--primary-glow)] rounded-md">
            <FaGlobe className="text-primary flex-shrink-0" />
            <select 
              className="bg-transparent border-none text-[var(--text-main)] outline-none cursor-pointer w-full text-sm font-medium" 
              onChange={changeLanguage}
              value={i18n.language}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
        </div>

        <button 
          className="theme-toggle w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          onClick={toggleTheme}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <FaSun className="text-warning text-lg" /> : <FaMoon className="text-secondary text-lg" />}
        </button>

        <div className="flex items-center gap-4 border-l border-white/10 pl-4 ml-2">
          <div className="navbar-profile flex items-center gap-3">
            <div className="avatar-container relative">
              <FaUserCircle className="text-2xl text-primary drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border border-bg-dark"></span>
            </div>
            <span className="profile-name text-sm font-medium tracking-wide">
              👤 {sessionStorage.getItem('role') === 'doctor' ? 'Doctor Panel' : 'Admin Panel'}
            </span>
          </div>
          
          <button 
            onClick={() => {
              sessionStorage.clear();
              window.location.href = '/login';
            }}
            className="text-xs uppercase tracking-widest font-bold text-danger hover:text-white border border-danger/30 hover:bg-danger/20 px-3 py-1.5 rounded transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
