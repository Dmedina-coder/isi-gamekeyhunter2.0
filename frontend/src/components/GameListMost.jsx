import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";

function GameListMost({ title, className }) {

  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const [gameID, setGameID] = useState(null);
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
		const bbddRes = await fetch("http://127.0.0.1:5040/api/v1/mostPopularGames")
		const consulta = await bbddRes.json();
        const response = await fetch("http://127.0.0.1:5020/api/v1/cheapshark/populargames", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json", // Especificar que el cuerpo es JSON
			},
			body: JSON.stringify({response: consulta}), // Convertir el JSON a una cadena para enviarlo
		  });
        if (!response.ok) {
          throw new Error("Error al obtener los datos del servidor");
        }
        const data = await response.json();
        setGames(data); // Asignar los datos obtenidos al estado
      } catch (err) {
        setError(err.message);
      }
    };

    fetchGames();
  }, []);

  if (games.length === 0) {
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
    <section className={`game-list ${className}`}>
      <h2 className="section-title">{title}</h2>
      <div className="game-cards">
        {(() => {
          const gameCards = [];
          {games.map((game, index) => (
            gameCards.push(
              <GameCard
                  title={game.name || "NA"} // Ajusta según la estructura del JSON
                  price={game.price+"€" || "00.00€"} // Ajusta según la estructura del JSON
                  image={game.img || ""} // Ajusta según la estructura del JSON
                />
            )
          ))}
          return gameCards;
        })()}
      </div>

      <style jsx>{`
        .game-list {
          background-color: rgba(6, 31, 46, 1);
          display: flex;
          margin-top: 20px;
          width: 100%;
          padding-bottom: 23px;
          padding-top: 23px;
          flex-direction: column;
          overflow: hidden;
          align-items: stretch;
        }

        .section-title {
          color: rgba(197, 197, 197, 1);
          font-size: 36px;
          font-family:
            Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
          font-weight: 900;
          text-align: center;
          align-self: center;
          margin: 0 0 20px 0;
        }

        .latest-searched {
          margin-top: 16px;
        }

        @media (max-width: 991px) {
          .game-list {
            max-width: 100%;
          }

          .section-title {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

export default GameListMost;
