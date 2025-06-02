import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import './GoalSelection.css'; 
import axios from "axios";
const GoalSelection = () => {
  const [selectedGoal, setSelectedGoal] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { username ,gender } = location.state || {};

  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
  };

  const handleNextClick =async() => {
    if (!selectedGoal) {
      alert("Please select your main goal");
      return;
    }
    try {
      await axios.post('http://localhost:9000/user-data', {
        username,
        data: { gender, goal: selectedGoal  },
      });
    navigate("/focus", { state: { username,gender,goal: selectedGoal } });
  } 
  catch (error) {
    console.error("Error saving focus:", error.response?.data || error.message);
  }
}
  const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <div className="goal-container">
      <div className="header3">
        <h2>What's your main goal?</h2>
      </div>

      <div className="goal-options">
        <div
          className={`goal-card ${selectedGoal === "Lose Weight" ? "selected" : ""}`}
          onClick={() => handleGoalSelect("Lose Weight")}
        >
          <img src="losemen.png" alt="Lose Weight" className="goal-image" />
          <p>Lose Weight</p>
        </div>

        <div
          className={`goal-card ${selectedGoal === "Build Muscle" ? "selected" : ""}`}
          onClick={() => handleGoalSelect("Build Muscle")}
        >
          <img src="musclemen.png" alt="Build Muscle" className="goal-image" />
          <p>Build Muscle</p>
        </div>

        <div
          className={`goal-card ${selectedGoal === "Keep Fit" ? "selected" : ""}`}
          onClick={() => handleGoalSelect("Keep Fit")}
        >
          <img src="fitmen.png" alt="Keep Fit" className="goal-image" />
          <p>Keep Fit</p>
        </div>
        <div
          className={`goal-card ${selectedGoal === "Improve your posture" ? "selected" : ""}`}
          onClick={() => handleGoalSelect("Improve your posture")}
        >
          <img src="posture.png" alt="Improve your posture" className="goal-image" />
          <p>Improve your posture</p>
        </div>
        <div
          className={`goal-card ${selectedGoal === "Flexibility" ? "selected" : ""}`}
          onClick={() => handleGoalSelect("Flexibility")}
        >
          <img src="flexibility.png" alt="Flexibility" className="goal-image" />
          <p>Flexibility</p>
        </div>
      </div>
      
      <div className="buttons">
        <button className="backs" onClick={handleBackClick}>
          BACK
        </button>
      <button className="nexts" onClick={handleNextClick} disabled={!selectedGoal}>
        NEXT
      </button>
    </div>
    </div>
  );
};

export default GoalSelection;

