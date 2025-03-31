"use client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import logo from "../media/Logo_web.png"; // Import the logo image
import banner from "../media/Banner_web.png"; // Import the banner image
import loginIcon from "../media/login_icon.png"; // Import the login icon image

function Header() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    if (searchText.trim() !== "") {
      const formattedSearchText = searchText.toLowerCase().replace(/\s+/g, "-"); // Format the search text
      navigate(`/game-details/${formattedSearchText}`); // Redirect to the GameDetails page
    }
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/"> {/* Make the logo a link to Home */}
          <img
            src={logo}
            alt="Logo"
            className="logo"
          />
        </Link>
        <Link to="/"> {/* Make the banner a link to Home */}
          <img
            src={banner}
            alt="Logo text"
            className="logo-text"
          />
        </Link>
        <button className="login-button" onClick={() => navigate("/login")}>
          <img
            src={loginIcon}
            alt="Login"
            className="login-icon"
          />
        </button>
      </div>
      <form className="search-bar" onSubmit={handleSearchSubmit}>
        <div className="search-layer">
          <input
            type="text"
            className="search-input"
            placeholder="Busca un juego..."
            value={searchText}
            onChange={handleInputChange}
          />
          <button type="submit" className="search-icon-container">
            <div className="icon-wrapper">
              <div className="icon-inner">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/386207518883442a607ffd5068af0d6571abcc6654e219af2e8d84919581a2c5?placeholderIfAbsent=true&apiKey=f682e8de3cb14cc19333c5fafcca59c5"
                  alt="Search"
                  className="search-icon"
                />
              </div>
            </div>
          </button>
        </div>
      </form>

      <style jsx>{`
        .header {
          background-color: rgba(6, 31, 46, 1);
          min-width: 100%;
          padding: 18px 43px 34px;
          overflow: clip;
          position: relative;
        }

        .logo-container {
          display: flex;
          align-items: center; /* Align items vertically */
          width: 100%;
          gap: 0px; /* Adjust gap between logo and banner */
          position: relative; /* Ensure child elements with absolute positioning are aligned relative to this container */
          padding-top: 0px;
        }

        .logo {
          display: none;
          aspect-ratio: 2.03;
          object-fit: contain;
          object-position: center;
          height: 80px; /* Set a consistent height */
          flex-shrink: 0;
        }

        .logo-text {
          aspect-ratio: 7.35;
          object-fit: contain;
          object-position: center;
          height: 150px; /* Increased height for the banner */
          flex-shrink: 0;
        }

        .login-button {
          cursor: pointer;
          margin-left: auto; /* Align the button to the right */
          object-fit: contain;
          background: none;
          object-position: center;
          flex-shrink: 0;
          border: none;
          margin-right: 80px; /* Adjusted margin for the button */
        }

        .login-icon {
          width: 80px;
          height: 80px;
        }

        .search-bar {
          justify-content: start; /* Align items to the left */
          align-items: stretch;
          border-radius: 28px;
          background-color: #fff;
          display: flex;
          margin: px 0; /* Remove horizontal centering */
          min-height: 61px;
          width: 96%; /* Adjusted width of the search bar */
          gap: 0px;
          overflow: hidden;
        }

        .search-layer {
          background-color: rgba(239, 238, 227, 1);
          display: flex;
          width: 100%;
          padding: 4px;
          gap: 0px;
          justify-content: start;
          height: 100%;
          flex: 1;
          flex-shrink: 1;
          flex-basis: 0%;
        }

        .search-input {
          align-self: stretch;
          background-color: rgba(239, 238, 227, 1);
          min-width: 240px;
          gap: 10px;
          font-family:
            Roboto,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
          font-size: 36px;
          color: #000; /* Changed text color to black */
          font-weight: 400;
          text-align: left;
          letter-spacing: 0px;
          line-height: 1;
          height: 100%;
          flex: 1;
          flex-shrink: 1;
          flex-basis: 0%;
          margin: 10px;
          border: none;
          outline: none;
          padding: 0 10px;
        }

        .search-icon-container {
          display: flex;
          margin: auto 0;
          align-items: right;
          justify-content: end;
          width: 48px;
          border: none;
          background: none;
          cursor: pointer;
        }

        .icon-wrapper {
          align-self: stretch;
          display: flex;
          margin: auto 0;
          min-height: 48px;
          width: 48px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .icon-inner {
          border-radius: 100px;
          display: flex;
          width: 100%;
          max-width: 40px;
          align-items: center;
          gap: 10px;
          overflow: hidden;
          justify-content: center;
        }

        .search-icon {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 24px;
          align-self: stretch;
          margin: auto 0;
        }

        @media (max-width: 1300px) {
          .header {
            max-width: 100%;
            padding: 18px 20px 34px;
          }

          .login-icon {
            width: 40px;
            height: 40px;
            margin-right: -30px; /* Adjusted margin for the button */
          }

          .logo-container {
            max-width: 100%;
          }

          .logo {
            height: 60px; /* Adjust logo size for smaller screens */
            display: block; /* Show the logo on smaller screens */
          }

          .logo-text {
            height: 120px; /* Adjust banner size for smaller screens */
            display: none; /* Hide the banner text */
          }

          .search-bar {
            width: 95%; /* Adjusted width for smaller screens */
          }

          .search-input {
            max-width: 100%;
            font-size: 24px;
            margin: 5px;
          }

          .search-bar {
            margin: 10px 0; /* Remove horizontal centering */
            min-height: 50px;
          }

          .search-icon-container {
            width: 40px;
          }

          .icon-wrapper {
            min-height: 40px;
            width: 40px;
          }

          .icon-inner {
            max-width: 30px;
          }

          .search-icon {
            width: 20px;
          }
        }

        @media (max-width: 600px) {
          .logo {
            height: 50px; /* Adjust logo size for even smaller screens */
            display: block; /* Show the logo on even smaller screens */
          }

          .logo-text {
            height: 100px; /* Adjust banner size for even smaller screens */
            display: none; /* Hide the banner text */
          }

          .search-bar {
            width: 90%; /* Allow the search bar to adjust to its content */
            min-width: 240px; /* Ensure it matches the minimum width of .search-input */
            background-color: rgba(239, 238, 227, 1);
          }

          .search-input {
            font-size: 18px;
            margin: 2px;
            min-height: 30px;
          }

          .search-bar {
            margin: 5px 0; /* Remove horizontal centering */
            min-height: 30px;
          }

          .search-icon-container {
            width: 30px;
            display: none;
          }

          .icon-wrapper {
            min-height: 30px;
            width: 30px;
          }

          .icon-inner {
            max-width: 20px;
          }

          .search-icon {
            width: 15px;
          }
        }
      `}</style>
    </header>
  );
}

export default Header;