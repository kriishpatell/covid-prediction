import requests

# The URL where the Flask app is running
url = 'http://127.0.0.1:5000/predict'

# The data you want to send for prediction
data = {
    "SEX": "1",
    "PNEUMONIA": "1",
    "AGE": "65",
    "PREGNANT": "2",
    "DIABETES": "2",
    "COPD": "2",
    "ASTHMA": "2",
    "INMSUPR": "2",
    "HIPERTENSION": "1",
    "OTHER_DISEASE": "2",
    "CARDIOVASCULAR": "2",
    "OBESITY": "2",
    "RENAL_CHRONIC": "2",
    "TOBACCO": "2"
}

# Make the POST request and get the response
response = requests.post(url, json=data)

# Print the status code and the prediction
print(f"Status Code: {response.status_code}")
print(f"Prediction: {response.json()}")