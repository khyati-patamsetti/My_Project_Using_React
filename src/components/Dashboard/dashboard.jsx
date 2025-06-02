import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './dashboard.css';
import axios from 'axios';

Chart.register(...registerables);

const totalExercises = 24; // Total number of exercises

const Dashboard = () => {
    const [activities, setActivities] = useState({
        exercise: { total: totalExercises, completed: 0 },
        yoga: { total: 2, completed: 0 },
        meditation: { total: 2, completed: 0 }
    });

    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const username = localStorage.getItem('username'); // Get the username from local storage

        const fetchSelectedExercises = async () => {
            const username = localStorage.getItem('username'); // Get the username from local storage
            if (!username) {
                console.error("No username found in local storage. Cannot fetch selected exercises.");
                return; // Exit the function
            }
            
            try {
                const response = await axios.get(`http://localhost:9000/getSelectedExercises/${username}`);
                const completedExercises = response.data.length; // Count of selected exercises
                setActivities(prev => ({
                    ...prev,
                    exercise: {
                        ...prev.exercise,
                        completed: completedExercises // Set completed to the count of selected exercises
                    }
                }));
            } catch (error) {
                console.error('Error fetching selected exercises:', error);
            }
        };
        
        

        fetchSelectedExercises(); // Fetch selected exercises
        setLoading(false); 
    }, []);

    const calculatePercentage = (type) => {
        return (activities[type].completed / activities[type].total) * 100;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <h2>User Dashboard</h2>
            <div className="activities-section">
                {['exercise', 'yoga', 'meditation'].map(type => (
                    <UserActivity
                        key={type}
                        type={type}
                        completed={activities[type].completed}
                        total={activities[type].total}
                        percentage={calculatePercentage(type)}
                    />
                ))}
            </div>
        </div>
    );
};

const UserActivity = ({ type, completed, total, percentage }) => {
    return (
        <div className="activity-card">
            <h4 className="activity-title">{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
            <div style={{ width: '200px', margin: '10px auto' }}>
                <CircularProgressbar
                    value={percentage}
                    text={`${Math.round(percentage)}%`}
                    strokeWidth={20}
                    styles={buildStyles({
                        textSize: '16px',
                        pathColor: `#007bff`,
                        textColor: '#333',
                        trailColor: '#e0e0e0'
                    })}
                />
            </div>
            <p className="activity-progress">Completed: {completed}/{total}</p>
        </div>
    );
};

export default Dashboard;
