"use client"
import { useState } from 'react';
import axios from 'axios';

export default function FormPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        sex: '',
        hasPneumonia: '',
        age: '',
        isPregnant: '',
        hasDiabetes: '',
        hasCOPD: '',
        hasAsthma: '',
        isImmunosuppressed: '',
        hasHypertension: '',
        hasOtherDiseases: '',
        hasCardiovascularDisease: '',
        isObese: '',
        hasChronicRenalDisease: '',
        isTobaccoUser: '',
    });
    const [riskMessage, setRiskMessage] = useState('');
    const [showForm, setShowForm] = useState(true);

    const steps = [
        [
            { id: 'sex', question: 'Sex (M or F)', type: 'dropdown', options: ['M', 'F'] },
            { id: 'age', question: 'Age', type: 'input' },
            { id: 'isPregnant', question: 'Are you currently pregnant?', type: 'dropdown', options: ['Yes', 'No'] },
            { id: 'hasDiabetes', question: 'Do you have diabetes?', type: 'dropdown', options: ['Yes', 'No'] },
            { id: 'hasPneumonia', question: 'Do you have pneumonia?', type: 'dropdown', options: ['Yes', 'No'] },
            { id: 'hasCOPD', question: 'Do you have Chronic obstructive pulmonary disease (COPD)?', type: 'dropdown', options: ['Yes', 'No'] },
            { id: 'hasAsthma', question: 'Do you have asthma?', type: 'dropdown', options: ['Yes', 'No'] },
        ],
        [
            { id: 'isImmunosuppressed', question: 'Are you immunosuppressed?', type: 'dropdown', options: ['Yes', 'No'] },
            { id: 'hasHypertension', question: 'Do you have high blood pressure (hypertension)?', type: 'dropdown', options: ['Yes', 'No'] },
            { id: 'hasCardiovascularDisease', question: 'Do you have a cardiovascular disease?', type: 'dropdown', options: ['Yes', 'No'] },
            { id: 'hasChronicRenalDisease', question: 'Do you have a chronic renal disease?', type: 'dropdown', options: ['Yes', 'No'] },
            { id: 'hasOtherDiseases', question: 'Do you have any other diseases?', type: 'dropdown', options: ['Yes', 'No'] },
            { id: 'isObese', question: 'Are you classified as \'obese\'?', type: 'dropdown', options: ['Yes', 'No'] },
            { id: 'isTobaccoUser', question: 'Are you a tobacco user?', type: 'dropdown', options: ['Yes', 'No'] },
        ],
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const nextStep = () => {
        setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Submit form logic here
        const convertedData = Object.keys(formData).reduce((acc, key) => {
            let value = formData[key];
            if (value === 'Yes') {
                value = 1;
            } else if (value === 'No') {
                value = 2;
            } else if (key === 'sex') {
                value = value === 'M' ? 2 : value === 'F' ? 1 : value;
            }
            acc[key] = value;
            return acc;

        }, {});

        console.log(convertedData)

        const endpoint = 'http://127.0.0.1:5000/predict';

        try {
            // Make a POST request with the converted data
            const response = await axios.post(endpoint, convertedData);
            console.log('Response:', response.data);
            const riskLevel = response.data.risk_level; // Access the risk level from the response
            setRiskMessage(riskLevel);
            console.log('Risk Message:', riskMessage);
            setShowForm(false);
            // Handle response here (e.g., showing a success message, redirecting, etc.)
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error here (e.g., showing an error message)
        }


    };

    const renderStep = (step) => {
        return step.map(question => (
            <div key={question.id} className="mb-4">
                <label htmlFor={question.id} className="block text-lg font-medium text-gray-700 mb-2">
                    {question.question}
                </label>
                {question.type === 'input' ? (
                    <input
                        type="number"
                        id={question.id}
                        name={question.id}
                        value={formData[question.id]}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-indigo-500 text-black focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md h-8 pl-4"
                        required
                    />
                ) : (
                    <select
                        id={question.id}
                        name={question.id}
                        value={formData[question.id]}
                        onChange={handleChange}
                        className="block w-full pl-3 pr-10 py-2 text-black border-gray-300 focus:outline-none focus:ring-indigo-500 border-2 focus:border-indigo-500 sm:text-sm rounded-md"
                        required
                    >
                        <option value="">Select</option>
                        {question.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                )}
            </div>
        ));
    };

    return (
        <div className="flex flex-col justify-center py-12 sm:px-6 w-full">
            {showForm && 
                    <div className="">
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4">
                        {renderStep(steps[currentStep])}
                        <div className="flex justify-between">
                            
                            {currentStep > 0 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="py-1 px-6 border border-transparent text-sm font-medium rounded-md text-black bg-gray-300 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    Previous
                                </button>
                            )}
                            {currentStep < steps.length - 1 && (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="py-1 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Next
                                </button>
                            )}
                            {currentStep === steps.length - 1 && (
                                <button
                                    type="submit"
                                    className="py-1 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            }
            {riskMessage && (
                <div className={`p-4 rounded shadow-md text-black text- text-5xl font-bold ${riskMessage === 'You are at a low-risk' ? 'bg-blue-400' : 'bg-red-500'}`}>
                    <p>{riskMessage}</p>
                    <br/>
                    {riskMessage === 'You are at a low-risk' ? (
                        <p className='text-base font-normal leading-6'>Here are five key steps for someone at low risk of COVID-19 to prevent transmission to others:<br/>

                            1. Wear a Mask: Especially in crowded or enclosed spaces, wearing a mask can significantly reduce the risk of spreading the virus to others.
                            <br/>
                            2. Practice Social Distancing: Maintain a distance of at least 6 feet from others, particularly in indoor settings or where physical distancing is challenging.
                            <br/>
                            3. Practice Good Hand Hygiene: Regularly wash hands with soap and water or use hand sanitizer with at least 60% alcohol to reduce the risk of spreading the virus through contact.
                            <br/>
                            4. Stay Home if Sick: If feeling unwell, even with mild symptoms, stay home and avoid contact with others to prevent potential transmission.
                            <br/>
                            5. Support Vaccination: Encourage vaccination among those eligible and support efforts to increase vaccination rates in the community to help curb the spread of the virus.
                        </p>
                    ) : (
                        <p className='text-base font-normal leading-6'>Here are five key steps someone at high risk of COVID-19 should take:<br/>
                        1. Stay Home as Much as Possible: Minimize outings and avoid crowded places to reduce your risk of exposure to the virus.
                        <br/>
                        2. Strictly Follow Public Health Guidelines: Adhere strictly to guidelines provided by health authorities, including wearing masks, practicing social distancing, and avoiding non-essential travel.
                        <br/>
                        3. Prioritize Vaccination: Ensure you're vaccinated against COVID-19 as soon as you're eligible, and follow any recommendations for booster doses to maximize protection.
                        <br/>
                        4. Ensure Good Ventilation: When indoors, ensure good ventilation by opening windows and doors to improve airflow, which can help reduce the concentration of viral particles.
                        <br/>
                        5. Maintain a Support System: Stay connected with friends, family, or support groups virtually to maintain social connections while minimizing the risk of exposure.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}