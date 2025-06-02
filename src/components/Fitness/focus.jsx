import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import "./focus.css"; 
import axios from "axios";

const FocusAreaSelection = () => {
  const [selectedArea, setSelectedArea] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { username, gender,goal } = location.state || {};
  const handleAreaSelect = (area) => {
    setSelectedArea(area);
  };

  const handleNextClick = async() => {
    if (!selectedArea) {
      alert("Please select a focus area");
      return;
    }
    try {
      await axios.post('http://localhost:9000/user-data', {
        username,
        data: { gender,goal, focus: selectedArea },
      });
      navigate("/height", { state: { username, gender,goal, focus: selectedArea} });
    } catch (error) {
      console.error("Error saving focus:", error.response?.data || error.message);
    }
  };
  const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <div className="focus-container">
      <div className="header2">
        <h2>What's your focus area?</h2>
      </div>

      <div className="focus-content">
        <div className="focus-options">
          {["Full Body", "Arm", "Chest", "Abs", "Leg"].map((area) => (
            <div
              key={area}
              className={`focus-option ${selectedArea === area ? "selected" : ""}`}
              onClick={() => handleAreaSelect(area)}
            >
              {area}
            </div>
          ))}
        </div>

        <div className="focus-image">
          <img src="fitmale-removebg-preview.png" alt="Body" className="body-image" />
        </div>
      </div>
      <div className="buttonss">
        <button className="backsss" onClick={handleBackClick}>
          BACK
        </button>
      <button className="nextsss" onClick={handleNextClick} disabled={!selectedArea}>
        NEXT
      </button>
    </div>
    </div>
  );
};

export default FocusAreaSelection;







