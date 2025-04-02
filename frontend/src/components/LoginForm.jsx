"use client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
	const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5040/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Inicio de sesión exitoso:", data);

        // Guardar el ID del usuario en sessionStorage
        sessionStorage.setItem("userId", data.ID_Usuario);
        alert("Inicio de sesión exitoso.");
		navigate("/home", {});
        // Redirigir al usuario o realizar otra acción
      } else {
        const errorData = await response.json();
        console.error("Error al iniciar sesión:", errorData.error);
        alert(`Error al iniciar sesión: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error en la solicitud. Por favor, verifica tu conexión.");
    }
  };

  return (
    <section className="form-section">
      <div className="form-container">
        <div className="form-fields">
          <div className="input-group">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              type="email"
              placeholder="Ejemplo@email.com"
              className="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Actualizar el estado del email
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Actualizar el estado del password
            />
          </div>
          <button className="signin-button" onClick={handleLogin}>
            Sign In
          </button>
          <div className="links-container">
            <a href="/registration" className="form-link">
              
            </a>
            <a href="/registration" className="form-link">
              ¿No tienes Cuenta? Registrate
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .form-section {
          width: 90%;
          margin-left: auto;
          margin-right: auto;
          background-color: #023844;
          border-radius: 16px;
          padding: 48px;
        }

        .form-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-fields {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-label {
          font-size: 20px;
          font-weight: 700;
          color: rgba(179, 179, 179, 1);
          font-family: Inter, sans-serif;
        }

        .email-input,
        .password-input {
          width: auto; /* Asegura que todos tengan el mismo ancho */
          padding: 12px; /* Igual padding para inputs y botón */
          border-radius: 8px;
          font-size: 16px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background-color: #ffffff;
          color: rgba(179, 179, 179, 1);
        }

        .signin-button {
          width: 100%; /* Asegura que todos tengan el mismo ancho */
          padding: 12px; /* Igual padding para inputs y botón */
          border-radius: 8px;
          font-size: 16px;
          background-color: rgba(255, 255, 255, 0.12);
          color: rgba(245, 245, 245, 1);
          border: none;
          cursor: pointer;
        }

        .links-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .form-link {
          font-size: 16px;
          color: rgba(245, 245, 245, 1);
          text-decoration-line: underline;
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

export default LoginForm;
