import React, { useState, useEffect } from "react";
import "./movement.css"; // CSS for the component

const Movement = () => {
  const meditations = [
    {
      id: 1,
      image: "/taichi.jpg",
      name: "Tai-Chi Movement meditation",
      description: "Om Mantra meditation is to create a deep sense of inner peace.",
      duration: "9 minutes",
      videoUrl: "https://www.youtube.com/embed/MQwrXBIXunU"
    },
    {
      id: 2,
      image: "/qigong.jpg",
      name: "Qigong Movement meditation",
      description: "Namah Shivaya Mantra meditation is for inner transformation Shiva's energies to attain peace, balance.",
      duration: "7 minutes",
      videoUrl:  "https://www.youtube.com/embed/ohz8l-miUXM"
    },
    {
      id: 3,
      image: "/aikido.jpg",
      name: "Aikido Movement meditation",
      description: "Aikido Movement meditation is to develop harmony between mind, body through circular movements.",
      duration: "2 minutes",
      videoUrl:  "https://www.youtube.com/embed/-Y3BpWtnJ0Q"
    },
    {
      id: 4,
      image: "/walking.jpg",
      name: "Walking Movement meditation",
      description: "Walking Movement meditation is to cultivate mindfulness connecting body and mind.",
      duration: "4 minutes",
      videoUrl: "https://www.youtube.com/embed/zZnNO1myCMg"
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

export default Movement;