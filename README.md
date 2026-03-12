# 🏥 MedVision AI: Intelligent Disease Prediction System

![MedVision AI Banner](https://img.shields.io/badge/MedVision-AI_Healthcare-2563eb?style=for-the-badge&logo=health)

MedVision AI is a comprehensive, modern Smart Hospital Dashboard that leverages Artificial Intelligence to assist in diagnosing critical conditions such as **Heart Disease, Diabetes, and Brain Tumors**. It features a robust FastAPI backend for serving machine learning models and a beautiful, interactive React frontend complete with 3D medical visualizations.

## ✨ Key Features

*   🧠 **Brain Tumor Detection**: Upload MRI scans for AI-driven classification (Glioma, Meningioma, Pituitary, or No Tumor) using a custom Convolutional Neural Network (CNN). Includes interactive 3D brain models.
*   🫀 **Heart Disease Risk Scoring**: Predicts the likelihood of heart disease based on clinical metrics (age, cholesterol, ECG, etc.) using a trained ensemble model. Features animated biometric visualizations.
*   🩸 **Diabetes Prediction**: Assesses diabetes risk using patient health data (BMI, glucose, insulin, etc.) with high accuracy.
*   📅 **Smart Appointments**: Integrated system for booking and managing patient appointments with specialists.
*   📊 **Interactive Dashboard**: Modern, responsive UI with real-time statistics, prediction history tracking, and dark/light mode optimization.
*   🏥 **3D Medical Visualizations**: Immersive patient experience powered by Three.js and React Three Fiber.

## 🛠️ Technology Stack

### Backend (AI & API)
*   **Framework**: FastAPI (Python)
*   **Machine Learning**: TensorFlow/Keras (CNNs), Scikit-Learn (Random Forests, XGBoost)
*   **Database**: PostgreSQL
*   **Data Processing**: NumPy, Pandas, Pillow (PIL)

### Frontend (UI & Visualization)
*   **Framework**: React.js
*   **3D Graphics**: Three.js, React Three Fiber, React Three Drei
*   **Animations**: Framer Motion, Lottie React, tsparticles
*   **State & Routing**: React Router DOM, Axios
*   **Styling**: Pure CSS / Custom Design System

## 🚀 Getting Started

### Prerequisites
*   Node.js (v16+)
*   Python (3.9+)
*   PostgreSQL
*   Git

### 1. Backend Setup

```bash
# Clone the repository
git clone https://github.com/JahnaviPolisetty/MedVision_AI_Intelligent_Disease_Prediction_System.git
cd "MedVision_AI_Intelligent_Disease_Prediction_System/backend"

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies (assuming a requirements.txt exists or install manually)
pip install fastapi uvicorn tensorflow scikit-learn pandas numpy pillow sqlalchemy psycopg2-binary joblib python-multipart

# Run the API server
uvicorn main:app --reload
```
*The backend API will be available at `http://localhost:8000`*

### 2. Frontend Setup

```bash
# Open a new terminal and navigate to the frontend directory
cd "../frontend"

# Install dependencies
npm install

# Start the React development server
npm start
```
*The frontend application will be available at `http://localhost:3000`*

## 📂 Project Structure

```
MedVision_AI/
│
├── backend/                # FastAPI application
│   ├── main.py             # Main API endpoints and ML model integration
│   ├── database.py         # PostgreSQL database connection
│   └── ...
│
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI features (Navbar, MedicalScanner, 3D Models)
│   │   ├── pages/          # Application views (Dashboard, Predictions, Appointments)
│   │   └── ...
│   └── public/             # Static assets including .glb 3D models
│
├── ai-models/              # Trained ML weights and scalers (Ignored in Git)
│   ├── brain_tumor_model/
│   ├── diabetes_model/
│   └── heart_disease_model/
│
└── datasets/               # Training data (Ignored in Git)
```

## 📜 License

This project is proprietary. All rights reserved.
