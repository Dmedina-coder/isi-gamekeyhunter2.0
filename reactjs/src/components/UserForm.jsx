"use client";
import React, { useState } from "react";
import AgeSelectionGroup from "./AgeSelectionGroup";
import GamePreferencesGroup from "./GamePreferencesGroup";

function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    address: "",
    province: "",
    city: "",
    postalCode: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <section className="form-section">
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="surname" className="form-label">Apellidos</label>
          <input
            type="text"
            id="surname"
            name="surname"
            className="form-input"
            value={formData.surname}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address" className="form-label">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-input"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="province" className="form-label">Provincia</label>
          <input
            type="text"
            id="province"
            name="province"
            className="form-input"
            value={formData.province}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="city" className="form-label">Ciudad</label>
          <input
            type="text"
            id="city"
            name="city"
            className="form-input"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="postalCode" className="form-label">Codigo Postal</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            className="form-input"
            value={formData.postalCode}
            onChange={handleChange}
          />
        </div>

        <AgeSelectionGroup />
        <GamePreferencesGroup />

        <button type="submit" className="submit-button">Finalizar</button>
      </form>

      <style jsx>{`
        .form-section {
          width: 90%;
          margin-left: auto;
          margin-right: auto;
          background-color: #023844;
          border-radius: 16px;
          padding: 48px;
        }
        .user-form {
          display: grid;
          gap: 1.5rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-label {
          font-size: 20px;
          font-weight: 700;
          color: rgba(179, 179, 179, 1);
          font-family: Inter, sans-serif;
        }
        .form-input {
          width: auto; /* Asegura que todos tengan el mismo ancho */
          padding: 12px; /* Igual padding para inputs y botón */
          border-radius: 8px;
          font-size: 16px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background-color: #ffffff;
          color: rgba(179, 179, 179, 1);
        }
        .submit-button {
          width: 100%; /* Asegura que todos tengan el mismo ancho */
          padding: 12px; /* Igual padding para inputs y botón */
          border-radius: 8px;
          font-size: 16px;
          background-color: rgba(255, 255, 255, 0.12);
          color: rgba(245, 245, 245, 1);
          border: none;
          cursor: pointer;
        }
        @media (max-width: 980px) {
          .form-section {
            padding: 30px;
          }
          .main-content {
            width: 90%;
          }
        }
        @media (max-width: 640px) {
          .form-section {
            padding: 20px;
          }
          .main-content {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

export default UserForm;
