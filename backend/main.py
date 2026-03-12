from tensorflow.keras.models import load_model
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import requests
from fastapi import HTTPException
from PIL import Image
import io
import json
from sqlalchemy import text
from database import SessionLocal


app = FastAPI()

# -----------------------------
# CORS (Allow React Frontend)
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# LOAD MODELS
# -----------------------------
import os

# -----------------------------
# LOAD MODELS
# -----------------------------
heart_model = None
diabetes_model = None
brain_tumor_model = None

try:
    if os.path.exists("../ai-models/heart_disease_model/heart_disease_model.pkl"):
        heart_model = joblib.load("../ai-models/heart_disease_model/heart_disease_model.pkl")
    if os.path.exists("../ai-models/diabetes_model/diabetes_model.pkl"):
        diabetes_model = joblib.load("../ai-models/diabetes_model/diabetes_model.pkl")
    # Brain tumor model loading deferred to endpoint to save memory
    print("Models loaded successfully.")
except Exception as e:
    print(f"Warning: Failed to load models. {e}")

classes = ["glioma", "meningioma", "notumor", "pituitary"]


@app.get("/")
def home():
    return {"message": "AI Smart Hospital API Running"}


# ======================================================
# HEART DISEASE PREDICTION
# ======================================================

class HeartDiseaseInput(BaseModel):
    patient_id: int
    age: int
    sex: int
    cp: int
    trestbps: int
    chol: int
    fbs: int
    restecg: int
    thalach: int
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int


@app.post("/predict-heart")
def predict_heart_disease(data: HeartDiseaseInput):
    if heart_model is None:
        return {"error": "Heart disease model is not loaded. Please ensure the model file exists."}, 503


    input_data = np.array([
        data.age,
        data.sex,
        data.cp,
        data.trestbps,
        data.chol,
        data.fbs,
        data.restecg,
        data.thalach,
        data.exang,
        data.oldpeak,
        data.slope,
        data.ca,
        data.thal
    ]).reshape(1, -1)

    prediction = heart_model.predict(input_data)[0]
    probability = heart_model.predict_proba(input_data)[0][1]

    confidence = float(round(probability * 100, 2))

    if prediction == 0:
        result = "No Heart Disease Detected"
    else:
        result = "High Risk of Heart Disease"

    db = SessionLocal()

    try:
        db.execute(
            text("""
            INSERT INTO predictions 
            (patient_id, disease_type, prediction_result, confidence)
            VALUES (:pid, :dtype, :result, :conf)
            """),
            {
                "pid": data.patient_id,
                "dtype": "heart_disease",
                "result": result,
                "conf": confidence
            }
        )
        db.commit()
    finally:
        db.close()

    return {
        "prediction": result,
        "confidence_score": confidence
    }


# ======================================================
# DIABETES PREDICTION
# ======================================================

class DiabetesInput(BaseModel):
    patient_id: int
    pregnancies: int
    glucose: int
    bloodpressure: int
    skinthickness: int
    insulin: int
    bmi: float
    diabetespedigreefunction: float
    age: int


@app.post("/predict-diabetes")
def predict_diabetes(data: DiabetesInput):
    if diabetes_model is None:
        return {"error": "Diabetes model is not loaded. Please ensure the model file exists."}, 503


    input_data = np.array([
        data.pregnancies,
        data.glucose,
        data.bloodpressure,
        data.skinthickness,
        data.insulin,
        data.bmi,
        data.diabetespedigreefunction,
        data.age
    ]).reshape(1, -1)

    prediction = diabetes_model.predict(input_data)[0]
    probability = diabetes_model.predict_proba(input_data)[0][1]

    confidence = float(round(probability * 100, 2))

    if prediction == 0:
        result = "No Diabetes Detected"
    else:
        result = "High Risk of Diabetes"

    db = SessionLocal()
    try:
        db.execute(
            text("""
            INSERT INTO predictions 
            (patient_id, disease_type, prediction_result, confidence)
            VALUES (:pid, :dtype, :result, :conf)
            """),
            {
                "pid": data.patient_id,
                "dtype": "diabetes",
                "result": result,
                "conf": confidence
            }
        )
        db.commit()
    finally:
        db.close()

    return {
        "prediction": result,
        "confidence_score": confidence
    }


# ======================================================
# BRAIN TUMOR PREDICTION
# ======================================================

# ======================================================
# BRAIN TUMOR PREDICTION
# ======================================================

@app.post("/predict-brain-tumor")
async def predict_brain_tumor(
    patient_id: int = Form(...),
    file: UploadFile = File(...)
):
    global brain_tumor_model

    MODEL_URL = "https://huggingface.co/jahnavi2645/medvision-brain-tumor-model/resolve/main/brain_tumor_model.h5"
    MODEL_PATH = "brain_tumor_model.h5"

    try:
        if brain_tumor_model is None:
            if not os.path.exists(MODEL_PATH):
                print("Downloading brain tumor model from Hugging Face...")
                r = requests.get(MODEL_URL)
                with open(MODEL_PATH, "wb") as f:
                    f.write(r.content)

            brain_tumor_model = load_model(MODEL_PATH)
            print("Brain tumor model loaded successfully.")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load AI model: {str(e)}")

    contents = await file.read()

    img = Image.open(io.BytesIO(contents)).convert("RGB")
    img = img.resize((224, 224))

    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = brain_tumor_model.predict(img_array)

    confidence = float(np.max(prediction))
    index = int(np.argmax(prediction))

    result = classes[index]

    db = SessionLocal()
    try:
        db.execute(
            text("""
            INSERT INTO predictions 
            (patient_id, disease_type, prediction_result, confidence)
            VALUES (:pid, :dtype, :result, :conf)
            """),
            {
                "pid": patient_id,
                "dtype": "brain_tumor",
                "result": result,
                "conf": confidence
            }
        )
        db.commit()
    finally:
        db.close()

    return {
        "prediction": result,
        "confidence": confidence
    }
# ======================================================
# PREDICTIONS HISTORY
# ======================================================

@app.get("/predictions")
def get_predictions():
    db = SessionLocal()
    try:
        # Assuming predictions table has id, patient_id, disease_type, prediction_result, confidence
        # Checking if created_at exists, if so we order by it. But basic order by id desc is safer.
        result = db.execute(
            text("""
            SELECT id, patient_id, disease_type, prediction_result, confidence
            FROM predictions
            ORDER BY id DESC
            """)
        ).fetchall()
        
        predictions = []
        for row in result:
            predictions.append({
                "id": row[0],
                "patient_id": row[1],
                "disease_type": row[2],
                "prediction_result": row[3],
                "confidence": float(row[4]) if row[4] is not None else None
            })
    finally:
        db.close()
    
    return predictions


# ======================================================
# LOGIN SYSTEM
# ======================================================

from fastapi import HTTPException

class LoginInput(BaseModel):
    username: str
    password: str

@app.post("/login")
def login(data: LoginInput):
    db = SessionLocal()
    try:
        result = db.execute(
            text("""
            SELECT id, username, role FROM users 
            WHERE username = :user AND password = :pass
            """),
            {"user": data.username, "pass": data.password}
        ).fetchone()

        if not result:
            raise HTTPException(status_code=401, detail="Invalid username or password")
        
        return {
            "message": "Login successful",
            "username": result[1],
            "role": result[2]
        }
    finally:
        db.close()


# ======================================================
# APPOINTMENT BOOKING
# ======================================================

class AppointmentInput(BaseModel):
    patient_id: int
    doctor_name: str
    appointment_date: str
    appointment_time: str

@app.post("/book-appointment")
def book_appointment(data: AppointmentInput):
    db = SessionLocal()
    try:
        db.execute(
            text("""
            INSERT INTO appointments (patient_id, doctor_name, appointment_date, appointment_time, status)
            VALUES (:pid, :doc, :date, :time, 'Scheduled')
            """),
            {
                "pid": data.patient_id,
                "doc": data.doctor_name,
                "date": data.appointment_date,
                "time": data.appointment_time
            }
        )
        db.commit()
    finally:
        db.close()
    
    return {"message": "Appointment booked successfully"}


@app.get("/appointments/{patient_id}")
def get_appointments(patient_id: int):
    db = SessionLocal()
    try:
        result = db.execute(
            text("""
            SELECT id, patient_id, doctor_name, appointment_date, appointment_time, status
            FROM appointments
            WHERE patient_id = :pid
            ORDER BY appointment_date
            """),
            {"pid": patient_id}
        ).fetchall()
        
        appointments = []
        for row in result:
            appointments.append({
                "id": row[0],
                "patient_id": row[1],
                "doctor_name": row[2],
                "appointment_date": str(row[3]),
                "appointment_time": str(row[4]),
                "status": row[5]
            })
    finally:
        db.close()
    
    return appointments
