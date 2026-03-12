import os
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Hyperparameters
IMG_HEIGHT = 224
IMG_WIDTH = 224
BATCH_SIZE = 32
EPOCHS = 10
DATASET_DIR = "dataset" # Expected directory containing class subfolders

def main():
    if not os.path.exists(DATASET_DIR):
        print(f"Error: Dataset directory '{DATASET_DIR}' not found.")
        print("Please arrange your dataset in the following structure:")
        print(f"  {DATASET_DIR}/")
        print("    class_1/")
        print("      img1.jpg")
        print("      img2.jpg")
        print("    class_2/")
        print("      img1.jpg")
        print("      ...")
        return

    # Normalize pixel values to [0, 1] by rescaling
    # Utilizing validation_split to split 20% of data for validation
    datagen = ImageDataGenerator(
        rescale=1./255,
        validation_split=0.2 
    )

    # Load and resize training data
    print("Loading training data...")
    train_generator = datagen.flow_from_directory(
        DATASET_DIR,
        target_size=(IMG_HEIGHT, IMG_WIDTH), # Resize images to 224x224
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        subset='training'
    )

    # Load and resize validation data
    print("Loading validation data...")
    validation_generator = datagen.flow_from_directory(
        DATASET_DIR,
        target_size=(IMG_HEIGHT, IMG_WIDTH), # Resize images to 224x224
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        subset='validation'
    )

    num_classes = train_generator.num_classes
    print(f"Detected {num_classes} classes: {list(train_generator.class_indices.keys())}")

    # Build a simple CNN model
    model = Sequential([
        # 1st Convolutional block
        Conv2D(32, (3, 3), activation='relu', input_shape=(IMG_HEIGHT, IMG_WIDTH, 3)),
        MaxPooling2D((2, 2)),
        
        # 2nd Convolutional block
        Conv2D(64, (3, 3), activation='relu'),
        MaxPooling2D((2, 2)),
        
        # 3rd Convolutional block
        Conv2D(128, (3, 3), activation='relu'),
        MaxPooling2D((2, 2)),
        
        # Flatten and Dense layers
        Flatten(),
        Dense(128, activation='relu'),
        Dropout(0.5), # Dropout for regularization
        Dense(num_classes, activation='softmax')
    ])

    model.compile(
        optimizer='adam', 
        loss='categorical_crossentropy', 
        metrics=['accuracy']
    )
    
    model.summary()

    # Train the model for a few epochs
    print("\nStarting training...")
    history = model.fit(
        train_generator,
        epochs=EPOCHS,
        validation_data=validation_generator
    )

    # Save the trained model
    model_filename = "brain_tumor_model.h5"
    model.save(model_filename)
    print(f"\nModel successfully saved as '{model_filename}'")

if __name__ == "__main__":
    main()
