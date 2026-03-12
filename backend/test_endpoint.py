from main import predict_heart_disease, HeartDiseaseInput

data = HeartDiseaseInput(
  age=35, sex=1, cp=0, trestbps=118, chol=170, fbs=0, restecg=1,
  thalach=172, exang=0, oldpeak=0.0, slope=2, ca=0, thal=2
)

try:
    res = predict_heart_disease(data)
    print("Success:", res)
except Exception as e:
    import traceback
    traceback.print_exc()
