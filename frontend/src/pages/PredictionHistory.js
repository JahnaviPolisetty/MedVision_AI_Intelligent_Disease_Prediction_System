import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaHistory } from 'react-icons/fa';

const PredictionHistory = () => {
  const [predictions, setPredictions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all predictions on mount
  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const API_URL = "http://127.0.0.1:8000";
        const response = await fetch(`${API_URL}/predictions`);
        if (response.ok) {
          const data = await response.json();
          setPredictions(data);
        }
      } catch (error) {
        console.error("Failed to fetch predictions history:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPredictions();
  }, []);

  // Filter predictions by disease type or patient ID
  const filteredPredictions = predictions.filter(pred => 
    pred.disease_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pred.patient_id?.toString().includes(searchTerm)
  );

  return (
    <motion.div 
      className="max-w-7xl mx-auto flex flex-col gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-card p-8 rounded-2xl relative h-fit flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <FaHistory className="text-4xl text-primary" />
          <div>
            <h2 className="text-2xl font-bold glow-text text-[var(--text-primary)]">Prediction History</h2>
            <p className="text-muted text-sm mt-1">Review your AI diagnostic assessment records</p>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full xl:w-72 mt-4 xl:mt-0">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by Patient ID or Type..." 
            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-light)] text-[var(--text-primary)] rounded-lg pl-12 pr-4 py-2 focus:outline-none focus:border-primary transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <motion.div 
        className="glass-card p-6 rounded-2xl flex-grow min-h-[500px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center py-20 text-primary">
            <span className="animate-pulse font-semibold tracking-wide">LOADING SECURE RECORDS...</span>
          </div>
        ) : filteredPredictions.length === 0 ? (
          <div className="w-full h-full flex flex-col justify-center items-center py-20 text-muted">
            <p className="border border-dashed border-gray-700 p-8 rounded-xl">No prediction records found matching your search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-4 px-6 text-[var(--accent-blue)] font-bold text-xs tracking-widest uppercase bg-[var(--bg-secondary)] rounded-tl-lg">Record ID</th>
                  <th className="py-4 px-6 text-[var(--accent-blue)] font-bold text-xs tracking-widest uppercase bg-[var(--bg-secondary)]">Patient ID</th>
                  <th className="py-4 px-6 text-[var(--accent-blue)] font-bold text-xs tracking-widest uppercase bg-[var(--bg-secondary)]">Scan / Disease Type</th>
                  <th className="py-4 px-6 text-[var(--accent-blue)] font-bold text-xs tracking-widest uppercase bg-[var(--bg-secondary)]">AI Result</th>
                  <th className="py-4 px-6 text-[var(--accent-blue)] font-bold text-xs tracking-widest uppercase bg-[var(--bg-secondary)] rounded-tr-lg">Confidence Score</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredPredictions.map((pred, idx) => (
                    <motion.tr 
                      key={pred.id || idx} 
                      className="border-b border-gray-800/60 hover:bg-gray-800/40 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <td className="py-4 px-6 text-[var(--text-secondary)] font-mono text-sm">#{pred.id}</td>
                      <td className="py-4 px-6 text-[var(--text-secondary)] font-medium">{pred.patient_id}</td>
                      <td className="py-4 px-6 text-[var(--text-primary)] font-medium capitalize">{pred.disease_type?.replace('_', ' ')}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm inline-block ${pred.prediction_result?.includes('High Risk') || (pred.prediction_result !== 'notumor' && pred.disease_type === 'brain_tumor') ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}>
                          {pred.prediction_result}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-800 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-2 rounded-full ${pred.confidence > 80 ? 'bg-primary' : 'bg-warning'}`} 
                              style={{ width: `${pred.confidence || 0}%` }}
                            ></div>
                          </div>
                          <span className="text-[var(--text-secondary)] text-sm font-mono w-12">{pred.confidence !== null ? `${pred.confidence.toFixed(1)}%` : 'N/A'}</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PredictionHistory;
