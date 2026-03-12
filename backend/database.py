from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg2://neondb_owner:npg_pO9zPoUDAF8t@ep-patient-boat-adwjjswj-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require")

# SQLAlchemy 1.4+ requires specifically postgresql+psycopg2:// instead of just postgresql:// or postgres://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+psycopg2://", 1)
elif DATABASE_URL.startswith("postgresql://") and not DATABASE_URL.startswith("postgresql+psycopg2://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg2://", 1)

if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    try:
        with engine.begin() as conn:
            if DATABASE_URL.startswith("sqlite"):
                # Create tables for SQLite
                conn.execute(text("""
                    CREATE TABLE IF NOT EXISTS users (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        username VARCHAR(50) UNIQUE NOT NULL,
                        password VARCHAR(50) NOT NULL,
                        role VARCHAR(20) NOT NULL
                    )
                """))
                conn.execute(text("""
                    INSERT OR IGNORE INTO users (username, password, role) VALUES 
                    ('admin1', 'admin123', 'admin'),
                    ('doctor1', 'doctor123', 'doctor'),
                    ('reception1', 'recep123', 'receptionist')
                """))
                conn.execute(text("""
                    CREATE TABLE IF NOT EXISTS appointments (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        patient_id INTEGER NOT NULL,
                        doctor_name VARCHAR(100) NOT NULL,
                        appointment_date DATE NOT NULL,
                        appointment_time TIME NOT NULL,
                        status VARCHAR(50) DEFAULT 'Scheduled',
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                """))
                conn.execute(text("""
                    CREATE TABLE IF NOT EXISTS predictions (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        patient_id INTEGER NOT NULL,
                        disease_type VARCHAR(50) NOT NULL,
                        prediction_result VARCHAR(100) NOT NULL,
                        confidence FLOAT,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                """))
    except Exception as e:
        print(f"Database Initialization Error: {e}")

init_db()
