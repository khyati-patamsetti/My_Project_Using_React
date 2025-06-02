import React, { useState, useEffect } from "react";
import "./Ashtanga.css"; 

const  Ashtanga= () => {
  const yogas = [
    {
      id: 1,
      image: "/Parsvottanasana.jpg",
      name: "Parsvottanasana",
      description: "Improving balance and focus, fostering a sense of grounding and stability.",
      duration: "1 minutes",
      videoUrl: "https://www.youtube.com/embed/44zHW_BlBnQ"
    },
    {
      id: 2,
      image: "/Karnapidasana.jpg",
      name: "Karnapidasana",
      description: "Relieve tension in the neck and shoulders, promote relaxation.",
      duration: "2 minutes",
      videoUrl:    "https://www.youtube.com/embed/hdO-aQuNnHc"
    },
    {
      id: 3,
      image: "/Prasarita padottanasana.jpg",
      name: "Prasarita padottanasana",
      description: "Relieving tension in the back while also calming the mind and improving focus.",
      duration: "1 minutes",
      videoUrl:  "https://www.youtube.com/embed/cVAJtBIJChI"
    },
    {
      id: 4,
      image: "/Surya Namaskar.jpg",
      name: "Surya Namaskar",
      description: "Promoting mindfulness and connection to breath through a dynamic series of postures.",
      duration: "1 minutes",
      videoUrl:  "https://www.youtube.com/embed/l1C0rD_DlUE"
    },
  ];

  const [selectedYogas, setSelectedYogas] = useState([]);
  const [showGapTimeModal, setShowGapTimeModal] = useState(false);
  const [gapTime, setGapTime] = useState('');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(-1);

  // Handle checkbox changes
  const handleCheckboxChange = (id) => {
    if (selectedYogas.includes(id)) {
      setSelectedYogas(
        selectedYogas.filter((yogaId) => yogaId !== id)
      );
    } else {
      setSelectedYogas([...selectedYogas, id]);
    }
  };
  const handleSubmit = async () => {
    if (selectedYogas.length > 0) {
        const username = localStorage.getItem('username');
        console.log("Retrieved Username:", username); 

        const interestedYogas = yogas.filter((yoga) => selectedYogas.includes(yoga.id));
        console.log("Username:", username);
        console.log("Interested Yogas:", interestedYogas);

        try {
            const response = await fetch("http://localhost:9000/saveSelectedYogas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username, 
                    selectedYogas,
                }),
            });

            if (response.ok) {
                console.log("Selected yogas saved successfully!");
            } else {
                console.error("Failed to save selected yogas.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
  
        setShowGapTimeModal(true);
    } else {
        alert("Please select at least one yoga.");
    }
};

  const handleGapTimeSubmit = () => {
    setShowGapTimeModal(false); 
    setCurrentVideoIndex(0); 
    playVideos(); 
  };
  const playVideos = async () => {
    const gapTimeInMillis = parseInt(gapTime) * 60000;

    for (let i = 0; i < selectedYogas.length; i++) {
        const selectedYogaId = selectedYogas[i];
        const yoga = yogas.find((yo) => yo.id === selectedYogaId);

        if (yoga) {
            setCurrentVideoIndex(i);
    
            await new Promise((resolve) => {
              const iframe = document.getElementById(`video-${yoga.id}`);
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
    <div className="yoga-selection-page">
      <h1>Select Yogas</h1>
      <div className="card-container">
        {yogas.map((yoga) => (
          <div key={yoga.id} className="card">
            <img src={yoga.image} alt={yoga.description} />
            <p>{yoga.name}</p>
            <p>{yoga.description}</p>
            <p>Duration: {yoga.duration}</p>
            <label>
              <input
                type="checkbox"
                checked={selectedYogas.includes(yoga.id)}
                onChange={() => handleCheckboxChange(yoga.id)}
              />
              Interested
            </label>
            {selectedYogas.includes(yoga.id) && (
              <iframe
                id={`video-${yoga.id}`}
                width="320"
                height="240"
                src={yoga.videoUrl + "?enablejsapi=1"} 
                title={yoga.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  display:
                    currentVideoIndex === selectedYogas.indexOf(yoga.id)
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

export default Ashtanga;