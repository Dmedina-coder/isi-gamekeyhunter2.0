import * as React from "react";

function StoreItem({ storeName, price, storeLogoUrl, storeUrl }) {
  return (
    <a href={storeUrl} target="_blank" rel="noopener noreferrer" className="store-link">
      <div className="store-item">
        <div className="store-details">
          <img
            src={storeLogoUrl}
            alt="Store logo"
            className="store-logo"
          />
          <span className="store-name">{storeName}</span>
        </div>
        <div className="price">{price}</div>
      </div>
      <style jsx>{`
        .store-link {
          text-decoration: none; /* Remove underline from the link */
          color: inherit; /* Inherit text color */
        }
        .store-item {
          display: flex;
          padding: 0px 0px 0px 40px;
          margin-bottom: 22px;
          background-color: #023844;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .store-item:hover {
          transform: scale(1.02); /* Slight zoom effect on hover */
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow on hover */
        }
        .store-details {
          display: flex;
          align-items: center;
          gap: 13px;
        }
        .store-logo {
          width: 16px;
          height: 16px;
          border: none;
        }
        .store-name {
          color: #c5c5c5;
          font-family: "Inter", sans-serif;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.96px;
          margin: 0;
          text-align: left;
        }
        .price {
          color: #fff;
          font-family: "Inter", sans-serif;
          font-size: 16px;
          font-weight: 700;
          width: 80px;
          height: 100%;
          padding: 20px 20px;
          background-color: #000;
          clip-path: polygon(20% 0, 100% 0, 100% 100%, 0 100%);
          text-align: right;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        @media (max-width: 991px) {
          .platform-details {
            margin-left: 50px;
          }
        }
        @media (max-width: 640px) {
          .store-item {
            gap: 5px;
            align-items: center;
          }
          .price {
            margin-left: auto;
          }
        }
      `}</style>
    </a>
  );
}

export default StoreItem;
