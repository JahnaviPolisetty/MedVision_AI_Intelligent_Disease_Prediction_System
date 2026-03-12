import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import BrainTumor from './pages/BrainTumor';
import HeartDisease from './pages/HeartDisease';
import Diabetes from './pages/Diabetes';
import Appointment from './pages/Appointment';
import PredictionHistory from './pages/PredictionHistory';
import AppointmentHistory from './pages/AppointmentHistory';
import About from './pages/About';
import Login from './pages/Login';
import './i18n'; // Initialize i18n
import './index.css';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('username');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/brain-tumor" element={<PrivateRoute><BrainTumor /></PrivateRoute>} />
        <Route path="/heart-disease" element={<PrivateRoute><HeartDisease /></PrivateRoute>} />
        <Route path="/diabetes" element={<PrivateRoute><Diabetes /></PrivateRoute>} />
        <Route path="/appointment" element={<PrivateRoute><Appointment /></PrivateRoute>} />
        <Route path="/prediction-history" element={<PrivateRoute><PredictionHistory /></PrivateRoute>} />
        <Route path="/appointment-history" element={<PrivateRoute><AppointmentHistory /></PrivateRoute>} />
        <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

function MainLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) {
    return <AnimatedRoutes />;
  }

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        <div className="page-content">
          <AnimatedRoutes />
        </div>
        <Footer />
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
