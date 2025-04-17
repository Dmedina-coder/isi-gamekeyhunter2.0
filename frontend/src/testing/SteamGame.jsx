import React, { useEffect, useState } from "react";

function SteamGame() {
  const [status, setStatus] = useState(null); // Estado para almacenar el resultado de la prueba

  useEffect(() => {
    const testAPI = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5030/api/v1/steam/findid?id=730");
        if (response.ok) {
          setStatus("success"); // Si la respuesta es correcta
        } else {
          setStatus("error"); // Si la respuesta no es correcta
        }
      } catch (err) {
        setStatus("error"); // Si ocurre un error en la llamada
      }
    };

    testAPI();
  }, []);

  return (
    <div>
      <p>
        prueba: "SteamGame.jsx"{" "}
        {status === "success" ? (
          <span style={{ color: "green" }}>✅</span>
        ) : status === "error" ? (
          <span style={{ color: "red" }}>❌</span>
        ) : (
          "Cargando..."
        )}
      </p>
    </div>
  );
}

export default SteamGame;