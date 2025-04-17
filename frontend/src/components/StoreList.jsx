import React, { useEffect, useState } from "react";
import StoreItem from "./StoreItem";
import StoreRecommendation from "./StoreRecommendation";
import CheapShark from "../cheapshark.json"
import Stores from "../store.json"

function StoreList({ title }) {

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

  /*useEffect(() => {
    // Accede directamente al contenido del JSON importado
    if (CheapShark.deals) {
      setDeals(CheapShark.deals);
    } else {
      console.error("No se encontraron ofertas en el archivo JSON");
    }
  }, []);*/

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
    <section className="store-list">
      {deals.map((deal) => {
        // Buscar la tienda correspondiente en el JSON de Stores
        const store = stores.find((store) => store.storeID === deal.storeID);

        return (
          <StoreItem
            key={deal.storeID}
            storeName={store ? store.storeName : "Unknown Store"} // Mostrar el nombre de la tienda si se encuentra
            price={`${deal.price} €`}
            storeLogoUrl={`https://www.cheapshark.com/img/stores/icons/${Number(deal.storeID) - 1}.png?v=1.0`}
            storeUrl={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}&k=1`}
          />
        );
      })}
      <style jsx>{`
        .store-list {
          padding: 24px 0;
          background-color: #061f2e;
        }
      `}</style>
    </section>
  );
}

export default StoreList;
