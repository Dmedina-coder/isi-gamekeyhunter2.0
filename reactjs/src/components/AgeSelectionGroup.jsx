"use client";
import React, { useState } from "react";

function AgeSelectionGroup() {
  const [selectedAge, setSelectedAge] = useState(null);

  const ageRanges = [
    "0 - 13 años",
    "14 - 17 años",
    "18 - 25 años",
    "26 - 35 años",
    "36 - 50 años",
    "Más de 50 años",
  ];

  const handleAgeChange = (index) => {
    setSelectedAge(index);
  };

  return (
    <div className="age-section">
      <h3 className="section-title">Sobre ti:</h3>
      <h4 className="subsection-title">Tu edad</h4>

      <div className="radio-grid">
        {ageRanges.map((range, index) => (
          <div className="radio-item" key={index}>
            <input
              type="radio"
              id={`age-${index}`}
              name="age-group" /* Agrupa los botones de radio */
              className="radio-input"
              checked={selectedAge === index}
              onChange={() => handleAgeChange(index)}
            />
            <label htmlFor={`age-${index}`} className="radio-label">
              {range}
            </label>
          </div>
        ))}
      </div>

      <style jsx>{`
        .age-section {
          margin-top: 1.5rem;
        }
        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: rgba(179, 179, 179, 1);
          font-family: Inter, sans-serif;
        }
        .subsection-title {
          font-size: 20px;
          font-weight: 700;
          color: rgba(179, 179, 179, 1);
          font-family: Inter, sans-serif;
        }
        .radio-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }
        .radio-item {
          display: flex;
          align-items: center;
        }
        .radio-input {
          margin-right: 0.5rem;
        }
        .radio-label {
          font-size: 20px;
          font-weight: 700;
          color: rgba(179, 179, 179, 1);
          font-family: Inter, sans-serif;
        }
        @media (max-width: 640px) {
          .radio-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
}

export default AgeSelectionGroup;
