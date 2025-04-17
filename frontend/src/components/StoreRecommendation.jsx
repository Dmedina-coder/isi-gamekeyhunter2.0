import React, { useEffect, useState } from "react";
import StoreItem from "./StoreItem";
import Stores from "../store.json"

function StoreRecommendation({ title }) {

  const [deals, setDeals] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:5020/api/v1/cheapshark/find?title=${title}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del servidor");
        }
        const data = await response.json();
        setDeals(data.deals || []); // Asignar las ofertas obtenidas al estado
      } catch (err) {
        setError(err.message);
      } 
    };
    
    fetchDeals();
  }, [title]);

  useEffect(() => {
    // Accede directamente al contenido del JSON importado
    if (Stores) {
      setStores(Stores);
    } else {
      console.error("No se encontraron tiendas en el archivo JSON");
    }
  }, []);

  if (deals.length === 0 || stores.length === 0) {
    return (
      <div className="loading-container">
      </div>
    );
  }

  return (
    <div className="recommendation-container">
      <h2 className="recommendation-title">NUESTRA RECOMENDACIÓN</h2>
      {deals.map((deal) => {
        // Buscar la tienda correspondiente en el JSON de Stores
        const store = stores.find((store) => store.storeID === deal.storeID);
		if (deal.storeID === "1") {
			return (
			<StoreItem
				key={deal.storeID}
				storeName={store ? store.storeName : "Unknown Store"} // Mostrar el nombre de la tienda si se encuentra
				price={`${deal.price} €`}
				storeLogoUrl={`https://www.cheapshark.com/img/stores/icons/${Number(deal.storeID) - 1}.png?v=1.0`}
				storeUrl={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}&k=1`}
			/>
			);
		}
      })}
      <style jsx>{`
        .recommendation-container {
          padding-bottom: 22px;
          background-color: #061f2e;
        }
        .recommendation-title {
          color: #c5c5c5;
          font-family: "Inter", sans-serif;
          font-size: 36px;
          font-weight: 900;
          text-align: center;
          padding: 20px 0;
          margin: 0;
        }
        .store-info {
          display: flex;
          padding: 24px 20px;
          pading-Right: 0px;
          margin-bottom: 22px;
          background-color: #023844;
        }
        .store-details {
          display: flex;
          align-items: center;
          gap: 13px;
        }
        .store-logo {
          width: 60px;
          height: 41px;
          border: 1px solid #433b3b;
        }
        .store-name {
          color: #c5c5c5;
          font-family: "Inter", sans-serif;
          font-size: 36px;
          font-weight: 700;
        }
        .platform-details {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-left: 113px;
        }
        .platform-logo {
          width: 60px;
          height: 41px;
          border: 1px solid #433b3b;
        }
        .platform-name {
          color: #c5c5c5;
          font-family: "Inter", sans-serif;
          font-size: 36px;
          font-weight: 700;
        }
        .price {
          margin-left: auto;
          color: #fff;
          font-family: "Inter", sans-serif;
          font-size: 40px;
          font-weight: 700;
          padding: 20px 32px;
          background-color: #000;
        }
        @media (max-width: 991px) {
          .platform-details {
            margin-left: 50px;
          }
        }
        @media (max-width: 640px) {
          .store-info {
            flex-direction: column;
            gap: 15px;
            align-items: center;
          }
          .platform-details {
            margin-left: 0;
          }
          .price {
            width: 100%;
            text-align: center;
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default StoreRecommendation;
