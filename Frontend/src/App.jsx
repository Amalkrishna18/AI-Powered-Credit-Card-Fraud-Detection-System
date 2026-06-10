import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    Time: 1000,
    V1: 0,
    V2: 0,
    V3: 0,
    V4: 0,
    V5: 0,
    V6: 0,
    V7: 0,
    V8: 0,
    V9: 0,
    V10: 0,
    V11: 0,
    V12: 0,
    V13: 0,
    V14: 0,
    V15: 0,
    V16: 0,
    V17: 0,
    V18: 0,
    V19: 0,
    V20: 0,
    V21: 0,
    V22: 0,
    V23: 0,
    V24: 0,
    V25: 0,
    V26: 0,
    V27: 0,
    V28: 0,
    Amount: 100,
  });

  const [result, setResult] = useState(null);

  const predictFraud = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/predict",
        formData
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }
  };

  const demoLegit = () => {
    setFormData({
      Time: 10000,
      V1: 0.5,
      V2: 0.2,
      V3: 0,
      V4: 0,
      V5: 0,
      V6: 0,
      V7: 0,
      V8: 0,
      V9: 0,
      V10: 0,
      V11: 0,
      V12: 0,
      V13: 0,
      V14: 0,
      V15: 0,
      V16: 0,
      V17: 0,
      V18: 0,
      V19: 0,
      V20: 0,
      V21: 0,
      V22: 0,
      V23: 0,
      V24: 0,
      V25: 0,
      V26: 0,
      V27: 0,
      V28: 0,
      Amount: 50,
    });
  };

  const demoFraud = () => {
    setFormData({
      Time: 406.0,
      V1: -2.312227,
      V2: 1.951992,
      V3: -1.609851,
      V4: 3.997906,
      V5: -0.522188,
      V6: -1.426545,
      V7: -2.537387,
      V8: 1.391657,
      V9: -2.770089,
      V10: -2.772272,
      V11: 3.202033,
      V12: -2.899907,
      V13: -0.595222,
      V14: -4.289254,
      V15: 0.389724,
      V16: -1.140747,
      V17: -2.830056,
      V18: -0.016822,
      V19: 0.416956,
      V20: 0.126911,
      V21: 0.517232,
      V22: -0.035049,
      V23: -0.465211,
      V24: 0.320198,
      V25: 0.044519,
      V26: 0.177840,
      V27: 0.261145,
      V28: -0.143276,
      Amount: 0,
    });
  };

  return (
    <div className="container">
      <h1>💳 Credit Card Fraud Detection System</h1>

      <div className="card">
        <label>Amount</label>
        <input
          type="number"
          value={formData.Amount}
          onChange={(e) =>
            setFormData({
              ...formData,
              Amount: Number(e.target.value),
            })
          }
        />

        <label>Time</label>
        <input
          type="number"
          value={formData.Time}
          onChange={(e) =>
            setFormData({
              ...formData,
              Time: Number(e.target.value),
            })
          }
        />

        <label>V1 : {formData.V1.toFixed(2)}</label>
        <input
          type="range"
          min="-10"
          max="10"
          step="0.1"
          value={formData.V1}
          onChange={(e) =>
            setFormData({
              ...formData,
              V1: Number(e.target.value),
            })
          }
        />

        <label>V2 : {formData.V2.toFixed(2)}</label>
        <input
          type="range"
          min="-10"
          max="10"
          step="0.1"
          value={formData.V2}
          onChange={(e) =>
            setFormData({
              ...formData,
              V2: Number(e.target.value),
            })
          }
        />

        <div className="buttons">
          <button onClick={demoLegit}>Demo Legit</button>
          <button onClick={demoFraud}>Demo Fraud</button>
          <button onClick={predictFraud}>Predict</button>
        </div>
      </div>

      {result && (
        <div
          className={
            result.prediction === 0
              ? "result legit"
              : "result fraud"
          }
        >
          <h2>
            {result.prediction === 0
              ? "✅ Safe Legitimate Transaction"
              : "🚨 High-Risk Fraudulent Transaction"}
          </h2>

          <p>
            Fraud Probability:{" "}
            {(result.fraud_probability * 100).toFixed(2)}%
          </p>
          <p>
            Confidence Level:{" "}
            {result.fraud_probability > 0.8
              ? "Very High"
              : result.fraud_probability > 0.5
              ? "Moderate"
              : "Low"}
          </p>

          <div className="progress">
            <div
              className="progress-fill"
              style={{
                width: `${result.fraud_probability * 100}%`,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
