import React, { useEffect, useState } from "react";

function BBDDlogin() {
  const [status, setStatus] = useState(null); // Estado para almacenar el resultado de la prueba

  useEffect(() => {
	const timer = setTimeout(() => {
		testAPI();
	  }, 2000); // Espera 2 segundos (2000 ms)
    const testAPI = async () => {
		try {
			const response = await fetch("http://localhost:5040/api/v1/login", {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify({
				Email: "usuariotest",
				Password: "1234",
			  }),
			});
			const data = await response.json();
			sessionStorage.setItem("IDtest", data.ID_Usuario);
        if (response.ok) {
          setStatus("success"); // Si la respuesta es correcta
        } else {
          setStatus("error"); // Si la respuesta no es correcta
        }
      } catch (err) {
        setStatus("error"); // Si ocurre un error en la llamada
      }
    };

    
  }, []);

  return (
    <div>
      <p>
        prueba: "BBDDlogin.jsx"{" "}
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

export default BBDDlogin;