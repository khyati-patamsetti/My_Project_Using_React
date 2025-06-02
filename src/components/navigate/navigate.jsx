import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stylenav from './navigate.module.css';

export default function WellnessHub() {
    const navigate = useNavigate();
    const [selectedTopic, setSelectedTopic] = useState("");

    const handleDropdownChange = (event) => {
        setSelectedTopic(event.target.value);
    };

    const handleDropdownSubmit = (event) => {
        event.preventDefault();
        if (!selectedTopic) {
            alert("Please select a topic.");
            return;
        }
        navigate(selectedTopic);
    };

    return (
        <div className={Stylenav.wellnessHub}>
            <div className={Stylenav.backgroundAnimation}></div>
            <h1 className={Stylenav.title}>Explore Your Wellness Journey</h1>
            
            <form onSubmit={handleDropdownSubmit} className={Stylenav.searchForm}>
                <select
                    value={selectedTopic}
                    onChange={handleDropdownChange}
                    className={Stylenav.searchBar}
                >
                    <option value="">-- Select a Topic --</option>
                    <option value="/meditation">Meditation</option>
                    <option value="/exercise">Exercise</option>
                    <option value="/diet">Nutritious Diet</option>
                    <option value="/yoga">Yoga</option>
                    <option value="/period-calendar">Period Calendar</option>
                </select>
                <button type="submit" className={Stylenav.searchButton}>Go</button>
            </form>

            <div className={Stylenav.infoSection}>
                <p className={Stylenav.tagline}>Your journey to wellness starts here. Find balance, nourishment, and peace.</p>
                <p className={Stylenav.quote}>“Wellness is the complete integration of body, mind, and spirit.”</p>
            </div>
        </div>
    );
}
