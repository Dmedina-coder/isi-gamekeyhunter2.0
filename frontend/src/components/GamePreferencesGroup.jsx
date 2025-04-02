"use client";
import React, { useState } from "react";

function GamePreferencesGroup({ onGameSelect }) {
  const [selectedGames, setSelectedGames] = useState([]);

  const gameTypes = [
    "Acción",
    "RPG",
    "Deportes",
    "Conducción",
    "Fantasía",
    "Narrativos",
    "Aventuras",
    "MMO",
    "Miedo",
  ];

  const handleGameChange = (index) => {
    setSelectedGames((prev) => {
      let updatedGames;
      if (prev.includes(index)) {
        updatedGames = prev.filter((i) => i !== index);
      } else {
        updatedGames = [...prev, index];
      }
      onGameSelect(updatedGames); // Llama a la función del padre con los índices seleccionados
      return updatedGames;
    });
  };

  return (
    <div className="game-preferences-section">
      <h3 className="section-title">
        ¿Que juegos te interesa? Selecciona al menos 3
      </h3>

      <div className="checkbox-grid">
        {gameTypes.map((game, index) => (
          <div className="checkbox-item" key={index}>
            <input
              type="checkbox"
              id={`game-${index}`}
              className="checkbox-input"
              checked={selectedGames.includes(index)}
              onChange={() => handleGameChange(index)}
            />
            <label htmlFor={`game-${index}`} className="checkbox-label">
              {game}
            </label>
          </div>
        ))}
      </div>

      <style jsx>{`
        .game-preferences-section {
          margin-top: 1.5rem;
        }
        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: rgba(179, 179, 179, 1);
          font-family: Inter, sans-serif;
        }
        .checkbox-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }
        .checkbox-item {
          display: flex;
          align-items: center;
        }
        .checkbox-input {
          margin-right: 0.5rem;
        }
        .checkbox-label {
          font-size: 20px;
          font-weight: 700;
          color: rgba(179, 179, 179, 1);
          font-family: Inter, sans-serif;
        }

        @media (max-width: 640px) {
          .checkbox-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
}

export default GamePreferencesGroup;
