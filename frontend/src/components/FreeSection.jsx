import React, { useEffect, useState } from "react";

function FreeSection() {

  const [deals, setDeals] = useState([]);
  const [free, setFree] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFree = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5010/api/v1/epicgames");
        if (!response.ok) {
          throw new Error("Error al obtener los datos del servidor");
        }
        const data = await response.json();
        setDeals(data.data.Catalog.searchStore.elements || []); // Asignar las ofertas obtenidas al estado
      } catch (err) {
        setError(err.message);
      } 
    };
    fetchFree();
  }, []);

  useEffect(() => {
    for (let deal of deals) {
      const effectiveDate = new Date(deal.effectiveDate); // Convertir a objeto Date
      const expiryDate = new Date(deal.expiryDate); // Convertir a objeto Date
      const now = new Date(); // Fecha actual

      // Comparar fechas
      if (now >= effectiveDate && now <= expiryDate) {
        console.log("La oferta está activa.");
        setFree({
          name: deal.title, // Nombre del juego
          description: deal.description, // Descripción corta
          img: deal.keyImages[0].url
        });
        break; // Detener el bucle después de asignar el valor
      }
    }
  }, [deals]); // Ejecutar solo cuando deals cambie

  if (!free.name) {
    return <p></p>
  }
  return (
    <section className="news-section">
      <h2 className="section-title">JUEGO GRATUITO DE LA SEMANA</h2>
      <article className="news-article">
        <img
          src={free.img}
          alt="Free game of the week"
          className="news-image"
        />
        <div className="free-section">
          <h2 className="section-title">{free.name}</h2>
          <p className="news-content">
            {free.description}
          </p>
        </div>
        
      </article>

      <style jsx>{`
        .news-section {
          background-color: rgba(6, 31, 46, 1);
          display: flex;
          margin-top: 27px;
          padding: 0 15px 23px;
          flex-direction: column;
          overflow: hidden;
          align-items: stretch;
          font-family:
            Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
        }

        .section-title {
          color: rgba(197, 197, 197, 1);
          font-size: 36px;
          font-weight: 900;
          text-align: center;
          align-self: center;
          margin: 0;
        }

        .news-article {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .free-section {
          display: flex;
          flex-direction: column; /* Asegura que los elementos estén en columna */
          align-items: center; /* Centra los elementos horizontalmente */
          text-align: center; /* Centra el texto */
          gap: 10px; /* Espaciado entre los elementos */
        }

        .news-image {
          max-width: 100%;
          min-width: 30%;
          height: auto;
          aspect-ratio: 10 / 16; /* Maintain a 16:9 aspect ratio */
          object-position: center; /* Center the image */
          max-height: 300px; /* Limit the height of the image */
        }

        .news-content {
          width: 100%;
          text-align: justify;
          color: white; /* Change text color to white */
          font-size: 22px; /* Increase font size */
        }

        @media (min-width: 768px) {
          .news-article {
            flex-direction: row;
          }

          .news-image {
            flex: 1;
            margin-right: 20px;
          }

          .news-content {
            flex: 2;
          }
        }

        @media (max-width: 991px) {
          .news-section {
            max-width: 100%;
          }

          .section-title {
            max-width: 100%;
          }

          .news-article {
            max-width: 100%;
          }

          .news-content {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

export default FreeSection;
