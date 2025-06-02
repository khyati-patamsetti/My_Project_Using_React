import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import './heightselection.css'; 
import axios from "axios";
const HeightSelection = () => {
  const [unit, setUnit] = useState("ft"); 
  const [heightCm, setHeightCm] = useState(175); 
  const [heightFt, setHeightFt] = useState({ feet: 5, inches: 9 }); 
  const navigate = useNavigate();
  const location = useLocation();
  const { username ,gender,goal,focus} = location.state || {};
  const handleUnitSwitch = (newUnit) => {
    setUnit(newUnit);
  };
  
  const handleNextClick =async() => {
    let heightToSubmit;

    if (unit === "cm") {
      heightToSubmit = heightCm;
    } else {
      heightToSubmit = heightFt.feet * 12 + heightFt.inches; 
    }
    try {
      await axios.post('http://localhost:9000/user-data', {
        username,
        data: { gender, goal, focus, height: heightToSubmit },
      });
      navigate("/weight", { state: { username, gender, goal, focus, height: heightToSubmit } });
    } catch (error) {
      console.error("Error saving height:", error.response?.data || error.message);
    }
  };
  const handleBackClick = () => {
    navigate(-1); 
  };
  const handleHeightChange = (e) => {
    const newHeight = parseInt(e.target.value);
    if (unit === "cm") {
      setHeightCm(newHeight);
    } else {
      const feet = Math.floor(newHeight / 12);
      const inches = newHeight % 12;
      setHeightFt({ feet, inches });
    }
  }
  return (
    <div className="height-container">
      <div className="header4">
        <h2>What's your height?</h2>
      </div>
      <div className="unit-toggle">
        <button
          className={`unit-button ${unit === "cm" ? "active" : ""}`}
          onClick={() => handleUnitSwitch("cm")}
        >
          cm
        </button>
        <button
          className={`unit-button ${unit === "ft" ? "active" : ""}`}
          onClick={() => handleUnitSwitch("ft")}
        >
          ft
        </button>
      </div>
      <div className="height-display">
        {unit === "cm" ? (
          <span>{heightCm} cm</span>
        ) : (
          <span>
            {heightFt.feet} ft {heightFt.inches} in
          </span>
        )}
      </div>
      <input
        type="range"
        min={unit === "cm" ? 90 : 36} 
        max={unit === "cm" ? 240 : 96} 
        value={unit === "cm" ? heightCm : heightFt.feet * 12 + heightFt.inches}
        onChange={handleHeightChange}
        className="height-slider"
      />
      <div className="buttonc">
        <button className="backss" onClick={handleBackClick}>
          BACK  
        </button>
        <button className="nextss" onClick={handleNextClick}>
          NEXT
        </button>
      </div>
    </div>
    
  );
}

export default HeightSelection;









