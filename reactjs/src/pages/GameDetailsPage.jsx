"use client";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams from React Router
import Header from "../components/Header";
import GameInfo from "../components/GameInfo";
import StoreRecommendation from "../components/StoreRecommendation";
import StoreList from "../components/StoreList";
import Footer from "../components/Footer";

function GameDetailsPage() {
  const { gameid } = useParams(); // Get the 'gameid' parameter from the URL
  const userID = sessionStorage.getItem("userId") || "1";

  useEffect(() => {
    const postData = async () => {
      try {
        // Primera llamada al endpoint /api/v1/cheapshark/find
        const cheapSharkResponse = await fetch(
          `http://localhost:5040/api/v1/cheapshark/find?title=${gameid}`
        );
        const cheapSharkData = await cheapSharkResponse.json();

        // Verificar si el JSON no está vacío
        if (Object.keys(cheapSharkData).length === 0) {
          console.log("El JSON está vacío. No se realizará la llamada al puerto 5040.");
          return;
        }

        // Si el JSON no está vacío, realizar la llamada al puerto 5040
        const response = await fetch("http://localhost:5040/api/v1/addGame", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ID_Usuario: userID, // Asegúrate de que sea un número
            NombreJuego: gameid,
          }),
        });

        if (!response.ok) {
          throw new Error("Error en la solicitud POST");
        }

        const data = await response.json();
        console.log("Respuesta de la API:", data);
      } catch (error) {
        console.error("Error al realizar la solicitud POST:", error);
      }
    };

    postData();
  }, []); // Ejecutar cuando 'gameid' o 'userID' cambien

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
        rel="stylesheet"
      />
      <div className="page-container">
        <Header />
        <main className="main-content">
          <GameInfo
            title={gameid}
          />
          <section className="stores-section">
            {<StoreRecommendation
              storeName="Nombre Tienda"
              platform="Plataforma"
              price="99.99€"
              storeLogoUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/9c3695b93a052d93070c48846c2bc5631dce5e61"
              platformLogoUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/9c3695b93a052d93070c48846c2bc5631dce5e61"
            />}
            <StoreList 
              title={gameid}
            />
          </section>
        </main>
        <Footer />
      </div>
      <style jsx>{`
        .page-container {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          align-items: stretch;
          background-color: #022839;
        }
        .main-content {
          padding: 20px 52px;
        }
        .stores-section {
          margin-top: 33px;
        }
        @media (max-width: 991px) {
          .page-container {
            max-width: 991px;
          }
        }
        @media (max-width: 640px) {
          .page-container {
            max-width: 640px;
          }
          .main-content {
            padding: 20px 20px;
          }
        }
      `}</style>
    </>
  );
}

export default GameDetailsPage;
