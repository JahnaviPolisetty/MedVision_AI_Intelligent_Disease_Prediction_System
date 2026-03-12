import React from 'react';

const PredictionResult = ({ isHighRisk, message }) => {
  const bgColor = isHighRisk ? 'var(--danger-bg)' : 'var(--success-bg)';
  const textColor = isHighRisk ? 'var(--danger)' : 'var(--success)';
  const borderColor = isHighRisk ? '#fca5a5' : '#86efac';

  return (
    <div style={{
      marginTop: '24px',
      padding: '24px',
      backgroundColor: bgColor,
      border: `1px solid ${borderColor}`,
      borderRadius: '8px',
      color: textColor,
      textAlign: 'center'
    }}>
      <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{message}</h3>
    </div>
  );
};

export default PredictionResult;
