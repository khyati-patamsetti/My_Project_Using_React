import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stylenav from './navigate.module.css';

export default function WellnessHub() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault(); 
        
        const term = searchTerm.toLowerCase();
        switch (term) {
            case "meditation":
                navigate("/meditation");
                break;
            case "exercise":
                navigate("/exercise");
                break;
            case "diet":
            case "nutritious diet":
                navigate("/diet");
                break;
            case "yoga":
                navigate("/yoga");
                break;
            case "calendar":
            case "period calendar":
                navigate("/period-calendar");
                break;
            default:
                alert("Topic not found. Try 'meditation', 'exercise', 'diet', 'yoga', or 'calendar'.");
        }
    };

    return (
        <div className={Stylenav.wellnessHub}>
            <div className={Stylenav.backgroundAnimation}></div> {/* Background Animation */}
            <h1 className={Stylenav.title}>Explore Your Wellness Journey</h1>
            <form onSubmit={handleSearchSubmit} className={Stylenav.searchForm}>
                <input
                    type="text"
                    className={Stylenav.searchBar}
                    placeholder="Search wellness topics (e.g., Meditation)"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button type="submit" className={Stylenav.searchButton}>Go</button>
            </form>
            <div className={Stylenav.infoSection}>
                <p className={Stylenav.tagline}>Your journey to wellness starts here. Find balance, nourishment, and peace.</p>
                <p className={Stylenav.quote}>“Wellness is the complete integration of body, mind, and spirit.”</p>
            </div>
        </div>
    );
}
