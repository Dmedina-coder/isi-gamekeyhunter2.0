"use client";
import React from "react";

function LoginForm() {
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
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="password-input"
            />
          </div>
          <button className="signin-button">Sign In</button>
          <div className="links-container">
            <a href="/registration" className="form-link" >
              Forgot password?
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
