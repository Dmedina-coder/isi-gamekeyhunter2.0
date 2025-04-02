import * as React from "react";
import StoreItem from "./StoreItem";

function StoreRecommendation({ storeName, platform, price, storeLogoUrl, platformLogoUrl }) {
  return (
    <div className="recommendation-container">
      <h2 className="recommendation-title">NUESTRA RECOMENDACIÓN</h2>
      <StoreItem
            key={"1"}
            storeName={"G2A"} 
            price={"99,99 €"}
            storeLogoUrl={"https://www.g2a.com/static/assets/favicon.ico"}
            storeUrl={"https://www.g2a.com/?adid=GA-ES_PEB_ON_SK_KEY_PURE_BRAND-English&id=35&utm_medium=cpc&utm_source=google&utm_campaign=GA-ES_PEB_ON_SK_KEY_PURE_BRAND-English&utm_id=310893744&gad_source=1&gclid=Cj0KCQjw1um-BhDtARIsABjU5x5-L-NTjHcnl1QpvOJef9CjpMJEbPG1U1nuJEGfkGAunIvxxU4oeosaAsUOEALw_wcB&gclsrc=aw.ds"}
          />
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
