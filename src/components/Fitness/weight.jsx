import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import './weight.css'; 
import axios from 'axios';
const WeightSelection = () => {
  const [unit, setUnit] = useState('kg');
  const [weight, setWeight] = useState(60.6); 
  const navigate = useNavigate();
  const location = useLocation();
  const { username ,gender,goal,focus,height} = location.state || {};
  const handleUnitChange = (newUnit) => {
    if (newUnit === 'kg' && unit === 'lbs') {
      setWeight((weight / 2.20462).toFixed(1));
    } else if (newUnit === 'lbs' && unit === 'kg') {
      setWeight((weight * 2.20462).toFixed(1)); 
    }
    setUnit(newUnit);
  };
  const handleNextClick =async () => {
    try {
      await axios.post('http://localhost:9000/user-data', {
        username,
        data: { gender, goal, focus, height, weight: parseFloat(weight) },
      });
      navigate("/", { state: { username, gender, goal, focus, height, weight:parseFloat(weight)} });
    } catch (error) {
      console.error("Error saving weight:", error.response?.data || error.message);
    }
  };



  const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <div className="weight-container">
      <div className="header5">
        <h2>What's your current weight?</h2>
      </div>

      <div className="unit-toggle"> 
        <button
          className={`unit-button ${unit === 'kg' ? 'active' : ''}`}
          onClick={() => handleUnitChange('kg')}
        >
          kg
        </button>
        <button
          className={`unit-button ${unit === 'lbs' ? 'active' : ''}`}
          onClick={() => handleUnitChange('lbs')}
        >
          lbs
        </button>
      </div>
      <div className="weight-display">
        {weight} {unit}
      </div>
      <input
        type="range"
        min={unit === 'kg' ? 30 : 66}
        max={unit === 'kg' ? 150 : 330}
        value={weight}
        step={0.1}
        onChange={(e) => setWeight(e.target.value)}
        className="weight-slider"
      />
       <div className="buttonr">
        <button className="backssss" onClick={handleBackClick}>
          BACK
        </button>
        <button className="nextssss" onClick={handleNextClick}>
          NEXT
        </button>
      </div>
    </div>
     
  );
}

export default WeightSelection;
