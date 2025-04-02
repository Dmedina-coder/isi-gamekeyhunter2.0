import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

function GameCard({ title, price, image }) {
  const formattedTitle = title.toLowerCase().replace(/-/g, " "); // Format title for URL

  return (
    <Link to={`/game-details/${formattedTitle}`} className="game-card-link">
      <article className="game-card">
        <div className="game-info">
          <div className="game-content">
            <div className="image-column">
              <img src={image} alt={title} className="game-image" />
            </div>
            <div className="title-column">
              <span className="game-title">{formattedTitle}</span>
            </div>
          </div>
        </div>
        <div className="price-container">
          <div className="price-button">{price}</div>
        </div>
      </article>

      <style jsx>{`
        .game-card-link {
          text-decoration: none; /* Remove underline from the link */
          color: inherit; /* Inherit text color */
        }

        .game-card {
          background-color: rgba(2, 56, 68, 1);
          display: flex;
          width: 100%;
          max-height: 100px; /* Limit the height of the card */
          padding: 0;
          align-items: stretch;
          overflow: hidden;
          flex-wrap: wrap;
          margin-bottom: 20px;
          transition: transform 0.2s ease; /* Add hover effect */
        }

        .game-card:hover {
          transform: scale(1.02); /* Slightly enlarge on hover */
        }

        .game-info {
          margin: auto 0;
          flex-grow: 1;
          flex-shrink: 1;
          flex-basis: auto;
        }

        .game-content {
          display: flex;
          flex-direction: row; /* Ensure the image and text are side by side */
          align-items: center; /* Align items vertically */
          gap: 20px; /* Space between the image and text */
          height: 100%; /* Ensure the content takes the full height of the card */
        }

        .image-column {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          line-height: normal;
          max-width: 20%; /* Adjusted width for the image */
          height: 100%; /* Ensure the image column takes the full height */
          margin-left: 0px;
        }

        .game-image {
          aspect-ratio: 1.46;
          object-fit: cover; /* Ensure the image covers the container */
          object-position: center; /* Center the image */
          height: 100%; /* Ensure the image takes the full height of its container */
          max-height: 100px; /* Limit the height of the card */
          flex-shrink: 0;
        }

        .title-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start; /* Align text to the left */
          line-height: normal;
          width: 70%; /* Adjusted width for the text */
          margin-left: 0px; /* Remove extra margin */
          overflow: hidden; /* Prevent text overflow */
          text-overflow: ellipsis; /* Add ellipsis for overflowing text */
          white-space: nowrap; /* Prevent text from wrapping */
        }

        .game-title {
          color: rgba(197, 197, 197, 1);
          font-size: 20px; /* Adjust font size to fit within the limited height */
          font-family:
            Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
          font-weight: 600;
          letter-spacing: -0.96px;
          margin: 0; /* Remove auto margins */
          text-align: left; /* Align text to the left */
        }

        .price-container {
          display: flex;
          min-height: 100px;
          height: 100%; /* Ensure it takes the full height of the card */
          align-items: stretch; /* Stretch children to match the container's height */
          background-color: rgba(0, 0, 0, 1);
          gap: 16px; /* Reduced gap */
          font-family:
            Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
          font-size: 16px; /* Adjust font size */
          color: rgba(255, 255, 255, 1);
          font-weight: 700;
          justify-content: end;
          clip-path: polygon(20% 0, 100% 0, 100% 100%, 0 100%); /* Creates a diagonal left border */
        }

        .price-button {
          box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
          background-color: #000;
          margin: auto 0;
          height: 100%; /* Occupy the full height of the container */
          width: 80px; /* Adjust width */
          padding: 30px; /* Adjust padding */
          margin-right: 10px; /* Add margin to the right */
          gap: 8px;
          display: flex;
          align-items: right;
          justify-content: right;
        }

        @media (max-width: 991px) {
                    .game-card {
            width: 100%;
            max-height: 50px; /* Limit the height of the card */
            align-items: flex-start;
            overflow: hidden;
            flex-wrap: wrap;
            margin-bottom: 20px;
            transition: transform 0.2s ease; /* Add hover effect */
          }
          .game-info {
            margin: 0 0;
          }
          .game-content {
            flex-direction: row; /* Ensure image and text are side by side */
            align-items: flex-start; /* Align items vertically */
            gap: 16px; /* Space between the image and text */
          }
          .game-title {
            color: rgba(197, 197, 197, 1);
            font-size: 14px; /* Adjust font size to fit within the limited height */
            letter-spacing: -0.96px;
            margin-top: 20px;
          }
          .title-column {
            max-height: 50px; /* Limit the height of the text */
            display: flex;
            flex-direction: column;
            
          }
          .image-column {
            margin-top: 0px;
          }
          .game-image {
            aspect-ratio: 1.46;
            height: 100%; /* Ensure the image takes the full height of its container */
            margin-top: 0px;
            min-height: 50px; /* Limit the height of the card */
          }
          .price-button {
            margin: 5px 0;
            width: 80px; /* Adjust width */
            padding: 10px; /* Adjust padding */
            margin-right: 10px; /* Add margin to the right */
          }
        }
        @media (max-width: 450px) {
          .game-card {
            width: 100%;
            max-height: 50px; /* Limit the height of the card */
            align-items: flex-start;
            overflow: hidden;
            flex-wrap: wrap;
            margin-bottom: 20px;
            transition: transform 0.2s ease; /* Add hover effect */
          }
          .game-info {
            margin: 0 0;
          }
          .game-content {
            flex-direction: row; /* Ensure image and text are side by side */
            align-items: flex-start; /* Align items vertically */
            gap: 16px; /* Space between the image and text */
          }
          .game-title {
            color: rgba(197, 197, 197, 1);
            font-size: 14px; /* Adjust font size to fit within the limited height */
            letter-spacing: -0.96px;
            margin-top: 20px;
          }
          .title-column {
            max-height: 50px; /* Limit the height of the text */
            display: flex;
            flex-direction: column;
            
          }
          .image-column {
            margin-top: 0px;
          }
          .game-image {
            aspect-ratio: 1.46;
            height: 100%; /* Ensure the image takes the full height of its container */
            margin-top: 0px;
            min-height: 50px; /* Limit the height of the card */
          }
          .price-button {
            margin: 5px 0;
            width: 80px; /* Adjust width */
            padding: 10px; /* Adjust padding */
            margin-right: 10px; /* Add margin to the right */
          }
            
        }
      `}</style>
    </Link>
  );
}

export default GameCard;
