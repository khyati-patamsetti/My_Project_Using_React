import React, { useState } from "react";
import "./cards.css";

const Med = () => {
  // State for the selected card
  const [selectedCard, setSelectedCard] = useState(null);

  // Meditation data
  const meditations = [
    {
      id: 1,
      name: "Mindfulness Meditation",
      description: "Focus on being present and observing thoughts without judgment.",
      image: "/bac.jpeg",
    },
    {
      id: 2,
      name: "Guided Meditation",
      description: "Follow a guide's voice to achieve relaxation and mental clarity.",
      image: "/guided.jpg",
    },
    {
      id: 3,
      name: "Breathing Meditation",
      description: "Deep breathing exercises to calm your mind and body.",
      image: "/breathing.jpg",
    },
    {
      id: 4,
      name: "Loving-Kindness Meditation",
      description: "Send positive energy and love to yourself and others.",
      image: "/metta.jpg",
    },
    {
      id: 5,
      name: "Body Scan Meditation",
      description: "Increase awareness of physical sensations and release tension.",
      image: "/body_scan.jpg",
    },
    {
      id: 6,
      name: "Mantra Meditation",
      description: "Repeat a soothing word or phrase to help focus and clear the mind.",
      image: "/mantra.jpg",
    },
  ];

  // Function to select a card
  const selectCard = (id) => {
    setSelectedCard(id);
  };

  return (
    <div className="app">
      <div className="card-container">
        {meditations.map((meditation) => (
          <div
            key={meditation.id}
            className={`card ${selectedCard === meditation.id ? "selected" : ""}`}
            onClick={() => selectCard(meditation.id)}
            style={{ opacity: selectedCard && selectedCard !== meditation.id ? 0.3 : 1 }}
          >
            <img src={meditation.image} alt={meditation.name} />
            <h3>{meditation.name}</h3>
          </div>
        ))}
      </div>

      {selectedCard && (
        <div className="selected-card-container">
          {meditations
            .filter((meditation) => meditation.id === selectedCard)
            .map((meditation) => (
              <div key={meditation.id} className="selected-card">
                <img src={meditation.image} alt={meditation.name} />
                <h2>{meditation.name}</h2>
                <p>{meditation.description}</p>
                <button onClick={() => alert(`Starting ${meditation.name}`)}>
                  Start Meditation
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Med;
