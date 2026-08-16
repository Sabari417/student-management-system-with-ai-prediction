import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Student Performance ML API")


# Load trained model
model = joblib.load("model.pkl")


# Input data structure
class StudentData(BaseModel):
    attendance: float
    internal_marks: float
    assignment_marks: float
    previous_gpa: float
    study_hours: float
    backlogs: int


@app.get("/")
def home():
    return {
        "message": "Student Performance ML API is running"
    }


@app.post("/predict")
def predict(data: StudentData):

    input_data = pd.DataFrame([{
        "attendance": data.attendance,
        "internal_marks": data.internal_marks,
        "assignment_marks": data.assignment_marks,
        "previous_gpa": data.previous_gpa,
        "study_hours": data.study_hours,
        "backlogs": data.backlogs
    }])

    prediction = model.predict(input_data)[0]

    # Keep score between 0 and 100
    prediction = max(0, min(100, prediction))

    # Determine risk
    if prediction < 50:
        risk = "HIGH"
    elif prediction < 70:
        risk = "MEDIUM"
    else:
        risk = "LOW"

    return {
        "predicted_score": round(float(prediction), 2),
        "risk": risk
    }