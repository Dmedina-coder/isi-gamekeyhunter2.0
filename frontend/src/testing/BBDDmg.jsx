import React, { useEffect, useState } from "react";

function BBDDmg() {
  const [status, setStatus] = useState(null); // Estado para almacenar el resultado de la prueba

  useEffect(() => {
    const testAPI = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5040/api/v1/mostPopularGames");
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
        prueba: "BBDDmg.jsx"{" "}
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

export default BBDDmg;