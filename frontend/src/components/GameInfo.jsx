import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams from React Router
import steam from "../steam.json"

function GameInfo( {title} ) {
  	const [gameData, setGameData] = useState(null);
  	const [error, setError] = useState(null);
	  const [gameNotFound, setGameNotFound] = useState(false); // Nuevo estado para manejar el caso de juego no encontrado
	const formattedTitle = title.replace(/ /g, "-");
	const { gameid } = useParams(); // Get the 'gameid' parameter from the URL
	const userID = sessionStorage.getItem("userId") || "1";
  
	useEffect(() => {
	  const postData = async () => {
		try {
        const responseID = await fetch(`http://127.0.0.1:5020/api/v1/cheapshark/steamidJson?title=${formattedTitle}`);
        const id = await responseID.json();

		// Verificar si responseID es una lista vacía
		if (id.length == 0) {
			setGameNotFound(true); // Establecer el estado de juego no encontrado
			return;
		}

		const response = await fetch(`http://127.0.0.1:5030/api/v1/steam/findid?id=${id.steamAppID}`);
		if (!response.ok) {
			throw new Error("Error al obtener los datos del servidor");
		  }
        const data = await response.json();
			  
		if (!response.ok) {
			throw new Error("Error en la solicitud POST");
		}

		setGameData({
			name: data[id.steamAppID].data.name, // Nombre del juego
			platform: data[id.steamAppID].data.platforms.windows ? "PC" : "Other", // Verifica si está disponible en Windows
			releaseDate: data[id.steamAppID].data.release_date.date, // Fecha de lanzamiento
			description: data[id.steamAppID].data.short_description, // Descripción corta
			coverImage: data[id.steamAppID].data.header_image, // Imagen de portada
		  }); 

		const responseBBDD = await fetch("http://localhost:5040/api/v1/addGame", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				ID_Usuario: userID, 
				NombreJuego: gameid,
				SteamID: id.steamAppID,
				}),
			});

      } catch (err) {
        setError(err.message);
      } 
    };
	postData();
  }, [title]);

  if (gameNotFound) {
    return (
      <div className="game-not-found">
        <h1>El juego no ha sido encontrado.</h1>
        <style jsx>{`
          .game-not-found {
            display: flex; 
            justify-content: center;
            align-items: center;
            height: 50vh;
            font-size: 20px;
            color: #e0e0e0;
            font-family: "Inter", sans-serif;
          }
        `}</style>
      </div>
    );
  }

  if (!gameData) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <style jsx>{`
          .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50vh;
          }
          .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(255, 255, 255, 0.3);
            border-top: 5px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  
  return (
    <section className="game-info">
      <img
        src={gameData.coverImage}
        alt="Game cover"
        className="game-cover"
      />
      <div className="game-details">
        <h1 className="game-title">{gameData.name}</h1>
        <h2 className="game-platform">{gameData.platform}</h2>
        <p className="game-release-date">{gameData.releaseDate}</p>
        <p className="game-description">{gameData.description}</p>
      </div>
      <style jsx>{`
        .game-info {
          display: flex;
          align-items: center; /* Centra los elementos horizontalmente */
          gap: 20px; /* Espaciado entre los elementos */
          border-radius: 12px;
          padding: 23px 26px;
          background-color: #023844;
        }
        .game-cover {
          width: 460px;
          height: 215px;
          object-fit: fill;
        }
        .game-details {
          display: flex;
          flex-direction: column;
          gap: 10px; /* Espaciado entre los campos de texto */
          text-align: center; /* Centra el texto */
        }
        .game-title {
          color: #e6e6e6;
          font-family: "Inter", sans-serif;
          font-size: 40px;
          font-weight: 700;
          margin: 0;
        }
        .game-platform {
          color: #e0e0e0;
          font-family: "Inter", sans-serif;
          font-size: 24px;
          font-weight: normal;
          margin: 0;
        }
        .game-release-date {
          color: #e0e0e0;
          font-family: "Inter", sans-serif;
          font-size: 24px;
          margin: 0;
        }
        .game-description {
          color: #828282;
          font-family: "Inter", sans-serif;
          font-size: 20px;
          line-height: 150%;
          margin: 0;
        }
        @media (max-width: 1020px) {
          .game-info {
            padding: 15px;
            flex-direction: column; /* Cambia la dirección a columna para apilar los elementos */
          }
          .game-title {
            font-size: 30px;
          }
          .game-platform, .game-release-date {
            font-size: 20px;
          }
          .game-description {
            font-size: 16px;
          }
        }
        @media (max-width: 450px) {
          .game-info {
            padding: 0px 0px 20px 0px;

          }
          .game-cover {
            border-radius: 12px 12px 0px 0px;
            overflow: hidden;
            width: 100%;
            height: 200px;
            object-fit: cover;
          }
          .game-description {
            margin: 0 20px;
          }
        }
      `}</style>
    </section>
  );
}

export default GameInfo;
