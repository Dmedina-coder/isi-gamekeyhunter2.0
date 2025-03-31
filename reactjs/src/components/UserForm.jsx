"use client";
import React, { useState, useEffect, useContext } from "react";
import AgeSelectionGroup from "./AgeSelectionGroup";
import GamePreferencesGroup from "./GamePreferencesGroup";
import { useLocation , useNavigate } from "react-router-dom";

function UserForm() {

	const navigate = useNavigate(); // Initialize the navigate function
	const location = useLocation();
	const { email, password } = location.state || {}; // Obtener datos del estado de navegación
	const [selectedAge, setSelectedAge] = useState(null);
	const [selectedGames, setSelectedGames] = useState([]);

	const handleAgeSelection = (index) => {
		setSelectedAge(index); // Actualiza el estado del padre con el índice seleccionado
	};
	const handleGameSelection = (selected) => {
		console.log("Juegos seleccionados:", selected); // Verifica los índices seleccionados
		setSelectedGames(selected); // Actualiza el estado del padre
	  };

	const [formData, setFormData] = useState({
		mail: email,
		pass: password,
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

  const handleSubmit = async (e) => {
	e.preventDefault();
	// Validar que todos los campos estén completos
	if (
	  !formData.name ||
	  !formData.surname ||
	  !formData.address ||
	  !formData.province ||
	  !formData.city ||
	  !formData.postalCode ||
	  !selectedAge ||
	  selectedGames.length < 3
	) {
	  alert("Por favor, completa todos los campos y selecciona al menos 3 géneros.");
	  return;
	}
	// Crear el cuerpo de la solicitud
	const requestBody = {
	  Nombre: formData.name,
	  Apellidos: formData.surname,
	  Email: formData.mail,
	  Password: formData.pass,
	  Direccion: formData.address,
	  Provincia: formData.province,
	  Ciudad: formData.city,
	  CP: formData.postalCode,
	  RangoEdad: selectedAge
	};
  
	try {
	  // Llamada a la API
	  const response = await fetch("http://localhost:5040/api/v1/registerUser", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify(requestBody),
	  });
  
	  if (response.ok) {
		const data = await response.json();
		console.log("Usuario registrado con éxito:", data);
		alert("Usuario registrado con éxito.");
		const userId = data.ID_Usuario; // Suponiendo que la API devuelve el ID del usuario registrado

		// Guardar el ID del usuario en sessionStorage
        sessionStorage.setItem("userId", data.ID_Usuario);

		// Registrar cada género seleccionado
		for (const genreId of selectedGames) {
		  const genreResponse = await fetch("http://localhost:5040/api/v1/addGenre", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({
			  ID_Usuario: userId,
			  ID_Genero: genreId+1,
			}),
		  });
	
		  if (!genreResponse.ok) {
			const genreError = await genreResponse.json();
			console.error(`Error al registrar género ${genreId}: ${genreError.error}`);
		  } else {
			console.log(`Género ${genreId} registrado con éxito.`);
		  }
		}
		navigate("/login", {});
	  } else {
		const statusCode = response.status; // Extraer el código de estado
    	if (statusCode === 409) { // Código 409 para conflicto
			console.error("Error al registrar usuario:", response.statusText);
			alert("Error al registrar usuario. El email introducido ya esta registrado");
			navigate("/registration", {});
		}else{
			console.error("Error al registrar usuario:", response.statusText);
			alert("Error al registrar usuario. Por favor, inténtalo de nuevo.");
		}
	  }
	} catch (error) {
	  console.error("Error en la solicitud:", error);
	  alert("Error en la solicitud. Por favor, verifica tu conexión.");
	}
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

        <AgeSelectionGroup onAgeSelect={handleAgeSelection}/>
        <GamePreferencesGroup onGameSelect={handleGameSelection}/>

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
