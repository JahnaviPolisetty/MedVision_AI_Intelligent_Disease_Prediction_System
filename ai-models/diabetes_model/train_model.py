import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

def main():
    # Load dataset
    print("Loading dataset...")
    try:
        data = pd.read_csv("diabetes.csv")
    except FileNotFoundError:
        print("Error: diabetes.csv not found in the current directory.")
        return

    # Split features and target
    X = data.drop("Outcome", axis=1)
    y = data["Outcome"]

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train a RandomForestClassifier
    print("Training RandomForestClassifier...")
    model = RandomForestClassifier(random_state=42)
    model.fit(X_train, y_train)

    # Predict on test set
    y_pred = model.predict(X_test)

    # Calculate and print accuracy
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model Accuracy: {accuracy:.4f}")

    # Save the trained model
    model_filename = "diabetes_model.pkl"
    joblib.dump(model, model_filename)
    print(f"Model saved to {model_filename}")

if __name__ == "__main__":
    main()
