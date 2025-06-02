import React, { useState, useCallback, useEffect } from "react";
import CalendarStyle from './Calendar.module.css'; 
import { Calendar } from "react-calendar";
import { addDays, isSameDay, addMonths, startOfMonth, endOfMonth } from 'date-fns';
import 'react-calendar/dist/Calendar.css';  
 
export default function PeriodCalendar() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [cycleDays, setCycleDays] = useState(30);
    const [highlightedDays, setHighlightedDays] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [pendingCycleDate, setPendingCycleDate] = useState(null);
    const calculateAllHighlightedDays = (startDate) => {
        const cycleDates = [];
        let currentCycleStartDate = startDate;
        for (let monthOffset = 0; monthOffset < 12; monthOffset++) {
            const monthStart = startOfMonth(addMonths(currentCycleStartDate, monthOffset));
            const monthEnd = endOfMonth(monthStart);
            while (currentCycleStartDate <= monthEnd) {
                const cycleRange = Array.from({ length: 5 }, (_, i) => addDays(currentCycleStartDate, i));
                cycleDates.push(...cycleRange);
                currentCycleStartDate = addDays(currentCycleStartDate, cycleDays);
            }
        }
        return cycleDates;
    };
    const onChange = useCallback((value) => {
        setSelectedDate(value);
        const allHighlightedDays = calculateAllHighlightedDays(value);
        setHighlightedDays(allHighlightedDays);
    }, []);
    const isDateHighlighted = (date) => {
        return highlightedDays.some(highlightedDate => isSameDay(date, highlightedDate));
    };
    const isNextCycleDate = (date) => {
        if (!selectedDate) return false;
        const nextCycleDate = addDays(selectedDate, cycleDays);
        return isSameDay(date, nextCycleDate);
    };
    const handleConfirmCycleStart = (confirmed) => {
        if (confirmed) {
            const allHighlightedDays = calculateAllHighlightedDays(pendingCycleDate);
            setHighlightedDays(allHighlightedDays);
        }
        setShowConfirmModal(false);
        setPendingCycleDate(null); 
    };
    useEffect(() => {
        const today = new Date();
        if (isNextCycleDate(today)) {
            setPendingCycleDate(today);
            setShowConfirmModal(true); 
        }
    }, [selectedDate, cycleDays]);
    const isCycleNormal = cycleDays >= 25 && cycleDays <= 35;
    const handleCycleDaysChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
            setCycleDays(value);
        }
    };
    const handleGetStarted = async () => {
        if (!selectedDate) {
            alert("Please select a date first.");
            return;
        }
        const data = {
            selectedDate,
            cycleDays,
            highlightedDays,
        };
        try {
            const response = await fetch('http://localhost:9000/storeCycleData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                console.log("Data stored successfully!");
            } else {
                console.log("Failed to store data.");
            }
        } catch (error) {
            console.error("Error storing data:", error);
            alert("An error occurred. Please try again.");
        }
    }; 
    return (
        <div className={CalendarStyle.maincal}>
            <h1>Period Calendar</h1>
            <label className={CalendarStyle.label}>
                Enter your cycle duration (in days) :&emsp;
                <input
                    type="number"
                    value={cycleDays}
                    onChange={handleCycleDaysChange}
                    className={CalendarStyle.input}
                    min="1"
                    max="100"
                />
            </label>
            <Calendar 
                value={selectedDate} 
                onChange={onChange}
                tileClassName={({ date, view }) => {
                    if (view === 'month' && isDateHighlighted(date)) {
                        return CalendarStyle.Calendarhighlight;  
                    }
                    if (isNextCycleDate(date)) {
                        return CalendarStyle.CalendarnextCycle;  
                    }
                    return null;
                }}
            />
            {selectedDate && (
                <p className={CalendarStyle.cycleMessage}>
                    Your next menstrual cycle starts on {addDays(selectedDate, cycleDays).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}.
                </p>
            )}
            {selectedDate && (
                <p className={CalendarStyle.cycleMessage}>
                    {isCycleNormal ? (
                        "Your menstrual cycle is within the normal range (25-35 days)."
                    ) : (
                        "Your menstrual cycle is outside the normal range. You should consider consulting a healthcare provider."
                    )}
                </p>
            )}
            {selectedDate && (
                <button className={CalendarStyle.getStartedButton} onClick={handleGetStarted}>
                    Done
                </button>
            )}
            {showConfirmModal && (
                <div className={CalendarStyle.modal}>
                    <div className={CalendarStyle.modalContent}>
                        <p>Did your cycle start on {pendingCycleDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}?</p>
                        <button className={CalendarStyle.confirmButton} onClick={() => handleConfirmCycleStart(true)}>Yes</button>
                        <button className={CalendarStyle.cancelButton} onClick={() => handleConfirmCycleStart(false)}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}
