import requests

url = "https://medvision-ai-intelligent-disease-ugst.onrender.com/predict-brain-tumor"

# Create a dummy image
from PIL import Image
import io
img = Image.new('RGB', (100, 100), color = 'red')
img_byte_arr = io.BytesIO()
img.save(img_byte_arr, format='JPEG')
img_byte_arr = img_byte_arr.getvalue()

files = {'file': ('dummy.jpg', img_byte_arr, 'image/jpeg')}
data = {'patient_id': 1}

try:
    print(f"Sending POST to {url}...")
    response = requests.post(url, files=files, data=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response Body: {response.text}")
    print(f"Response Headers: {response.headers}")
except Exception as e:
    print(f"Error: {e}")
