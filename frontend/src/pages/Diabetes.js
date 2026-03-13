import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSyringe } from 'react-icons/fa';

const Diabetes = () => {
  const [formData, setFormData] = useState({
    pregnancies: '', glucose: '', bloodpressure: '', skinthickness: '',
    insulin: '', bmi: '', diabetespedigreefunction: '', age: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    const payload = Object.fromEntries(
      Object.entries(formData).map(([k, v]) => [k, Number(v)])
    );
    
    // Add temporary patient_id since backend requires it
    payload.patient_id = 1;

    try {
      const API_URL = "http://127.0.0.1:8000";
      const response = await fetch(`${API_URL}/predict-diabetes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await response.json();
      
      setResult({ 
        prediction: data.prediction, 
        riskScore: data.confidence_score
      });
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the prediction server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-card p-8 rounded-2xl relative">
        <div className="flex flex-col items-center justify-center mb-6">
          <FaSyringe size={40} color="#2ecc71" className="mb-4" />
          <h2 className="text-3xl font-bold glow-text text-[var(--text-primary)]">Diabetes Risk Assessment</h2>
        </div>
        
        <p className="text-muted mb-8 text-lg">
          Enter patient metrics to analyze glucose metabolic profile and assess diabetes risk.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="form-label">Pregnancies</label>
              <input type="number" name="pregnancies" required value={formData.pregnancies} onChange={handleChange} className="cyber-input" placeholder="e.g. 2" />
            </div>
            <div>
              <label className="form-label">Glucose</label>
              <input type="number" name="glucose" required value={formData.glucose} onChange={handleChange} className="cyber-input" placeholder="e.g. 120" />
            </div>
            <div>
              <label className="form-label">Blood Pressure</label>
              <input type="number" name="bloodpressure" required value={formData.bloodpressure} onChange={handleChange} className="cyber-input" placeholder="e.g. 70" />
            </div>
            <div>
              <label className="form-label">Skin Thickness</label>
              <input type="number" name="skinthickness" required value={formData.skinthickness} onChange={handleChange} className="cyber-input" placeholder="e.g. 20" />
            </div>
            <div>
              <label className="form-label">Insulin</label>
              <input type="number" name="insulin" required value={formData.insulin} onChange={handleChange} className="cyber-input" placeholder="e.g. 79" />
            </div>
            <div>
              <label className="form-label">BMI</label>
              <input type="number" step="0.1" name="bmi" required value={formData.bmi} onChange={handleChange} className="cyber-input" placeholder="e.g. 25.6" />
            </div>
            <div>
              <label className="form-label">Diabetes Pedigree Function</label>
              <input type="number" step="0.001" name="diabetespedigreefunction" required value={formData.diabetespedigreefunction} onChange={handleChange} className="cyber-input" placeholder="e.g. 0.627" />
            </div>
            <div>
              <label className="form-label">Age</label>
              <input type="number" name="age" required value={formData.age} onChange={handleChange} className="cyber-input" placeholder="e.g. 45" />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full text-lg py-4 flex justify-center items-center font-bold tracking-wider rounded-xl transition-all duration-300"
            style={{ 
              backgroundColor: loading ? 'rgba(245, 158, 11, 0.2)' : 'var(--accent-blue)',
              color: loading ? 'rgba(255,255,255,0.5)' : '#fff',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: !loading ? '0 0 20px rgba(59, 130, 246, 0.4)' : 'none',
              border: 'none',
              textTransform: 'uppercase'
            }}
            disabled={loading}
          >
            {loading ? 'Analyzing Patient Metrics...' : 'Analyze Diabetes Risk'}
          </button>
        </form>

        {error && <p className="text-danger mt-4 text-center">{error}</p>}

        <AnimatePresence>
          {loading && (
            <motion.div 
              className="mt-8 flex flex-col items-center justify-center p-8 glass-panel rounded-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="mb-4 mt-4">
                 <FaSyringe size={60} color="#2ecc71" />
              </div>
              <p className="text-warning mt-2 text-lg tracking-widest uppercase font-semibold text-center mb-4">
                Scanning Metabolic Levels...
              </p>
            </motion.div>
          )}

          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="mt-8"
            >
              <div className={`p-8 rounded-xl border ${result.prediction === "High Risk of Diabetes" ? 'bg-danger/10 border-danger' : 'bg-success/10 border-success'} flex flex-col items-center text-center relative overflow-hidden shadow-lg`}>
                <div className={`absolute left-0 top-0 h-full w-2 ${result.prediction === "High Risk of Diabetes" ? 'bg-danger' : 'bg-success'}`}></div>
                
                <h3 className={`text-3xl font-bold mb-4 ${result.prediction === "High Risk of Diabetes" ? 'text-danger' : 'text-success'}`}>
                  {result.prediction === "High Risk of Diabetes" ? 'High Risk of Diabetes' : 'No Diabetes Detected'}
                </h3>
                
                {result.riskScore && (
                  <div className="flex gap-4 mb-4">
                    <div className="bg-[var(--bg-secondary)] px-6 py-4 rounded-lg w-full max-w-[200px] border border-[var(--border-light)]">
                      <p className="text-muted text-xs uppercase tracking-wider mb-2">AI Confidence</p>
                      <p className="text-3xl font-bold text-[var(--text-primary)] tracking-widest">{result.riskScore.toFixed(1)} / 100</p>
                    </div>
                    {result.prediction === "High Risk of Diabetes" && (
                      <div className="bg-danger/20 px-6 py-4 rounded-lg w-full max-w-[200px] border border-danger/30">
                        <p className="text-danger text-xs uppercase tracking-wider mb-2">Recommendation</p>
                        <p className="text-sm font-bold text-[var(--text-primary)] mt-1">Schedule HbA1c test</p>
                      </div>
                    )}
                  </div>
                )}
                
                <p className="text-sm text-muted mt-4 italic opacity-80">
                  *This analysis is based on the provided manual data. Please consult an endocrinologist for clinical diagnosis.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Diabetes;
