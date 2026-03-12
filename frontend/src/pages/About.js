import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div 
      className="about-container p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-card p-8">
        <h1 className="glow-text text-3xl mb-4 text-primary">About MedVision AI</h1>
        <p className="text-muted leading-relaxed mb-6">
          MedVision AI is an intelligent hospital management and disease prediction platform built using modern AI and web technologies.
        </p>

        <h2 className="text-xl mb-3 text-[var(--text-primary)]">Technologies Used:</h2>
        
        <h3 className="text-lg text-primary mt-4 mb-2">Frontend:</h3>
        <ul className="list-disc pl-6 text-muted mb-4">
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
          <li>Three.js animations</li>
          <li>Responsive dashboard UI</li>
        </ul>

        <h3 className="text-lg text-primary mt-4 mb-2">Backend:</h3>
        <ul className="list-disc pl-6 text-muted mb-4">
          <li>FastAPI (Python)</li>
        </ul>

        <h3 className="text-lg text-primary mt-4 mb-2">Database:</h3>
        <ul className="list-disc pl-6 text-muted mb-4">
          <li>PostgreSQL</li>
        </ul>

        <h3 className="text-lg text-primary mt-4 mb-2">AI Models:</h3>
        <p className="text-muted mb-2">Machine Learning models for:</p>
        <ul className="list-disc pl-6 text-muted mb-4">
          <li>Heart Disease Prediction</li>
          <li>Diabetes Prediction</li>
          <li>Brain Tumor Detection</li>
        </ul>

        <h3 className="text-lg text-primary mt-4 mb-2">Deployment Ready Architecture:</h3>
        <ul className="list-disc pl-6 text-muted mb-6">
          <li>REST APIs</li>
          <li>Secure authentication</li>
          <li>Hospital management dashboard</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default About;
