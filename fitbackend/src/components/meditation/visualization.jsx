import React, { useState, useEffect } from "react";
import "./visualization.css"; // CSS for the component

const  Visualization= () => {
  const meditations = [
    {
      id: 1,
      image: "/gratitude.jpg",
      name: "Gratitude meditation",
      description: "Gratitude meditation is to enhance emotional well-being by cultivating a sense of thankfulness.",
      duration: "5 minutes",
      videoUrl:  "https://www.youtube.com/embed/zyUy9w953L0"
    },
    {
      id: 2,
      image: "/anxiety.jpg",
      name: "Anxiety meditation",
      description: "Anxiety meditation is to promote calmness and relaxation.",
      duration: "8 minutes",
      videoUrl:   "https://www.youtube.com/embed/n6hsQTFNMic"
    },
    {
      id: 3,
      image: "/future.jpg",
      name: "Future Self meditation",
      description: "Future Self meditation is to enhance self-awareness and goal-setting by visualizing one's future aspirations.",
      duration: "10 minutes",
      videoUrl:  "https://www.youtube.com/embed/Ivma0O8kiXE"
    },
    {
      id: 4,
      image: "/peaceful.jpg",
      name: "Peaceful Place meditation",
      description: "Peaceful Place meditation is used to cultivate inner calm and relaxation.",
      duration: "10 minutes",
      videoUrl: "https://www.youtube.com/embed/4S3yJkGWM4E"
    },
  ];

  const [selectedMeditations, setSelectedMeditations] = useState([]); // Changed from selectedYogas to selectedMeditations
const [showGapTimeModal, setShowGapTimeModal] = useState(false);
const [gapTime, setGapTime] = useState("");
const [currentVideoIndex, setCurrentVideoIndex] = useState(-1);

// Handle checkbox changes
const handleCheckboxChange = (id) => {
    if (selectedMeditations.includes(id)) { // Changed from selectedYogas to selectedMeditations
        setSelectedMeditations(
            selectedMeditations.filter((meditationId) => meditationId !== id) // Changed from yogaId to meditationId
        );
    } else {
        setSelectedMeditations([...selectedMeditations, id]); // Changed from selectedYogas to selectedMeditations
    }
};

const handleSubmit = async () => {
    if (selectedMeditations.length > 0) { // Changed from selectedYogas to selectedMeditations
        const username = localStorage.getItem('username');
        console.log("Retrieved Username:", username);

        const interestedMeditations = meditations.filter((meditation) => selectedMeditations.includes(meditation.id)); // Changed from yogas to meditations
        console.log("Username:", username);
        console.log("Interested Meditations:", interestedMeditations); // Changed from Interested Yogas to Interested Meditations

        try {
            const response = await fetch("http://localhost:9000/saveSelectedMeditations", { // Changed endpoint to saveSelectedMeditations
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    selectedMeditations, // Changed from selectedYogas to selectedMeditations
                }),
            });

            if (response.ok) {
                console.log("Selected meditations saved successfully!"); // Changed from Selected yogas to Selected meditations
            } else {
                console.error("Failed to save selected meditations."); // Changed from yogas to meditations
            }
        } catch (error) {
            console.error("Error:", error);
        }

        setShowGapTimeModal(true);
    } else {
        alert("Please select at least one meditation."); // Changed from yoga to meditation
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

    for (let i = 0; i < selectedMeditations.length; i++) {
      const selectedMeditationId = selectedMeditations[i];
      const meditation = meditations.find((med) => med.id === selectedMeditationId);

      if (meditation) {
        setCurrentVideoIndex(i);

        await new Promise((resolve) => {
          const iframe = document.getElementById(`video-${meditation.id}`);
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
    <div className="meditation-selection-page">
      <h1>Select Meditations</h1>
      <div className="card-container">
        {meditations.map((meditation) => (
          <div key={meditation.id} className="card">
            <img src={meditation.image} alt={meditation.description} />
            <p>{meditation.name}</p>
            <p>{meditation.description}</p>
            <p>Duration: {meditation.duration}</p>
            <label>
              <input
                type="checkbox"
                checked={selectedMeditations.includes(meditation.id)}
                onChange={() => handleCheckboxChange(meditation.id)}
              />
              Interested
            </label>
            {selectedMeditations.includes(meditation.id) && (
              <iframe
                id={`video-${meditation.id}`}
                width="320"
                height="240"
                src={meditation.videoUrl + "?enablejsapi=1"} // Enable JS API to control the video
                title={meditation.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  display:
                    currentVideoIndex === selectedMeditations.indexOf(meditation.id)
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

export default Visualization;