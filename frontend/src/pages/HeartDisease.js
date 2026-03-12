import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const HeartDisease = () => {
  const [formData, setFormData] = useState({
    age: '', sex: '', cp: '', trestbps: '', chol: '', fbs: '',
    restecg: '', thalach: '', exang: '', oldpeak: '', slope: '',
    ca: '', thal: ''
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

    // Convert all form values to numbers
    const payload = Object.fromEntries(
      Object.entries(formData).map(([k, v]) => [k, Number(v)])
    );
    
    // Add temporary patient_id since backend requires it
    payload.patient_id = 1;

    try {
      const API_URL = 'https://medvision-ai-intelligent-disease-ugst.onrender.com';
      const response = await fetch(`${API_URL}/predict-heart`, {
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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-card p-8 rounded-2xl relative">
        <div className="flex flex-col items-center justify-center mb-6">
          <FaHeart size={40} color="red" className="mb-4" />
          <h2 className="text-3xl font-bold glow-text text-[var(--text-primary)]">Heart Disease Risk Analyzer</h2>
        </div>

        <p className="text-muted mb-8 text-lg">
          Enter patient metrics for AI-based heart disease prediction.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="form-label">Age</label>
              <input type="number" name="age" required value={formData.age} onChange={handleChange} className="cyber-input" placeholder="e.g. 52" />
            </div>
            <div>
              <label className="form-label">Sex (1=M, 0=F)</label>
              <input type="number" name="sex" required value={formData.sex} onChange={handleChange} className="cyber-input" placeholder="e.g. 1" />
            </div>
            <div>
              <label className="form-label">Chest Pain Type (0-3)</label>
              <input type="number" name="cp" required value={formData.cp} onChange={handleChange} className="cyber-input" placeholder="e.g. 0" />
            </div>
            <div>
              <label className="form-label">Resting BP</label>
              <input type="number" name="trestbps" required value={formData.trestbps} onChange={handleChange} className="cyber-input" placeholder="e.g. 130" />
            </div>
            <div>
              <label className="form-label">Cholesterol</label>
              <input type="number" name="chol" required value={formData.chol} onChange={handleChange} className="cyber-input" placeholder="e.g. 210" />
            </div>
            <div>
              <label className="form-label">Fasting Blood Sugar &gt; 120</label>
              <input type="number" name="fbs" required value={formData.fbs} onChange={handleChange} className="cyber-input" placeholder="1 = True, 0 = False" />
            </div>
            <div>
              <label className="form-label">Resting ECG (0-2)</label>
              <input type="number" name="restecg" required value={formData.restecg} onChange={handleChange} className="cyber-input" placeholder="e.g. 1" />
            </div>
            <div>
              <label className="form-label">Max Heart Rate</label>
              <input type="number" name="thalach" required value={formData.thalach} onChange={handleChange} className="cyber-input" placeholder="e.g. 150" />
            </div>
            <div>
              <label className="form-label">Exercise Angina</label>
              <input type="number" name="exang" required value={formData.exang} onChange={handleChange} className="cyber-input" placeholder="1 = Yes, 0 = No" />
            </div>
            <div>
              <label className="form-label">ST Depression (Oldpeak)</label>
              <input type="number" step="0.1" name="oldpeak" required value={formData.oldpeak} onChange={handleChange} className="cyber-input" placeholder="e.g. 1.2" />
            </div>
            <div>
              <label className="form-label">Slope of Peak ST (0-2)</label>
              <input type="number" name="slope" required value={formData.slope} onChange={handleChange} className="cyber-input" placeholder="e.g. 2" />
            </div>
            <div>
              <label className="form-label">Major Vessels (0-4)</label>
              <input type="number" name="ca" required value={formData.ca} onChange={handleChange} className="cyber-input" placeholder="e.g. 0" />
            </div>
            <div>
              <label className="form-label">Thal (0-3)</label>
              <input type="number" name="thal" required value={formData.thal} onChange={handleChange} className="cyber-input" placeholder="e.g. 2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-lg py-4 flex justify-center items-center font-bold tracking-wider rounded-xl transition-all duration-300"
            style={{
              backgroundColor: loading ? 'rgba(20, 184, 166, 0.2)' : 'var(--accent-blue)',
              color: loading ? 'rgba(255,255,255,0.5)' : '#fff',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: !loading ? '0 0 20px rgba(59, 130, 246, 0.4)' : 'none',
              border: 'none',
              textTransform: 'uppercase'
            }}
            disabled={loading}
          >
            {loading ? 'Analyzing Patient Data...' : 'Predict Heart Disease'}
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
              <div className="mb-4">
                <FaHeart size={60} color="red" />
              </div>
              <p className="text-accent mt-2 text-lg tracking-widest uppercase font-semibold text-center mb-4">
                AI Analyzing Cardiovascular Data...
              </p>
            </motion.div>
          )}

          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <div className={`p-8 rounded-xl border ${result.prediction === "High Risk of Heart Disease" ? 'bg-danger/10 border-danger' : 'bg-success/10 border-success'} flex flex-col items-center text-center relative overflow-hidden shadow-lg`}>
                <div className={`absolute top-0 w-full h-2 left-0 ${result.prediction === "High Risk of Heart Disease" ? 'bg-danger' : 'bg-success'}`}></div>

                <h3 className={`text-3xl font-bold mb-4 ${result.prediction === "High Risk of Heart Disease" ? 'text-danger' : 'text-success'}`}>
                  {result.prediction === "High Risk of Heart Disease" ? 'High Risk Detected' : 'Low Risk / Normal'}
                </h3>

                {result.riskScore && (
                  <div className="bg-[var(--bg-secondary)] px-6 py-4 rounded-lg w-full max-w-sm mb-4 border border-[var(--border-light)]">
                    <p className="text-muted text-sm uppercase tracking-wider mb-2">Cardiovascular Risk Score</p>
                    <p className="text-4xl font-bold text-[var(--text-primary)]">{result.riskScore.toFixed(1)} / 100</p>
                  </div>
                )}

                <p className="text-sm text-muted mt-4">
                  *Based on the provided numerical parameters. Consult a cardiologist for clinical confirmation.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default HeartDisease;