import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <div className="footer-content flex justify-center w-full">
        <div className="footer-center m-auto text-center opacity-80">
          <p>© 2026 MedVision AI – Intelligent Disease Prediction System</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
