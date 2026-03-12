import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserMd, FaLock, FaUser } from 'react-icons/fa';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const particleOptions = {
    fullScreen: { enable: false },
    fpsLimit: 60,
    interactivity: { events: { onHover: { enable: true, mode: "grab" } } },
    particles: {
      color: { value: "#3b82f6" },
      links: { color: "#3b82f6", distance: 150, enable: true, opacity: 0.2, width: 1 },
      move: { direction: "none", enable: true, random: false, speed: 0.8, straight: false },
      number: { density: { enable: true, area: 800 }, value: 50 },
      opacity: { value: 0.3 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 2 } },
    },
    detectRetina: true,
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Typically, modern FastAPI expects form-data for OAuth2PasswordRequestForm, 
      // but based on user prompt we send JSON to POST /login.
      // E.g '{"username": "admin1", "password": "admin123"}'
      const API_URL = 'https://medvision-ai-intelligent-disease-ugst.onrender.com';
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('role', data.role);
        navigate('/');
      } else {
        const errData = await response.json();
        setError(errData.detail || 'Invalid username or password');
      }
    } catch (err) {
      setError('Cannot connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background-particles">
        <Particles id="tsparticles-login" init={particlesInit} options={particleOptions} className="w-full h-full" />
      </div>

      <motion.div 
        className="login-card"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div className="login-logo">
          <div className="login-icon-wrapper">
            <div className="login-icon-pulse"></div>
            <FaUserMd className="text-3xl text-primary" />
          </div>
        </div>
        
        <h2 className="login-title">MedVision AI</h2>
        <p className="login-subtitle">Intelligent Disease Prediction System</p>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="login-error">
            {error}
          </motion.div>
        )}

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input 
              type="text" 
              className="login-input" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <FaLock className="input-icon" />
            <input 
              type="password" 
              className="login-input" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
