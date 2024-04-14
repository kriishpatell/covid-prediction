from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the model
model = load('covid-19-predict.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    # Get the data from the POST request
    data = request.get_json(force=True)
    
    # Convert data into DataFrame
    data_df = pd.DataFrame([data])

    column_mapping = {
        'sex':'SEX',
        'age': 'AGE',
        'hasPneumonia': 'PNEUMONIA',
        'isPregnant': 'PREGNANT',
        'hasDiabetes': 'DIABETES',
        'hasAsthma': 'ASTHMA',
        'hasCOPD': 'COPD',
        'isImmunosuppressed': 'INMSUPR',
        'hasHypertension': 'HIPERTENSION',
        'hasOtherDiseases': 'OTHER_DISEASE',
        'hasCardiovascularDisease': 'CARDIOVASCULAR',
        'isObese': 'OBESITY',
        'hasChronicRenalDisease': 'RENAL_CHRONIC',
        'isTobaccoUser':'TOBACCO',
    }
    data_df.rename(columns=column_mapping, inplace=True)
    
    # Make prediction
    prediction = model.predict(data_df)

    risk_level = "You are at a high-risk" if prediction[0] <= 3 else "You are at a low-risk"
    
    # Send back the prediction as a JSON
    return jsonify({"risk_level": risk_level})

if __name__ == '__main__':
    app.run(port=5000, debug=True)