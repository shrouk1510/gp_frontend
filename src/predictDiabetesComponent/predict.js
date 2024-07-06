import React, { useState } from 'react';
import './predict.css';
import toast from 'react-hot-toast';
import { predictDiabetesRequest } from '../lib/api/predication';

const DiabetesPredictionForm = () => {
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        polyuria: '',
        polydipsia: '',
        suddenWeightLoss: '',
        weakness: '',
        polyphagia: '',
        genitalThrush: '',
        visualBlurring: '',
        itching: '',
        irritability: '',
        delayedHealing: '',
        partialParesis: '',
        muscleStiffness: '',
        alopecia: '',
        obesity: ''
    });

    const [prediction, setPrediction] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you can make an API call to get the prediction
        // For now, we will just log the form data and set a dummy prediction
        // console.log(formData);
        try {

            const result = await predictDiabetesRequest(formData)

            if (!result) {
                throw "something went wrong"
            }

            setPrediction(result?.prediction); // Replace with actual prediction result from API
            toast.success("Prediction completed");
        } catch (error) {
            typeof error === "string" ? toast.error(error) : alert(error);
        }
    };

    return (
        <div className='diabetesContainer'>
            <div className="diabetes-prediction-form">
                <h1>Diabetes Prediction</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="Age">Age (20-65) العمر :</label>
                        <input
                            type="number"
                            id="Age"
                            name="Age"
                            min="20"
                            max="65"
                            value={formData.age}
                            onChange={handleChange}
                            inputMode="numeric"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Gender">Gender الجنس:</label>
                        <select
                            id="Gender"
                            name="Gender"
                            value={formData.egnder}
                            onChange={handleChange}
                            required
                        >
                            <option value={''}>Select</option>
                            <option value={0}>Male</option>
                            <option value={1}>Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Polyuria">Polyuria (Excessive Urination) التبول المفرط:</label>
                        <select
                            id="Polyuria"
                            name="Polyuria"
                            value={formData.polyuria}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Polydipsia">Polydipsia (Excessive Thirst) العطش المفرط:</label>
                        <select
                            id="Polydipsia"
                            name="Polydipsia"
                            value={formData.polydipsia}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="suddenWeightLoss">Sudden Weight Loss فقدان الوزن المفاجئ:</label>
                        <select
                            id="suddenWeightLoss"
                            name="suddenWeightLoss"
                            value={formData.suddenWeightLoss}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Weakness">Weakness الضعف العام:</label>
                        <select
                            id="Weakness"
                            name="Weakness"
                            value={formData.weakness}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Polyphagia">Polyphagia (Excessive Hunger) الشهية المفرطة:</label>
                        <select
                            id="Polyphagia"
                            name="Polyphagia"
                            value={formData.polyphagia}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="GenitalThrush">Genital Thrush التهاب العضو التناسلي:</label>
                        <select
                            id="GenitalThrush"
                            name="GenitalThrush"
                            value={formData.genitalThrush}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="VisualBlurring">Visual Blurring عدم وضوح الرؤية:</label>
                        <select
                            id="VisualBlurring"
                            name="VisualBlurring"
                            value={formData.visualBlurring}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Itching">Itching حكة:</label>
                        <select
                            id="Itching"
                            name="Itching"
                            value={formData.itching}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Irritability">Irritability التهيج:</label>
                        <select
                            id="Irritability"
                            name="Irritability"
                            value={formData.irritability}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="DelayedHealing">Delayed Healing الشفاء المتأخر:</label>
                        <select
                            id="DelayedHealing"
                            name="DelayedHealing"
                            value={formData.delayedHealing}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="PartialParesis">Partial Paresis الشلل الجزئي:</label>
                        <select
                            id="PartialParesis"
                            name="PartialParesis"
                            value={formData.partialParesis}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="MuscleStiffness">Muscle Stiffness تصلب العضلات:</label>
                        <select
                            id="MuscleStiffness"
                            name="MuscleStiffness"
                            value={formData.muscleStiffness}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Alopecia">Alopecia (Hair Loss) تساقط الشعر:</label>
                        <select
                            id="Alopecia"
                            name="Alopecia"
                            value={formData.alopecia}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Obesity">Obesity السمنة:</label>
                        <select
                            id="Obesity"
                            name="Obesity"
                            value={formData.obesity}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="submit-button">Predict</button>
                    </div>
                </form>
                {prediction && (
                    <div className="prediction-box">
                        <h2>Prediction</h2>
                        <p>{prediction}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiabetesPredictionForm;
