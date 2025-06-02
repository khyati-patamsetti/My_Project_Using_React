import React, { useState, useEffect } from "react";
import "./exc.css"; // CSS for the component

const Agility = () => {
  const exercises = [
    {
      id: 1,
      image: "/Shuttle run.jpeg",
      name: "Shuttle run Exercise",
      description: "Improves cardiovascular endurance through short bursts of sprinting and rapid directional changes.",
      duration:  "1 minutes",
      videoUrl: "https://www.youtube.com/embed/3-iZMS6twcE"
    },
    {
      id: 2,
      image: "/Hill sprints.jpeg",
      name: "Hill sprints Exercise",
      description: "Builds explosive strength and improves speed and power through high-intensity uphill sprints.",
      duration: "6 minutes",
      videoUrl:    "https://youtube.com/embed/T2BjmDitJVU"
    },
    {
      id: 3,
      image: "/Cone.jpeg",
      name: "Cone drills Exercise",
      description: "Builds upper body strength, targeting the chest, shoulders, and triceps while engaging the core.",
      duration: "7 minutes",
      videoUrl:  "https://www.youtube.com/embed/MCvNd4hBK4A"
    },
    {
      id: 4,
      image: "/Agility ladder drill.jpg",
      name: "Agility ladder drills Exercise",
      description: "Enhances agility by performing various quick footwork patterns through a ladder laid on the ground.",
      duration: "7 minutes",
      videoUrl:  "https://www.youtube.com/embed/67XP-AekUoA"
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

  // Show the gap time modal after clicking "Get Started"
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

export default Agility;