import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import './fit.css'; 
import axios from 'axios';

const GenderSelection = () => {
  const [selectedGender, setSelectedGender] = useState("");
  const navigate = useNavigate(); 
  const location = useLocation();
  const {username} = location.state || {};

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleNextClick = async() => {
    if (!selectedGender) {
      alert("Please select a gender");
      return;
    }
    try {
      await axios.post('http://localhost:9000/user-data', {
        username,
        data: { gender: selectedGender },
      });
      localStorage.setItem("selectedGender", selectedGender);
      navigate("/goal-selection", { state: {username, gender: selectedGender } });
    } catch (error) {
      console.error("Error saving gender:", error.response?.data || error.message);
    }
  };

  return (
    <div className="gender-container">
      <div className="heade1r">
        <h2>What's your gender?</h2>
        <p>Let us know you better</p>
      </div>

      <div className="gender-options">
        <div
          className={`gender-card ${selectedGender === "Male" ? "selected" : ""}`}
          onClick={() => handleGenderSelect("Male")}
        >
          <img src="fitmale-removebg-preview.png" alt="Male" className="gender-image" />
          <p>Male</p>
        </div>

        <div
          className={`gender-card ${selectedGender === "Female" ? "selected" : ""}`}
          onClick={() => handleGenderSelect("Female")}
        >
          <img src="fiitwomen-removebg-preview.png" alt="Female" className="gender-image" />
          <p>Female</p>
        </div>
      </div>

      <div className="other-option">
        <label>
          <input
            type="radio"
            value="Others"
            checked={selectedGender === "Others"}
            onChange={() => handleGenderSelect("Others")}
          />
          Others / I'd rather not say
        </label>
      </div>

      <button className="next" onClick={handleNextClick} disabled={!selectedGender}>
        NEXT
      </button>
    </div>
  );
};

export default GenderSelection;












