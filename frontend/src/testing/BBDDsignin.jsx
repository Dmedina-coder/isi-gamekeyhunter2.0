import React, { useEffect, useState } from "react";

function BBDDsignin() {
  const [status, setStatus] = useState(null); // Estado para almacenar el resultado de la prueba

  useEffect(() => {
    const testAPI = async () => {
		const requestBody = {
			Nombre: "test",
			Apellidos: "test",
			Email: "usuariotest",
			Password: "1234",
			Direccion: "",
			Provincia: "",
			Ciudad: "",
			CP: "",
			RangoEdad: "1"
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

    testAPI();
  }, []);

  return (
    <div>
      <p>
        prueba: "BBDDsignin.jsx"{" "}
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

export default BBDDsignin;