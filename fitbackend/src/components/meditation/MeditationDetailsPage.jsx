import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MeditationDetailsPage.css"; // CSS for the component

const MeditationSelectionPage = () => {
  const meditations = [
    {
      id: 1,
      image: "/eating.jpg",
      name: "Mindful-eating meditation",
      description: "Mindfulness for reducing stress.",
      duration: "5 minutes",
      videoUrl: "https://www.youtube.com/embed/NYpw5iHGCDo",
    },
    {
      id: 2,
      image: "/listen.jpg",
      name: "Mindful-listening meditation",
      description: "Mindfulness for deep relaxation.",
      duration: "6 minutes",
      videoUrl: "https://www.youtube.com/embed/3my-s5RiCWo",
    },
    {
      id: 3,
      image: "/journal.jpg",
      name: "Mindful-journaling meditation",
      description: "Mindfulness for focus and clarity.",
      duration: "5 minutes",
      videoUrl: "https://www.youtube.com/embed/3my-s5RiCWo",
    },
    {
      id: 4,
      image: "/strecth.jpg",
      name: "Mindful-stretching meditation",
      description: "Quick stress relief meditation.",
      duration: "12 minutes",
      videoUrl: "https://www.youtube.com/embed/ihba9Lw0tv4",
    },
  ];

  const [selectedMeditations, setSelectedMeditations] = useState([]);
  const [showGapTimeModal, setShowGapTimeModal] = useState(false);
  const [gapTime, setGapTime] = useState('');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(-1);

  // Handle checkbox changes
  const handleCheckboxChange = (id) => {
    if (selectedMeditations.includes(id)) {
      setSelectedMeditations(
        selectedMeditations.filter((meditationId) => meditationId !== id)
      );
    } else {
      setSelectedMeditations([...selectedMeditations, id]);
    }
  };

  const handleSubmit = async () => {
    if (selectedMeditations.length > 0) {
        const username = localStorage.getItem('username');
        console.log("Retrieved Username:", username); 

        const interestedMeditations = meditations.filter((meditations) => selectedMeditations.includes(meditations.id));
        console.log("Username:", username);
        console.log("Interested Meditations:", interestedMeditations);

        try {
            const response = await fetch("http://localhost:9000/saveSelectedMeditations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username, 
                    selectedMeditations,
                }),
            });

            if (response.ok) {
                console.log("Selected Meditations saved successfully!");
            } else {
                console.error("Failed to save selected Meditations.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
  
        setShowGapTimeModal(true);
    } else {
        alert("Please select at least one Meditations.");
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
    // Load the YouTube Iframe API only once
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    if (firstScriptTag) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Cleanup: Remove script on component unmount to avoid loading multiple times
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

export default MeditationSelectionPage;
