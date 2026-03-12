import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

MODEL_PATH = "brain_tumor_model.h5"

IMG_HEIGHT = 224
IMG_WIDTH = 224

CLASSES = ["glioma", "meningioma", "notumor", "pituitary"]

# Load model once
model = load_model(MODEL_PATH, compile=False)


def predict_tumor(image_path):

    img = image.load_img(image_path, target_size=(IMG_HEIGHT, IMG_WIDTH))
    img_array = image.img_to_array(img)

    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)

    index = np.argmax(predictions)
    confidence = float(np.max(predictions))

    return CLASSES[index], confidence


if __name__ == "__main__":

    test_image = "sample_mri.jpg"

    label, confidence = predict_tumor(test_image)

    print("Prediction:", label)
    print("Confidence:", confidence)