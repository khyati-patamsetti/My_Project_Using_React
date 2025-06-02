import React, { useState, useEffect } from "react";
import "./anaerobic.css"; // CSS for the component

const  Anaerobic= () => {
  const exercises = [
    {
      id: 1,
      image: "/skipping.jpg",
      name: "Skipping Exercise",
      description: "Skipping boosts cardiovascular health, coordination, and stamina.",
      duration: "5 minutes",
      videoUrl: "https://www.youtube.com/embed/TIEjZggRC_w"
    },
    {
      id: 2,
      image: "/cross.jpg",
      name: "Cross-training Exercise",
      description: "Cross-training enhances overall fitness by combining different types of workouts.",
      duration: "3 minutes",
      videoUrl:    "https://www.youtube.com/embed/1tEB51DDN34"
    },
    {
      id: 3,
      image: "/weight.jpg",
      name: "Weight lifting Exercise",
      description: "Weight lifting builds muscle strength and improves bone density.",
      duration: "8 minutes",
      videoUrl:  "https://www.youtube.com/embed/eQHfR49_6kc"
    },
    {
      id: 4,
      image: "/circuit.jpg",
      name: "Circuit-training Exercise",
      description: "Circuit training combines cardio and strength for overall fitness and endurance.",
      duration: "7 minutes",
      videoUrl:  "https://www.youtube.com/embed/xqBTEdJfHE4"
    },
  ];

  const [selectedExercises, setSelectedExercises] = useState([]);
  const [showGapTimeModal, setShowGapTimeModal] = useState(false);
  const [gapTime, setGapTime] = useState('');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(-1);

  // Handle checkbox changes
  const handleCheckboxChange = (id) => {
    if (selectedExercises.includes(id)) {
      setSelectedExercises(
        selectedExercises.filter((exerciseId) => exerciseId !== id)
      );
    } else {
      setSelectedExercises([...selectedExercises, id]);
    }
  };

  const handleSubmit = async () => {
    if (selectedExercises.length > 0) {
        const username = localStorage.getItem('username');
        console.log("Retrieved Username:", username); 

        const interestedExercises = exercises.filter((exercises) => selectedExercises.includes(exercises.id));
        console.log("Username:", username);
        console.log("Interested Exercises:", interestedExercises);

        try {
            const response = await fetch("http://localhost:9000/saveSelectedExercises", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username, 
                    selectedExercises,
                }),
            });

            if (response.ok) {
                console.log("Selected exercises saved successfully!");
            } else {
                console.error("Failed to save selected exercises.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
  
        setShowGapTimeModal(true);
    } else {
        alert("Please select at least one exercises.");
    }
};

  const handleGapTimeSubmit = () => {
    setShowGapTimeModal(false); // Hide the modal
    setCurrentVideoIndex(0); // Start the playback with the first video
    playVideos(); // Start playing videos
  };

  // Play videos one by one after each other
  const playVideos = async () => {
    const gapTimeInMillis = parseInt(gapTime) * 60000;

    for (let i = 0; i < selectedExercises.length; i++) {
        const selectedExerciseId = selectedExercises[i];
        const exercise = exercises.find((ex) => ex.id === selectedExerciseId);

        if (exercise) {
            setCurrentVideoIndex(i);
    
            await new Promise((resolve) => {
              const iframe = document.getElementById(`video-${exercise.id}`);
              const player = new window.YT.Player(iframe, {
                events: {
                  onReady: (event) => {
                    event.target.playVideo();
                  },
                  onStateChange: (event) => {
                    if (event.data === window.YT.PlayerState.ENDED) {
                      setTimeout(() => resolve(), gapTimeInMillis);
                    }
                  },
                },
              });
            });
          }
        }
      };

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    if (firstScriptTag) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    return () => {
      if (firstScriptTag && tag) {
        firstScriptTag.parentNode.removeChild(tag);
      }
    };
  }, []);

  return (
    <div className="exercise-selection-page">
      <h1>Select Exercises</h1>
      <div className="card-container">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="card">
            <img src={exercise.image} alt={exercise.description} />
            <p>{exercise.name}</p>
            <p>{exercise.description}</p>
            <p>Duration: {exercise.duration}</p>
            <label>
              <input
                type="checkbox"
                checked={selectedExercises.includes(exercise.id)}
                onChange={() => handleCheckboxChange(exercise.id)}
              />
              Interested
            </label>
            {selectedExercises.includes(exercise.id) && (
              <iframe
                id={`video-${exercise.id}`}
                width="320"
                height="240"
                src={exercise.videoUrl + "?enablejsapi=1"} // Enable JS API to control the video
                title={exercise.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  display:
                    currentVideoIndex === selectedExercises.indexOf(exercise.id)
                      ? "block"
                      : "none",
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="buttons-container">
        <button onClick={() => window.history.back()}>Back</button>
        <button onClick={handleSubmit}>Get Started</button>
      </div>
      {showGapTimeModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select Gap Time</h2>
            <label>
              How much time do you need between each video (in minutes)?
              <input
                type="number"
                value={gapTime}
                onChange={(e) => setGapTime(e.target.value)}
                min="0"
                placeholder="Enter gap in minutes"
              />
            </label>
            <button onClick={handleGapTimeSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Anaerobic;