import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const predictBrainTumor = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/predict-brain-tumor`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error predicting brain tumor:', error);
    throw new Error('Failed to connect to the prediction API.');
  }
};

export const predictHeartDisease = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/predict-heart-disease`, data);
    return response.data;
  } catch (error) {
    console.error('Error predicting heart disease:', error);
    throw new Error('Failed to connect to the prediction API.');
  }
};

export const predictDiabetes = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/predict-diabetes`, data);
    return response.data;
  } catch (error) {
    console.error('Error predicting diabetes:', error);
    throw new Error('Failed to connect to the prediction API.');
  }
};
