import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { FaCloudUploadAlt, FaFileImage } from 'react-icons/fa';

function BrainTumorPredictor() {

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setPrediction("");
      setConfidence("");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
      setPrediction("");
      setConfidence("");
    }
  };

  const handlePredict = async () => {

    if (!file) {
      alert("Please upload an MRI image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("patient_id", 1); // Add temporary patient_id

    try {

      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/predict-brain-tumor",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || data.error || "Backend prediction failed");
        setLoading(false);
        return;
      }

      setPrediction(data.prediction);
      setConfidence((data.confidence * 100).toFixed(2));

      setLoading(false);

    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="glass-card p-8 relative rounded-xl"
      >
        <div className="flex flex-col mb-8 text-center items-center">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2" style={{ textShadow: '0 0 10px rgba(16, 185, 129, 0.4)' }}>
            Brain Tumor Detection
          </h1>
          <p className="text-muted text-lg">
            Upload an MRI scan to detect brain tumors using AI.
          </p>
        </div>

        <div
          className={`upload-area border-dashed border-2 rounded-xl p-8 mb-6 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden
            ${isDragging ? 'bg-[#10b981]/10' : 'bg-[var(--bg-secondary)] hover:bg-[var(--border-light)]'}`}
          style={{
            borderColor: isDragging ? '#10b981' : 'var(--border-light)'
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
            style={{ display: 'none' }}
          />

          {!preview ? (
            <motion.div
              className="flex flex-col items-center z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaCloudUploadAlt className="text-6xl text-[#10b981] mb-4 opacity-80" />
              <p className="text-xl text-[var(--text-primary)] font-medium mb-2">Upload MRI Image</p>
              <p className="text-muted text-sm mb-4">Drag & Drop or Click to Browse</p>
              <p className="text-muted text-xs opacity-70">Supported formats: JPG, PNG</p>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center w-full z-10">
              <div
                className="relative w-48 h-48 mb-4 rounded-xl overflow-hidden border-2"
                style={{ borderColor: '#10b981', boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)' }}
              >
                <img src={preview} alt="MRI Preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border" style={{ color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                <FaFileImage />
                <span className="truncate max-w-[200px] font-medium">{file.name}</span>
              </div>
              <p className="text-xs text-muted mt-4">Click or drag another file to replace</p>
            </div>
          )}
        </div>

        <motion.button
          onClick={handlePredict}
          className="w-full text-lg py-4 flex justify-center items-center font-bold tracking-wider rounded-xl transition-all duration-300"
          style={{
            backgroundColor: loading || !file ? 'rgba(59, 130, 246, 0.2)' : 'var(--accent-blue)',
            color: loading || !file ? 'rgba(255,255,255,0.5)' : '#fff',
            cursor: loading || !file ? 'not-allowed' : 'pointer',
            boxShadow: file && !loading ? '0 0 20px rgba(59, 130, 246, 0.4)' : 'none',
            border: 'none',
            textTransform: 'uppercase'
          }}
          disabled={loading || !file}
          whileHover={file && !loading ? { scale: 1.02, boxShadow: '0 0 25px rgba(59, 130, 246, 0.6)' } : {}}
          whileTap={file && !loading ? { scale: 0.98 } : {}}
        >
          {loading ? 'Predicting...' : 'Predict Tumor'}
        </motion.button>

        <AnimatePresence>
          {loading && (
            <motion.div
              className="mt-8 flex flex-col items-center justify-center p-6 glass-panel rounded-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ rotate: { repeat: Infinity, duration: 2, ease: "linear" }, scale: { repeat: Infinity, duration: 1 } }}
                className="w-12 h-12 border-4 rounded-full mb-4"
                style={{
                  borderTopColor: '#10b981',
                  borderRightColor: '#14b8a6',
                  borderBottomColor: '#10b981',
                  borderLeftColor: 'transparent'
                }}
              ></motion.div>
              <p className="text-lg tracking-widest uppercase font-semibold" style={{ color: '#14b8a6', textShadow: '0 0 10px rgba(20, 184, 166, 0.4)' }}>
                AI analyzing MRI scan...
              </p>
            </motion.div>
          )}

          {prediction && !loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="mt-8"
            >
              <div
                className="p-8 rounded-xl flex flex-col items-center text-center relative overflow-hidden hover:shadow-lg transition-shadow duration-300"
                style={{
                  background: prediction === "notumor" ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)',
                  border: `1px solid ${prediction === "notumor" ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                  boxShadow: `0 4px 20px ${prediction === "notumor" ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'}`
                }}
              >
                <div
                  className="absolute left-0 top-0 h-full w-1"
                  style={{ background: prediction === "notumor" ? '#10b981' : '#ef4444' }}
                ></div>

                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ color: prediction === "notumor" ? '#10b981' : '#ef4444', textShadow: `0 0 15px ${prediction === "notumor" ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}` }}
                >
                  {prediction === "notumor" ? 'Low Risk: No Tumor Detected' : `Tumor Detected: ${prediction.charAt(0).toUpperCase() + prediction.slice(1)}`}
                </h2>

                {confidence && (
                  <div className="bg-[var(--bg-secondary)] px-6 py-4 rounded-xl min-w-[200px] mb-4 border border-[var(--border-light)] shadow-inner">
                    <p className="text-muted text-xs uppercase tracking-wider mb-2 font-medium">AI Confidence Score</p>
                    <p className="text-3xl font-bold text-[var(--text-primary)] tracking-widest">{confidence}%</p>
                  </div>
                )}

                <p className="text-sm mt-4 opacity-80 italic" style={{ color: 'var(--text-muted)' }}>
                  *This is an AI-generated preliminary analysis and should be verified by a medical professional.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default BrainTumorPredictor;