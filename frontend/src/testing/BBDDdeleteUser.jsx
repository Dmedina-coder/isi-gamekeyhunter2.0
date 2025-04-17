import React, { useEffect, useState } from "react";

function BBDDdeleteUser() {
  const [status, setStatus] = useState(null); // Estado para almacenar el resultado de la prueba

  useEffect(() => {
	const timer = setTimeout(() => {
		deleteUser();
	  }, 4000); // Espera 2 segundos (2000 ms)
    const deleteUser = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5040/api/v1/deleteUser", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ID_Usuario: sessionStorage.getItem("IDtest") // Cambia este valor al ID del usuario que deseas eliminar
          }),
        });

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
        prueba: "BBDDdeleteUser.jsx"{" "}
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

export default BBDDdeleteUser;