import requests
import json

url = "https://medvision-ai-intelligent-disease-ugst.onrender.com/login"
payload = {
    "username": "doctor1",
    "password": "doctor123"
}
headers = {
    "Content-Type": "application/json"
}

try:
    print(f"Sending POST to {url}...")
    response = requests.post(url, json=payload, headers=headers)
    print(f"Status Code: {response.status_code}")
    print(f"Response Body: {response.text}")
    print(f"Response Headers: {response.headers}")
except Exception as e:
    print(f"Error: {e}")
