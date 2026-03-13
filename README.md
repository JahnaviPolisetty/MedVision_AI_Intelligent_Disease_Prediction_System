### 🏥 MedVision AI – Intelligent Disease Prediction System 

MedVision AI is a full-stack AI-powered Smart Hospital platform that assists in diagnosing critical diseases such as Heart Disease, Diabetes, and Brain Tumors using Machine Learning models.

The platform combines FastAPI, PostgreSQL, Machine Learning models, and a modern React dashboard with 3D medical visualizations to provide intelligent healthcare assistance.

### 🚀 Features
## 🧠 AI Disease Prediction

The system predicts multiple diseases using trained machine learning models.

##Brain Tumor Detection
MRI scan classification using a CNN model built with TensorFlow/Keras

##Heart Disease Prediction
Predicts heart disease risk using clinical parameters

##Diabetes Prediction
Predicts diabetes likelihood based on patient health metrics

Users can input medical data or upload medical images to receive predictions.

## 📅 Appointment Management

The system allows patients and hospital staff to manage appointments.

## Features include:

Book doctor appointments

View appointment history

Track appointment status

Manage doctor scheduling

## 📊 Prediction History

All predictions are stored in the database and can be retrieved later.

## Features include:

View previous predictions

Track predictions per patient

Analyze prediction outcomes

## 🔐 User Login System

The platform includes a login system with different roles.

# Example Users
Username	Password	Role
admin1	admin123	Admin
doctor1	doctor123	Doctor
reception1	recep123	Receptionist
## 🏗 System Architecture
Frontend (React Dashboard)
        ↓
FastAPI Backend
        ↓
Machine Learning Models
        ↓
PostgreSQL Database
## 🛠 Technology Stack
Backend (AI & API)

Framework: FastAPI (Python)

Machine Learning: TensorFlow / Keras, Scikit-Learn

Database: PostgreSQL

ORM: SQLAlchemy

Data Processing: NumPy, Pandas, Pillow

Frontend (UI & Visualization)

Framework: React.js

3D Graphics: Three.js, React Three Fiber

Animations: Framer Motion, Lottie, tsparticles

HTTP Requests: Axios

Routing: React Router DOM

Styling: CSS / Custom Design System

## 🧠 Machine Learning Models
Model	Algorithm
Brain Tumor Detection	CNN (TensorFlow / Keras)
Heart Disease Prediction	Logistic Regression / ML Model
Diabetes Prediction	Classification Model
# ✨ Key Features

# 🧠 Brain Tumor detection from MRI images

# 🫀 Heart disease risk prediction

# 🩸 Diabetes prediction using clinical data

# 📅 Smart hospital appointment booking

# 📊 Prediction history tracking

# 🏥 Interactive healthcare dashboard

# 🌐 Full stack architecture

# 🎨 3D medical visualizations with Three.js

# 🌙 Dark/Light mode optimized UI

### 📂 Project Structure
MedVision_AI/
│
├── backend/                # FastAPI application
│   ├── main.py             # API endpoints & ML integration
│   ├── database.py         # PostgreSQL connection
│   └── requirements.txt
│
├── frontend/               # React dashboard
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── public/
│
├── ai-models/              # Trained ML models
│   ├── brain_tumor_model/
│   ├── heart_disease_model/
│   └── diabetes_model/
│
├── datasets/               # Training datasets
│
└── README.md
### ⚙ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/JahnaviPolisetty/MedVision_AI_Intelligent_Disease_Prediction_System.git
cd MedVision_AI_Intelligent_Disease_Prediction_System
🔧 Backend Setup

Navigate to backend folder:

cd backend

Create virtual environment:

python -m venv venv

Activate environment:

Windows:

venv\Scripts\activate

Linux / Mac:

source venv/bin/activate

Install dependencies:

pip install fastapi uvicorn tensorflow scikit-learn pandas numpy pillow sqlalchemy psycopg2-binary joblib python-multipart

Run backend server:

uvicorn main:app --reload

Backend will run at:

http://localhost:8000

Swagger API docs:

http://localhost:8000/docs
## 🌐 Frontend Setup

Open a new terminal:

cd frontend

Install dependencies:

npm install

Run frontend:

npm start

Frontend runs at:

http://localhost:3000
## 🗄 Database Setup

Create PostgreSQL database:

ai_smart_hospital

Create tables:

users

predictions

appointments

## 📡 API Endpoints
Authentication
POST /login
Disease Prediction
POST /predict-heart
POST /predict-diabetes
POST /predict-brain-tumor
Prediction History
GET /predictions
Appointment Management
POST /book-appointment
GET /appointments/{patient_id}
## 📊 Example Workflow

User logs into the system

Inputs medical data or uploads MRI image

AI model predicts disease risk

Prediction is stored in database

User books doctor appointment

Appointment history is tracked

## 🔮 Future Improvements

Cloud deployment (AWS / Render / GCP)

Secure authentication using JWT

Doctor availability scheduling

Patient dashboard

More AI diagnostic models

Real-time hospital analytics

## 👨‍💻 Author

Jahnavi Polisetty
B.Tech Computer Science Engineering

Project: AI Smart Hospital – Intelligent Disease Prediction System

## ⭐ Support

If you like this project:

⭐ Star the repository on GitHub
