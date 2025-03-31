import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="divider"></div>
      <div className="footer-content">
        <div className="footer-info">
          <h2 className="site-name">GameKey Hunter</h2>
          <div className="social-icons">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/199c9a3c64fa87237dabe74b1aff1fe617935141f37a07ba364b7012e90e628c?placeholderIfAbsent=true&apiKey=f682e8de3cb14cc19333c5fafcca59c5"
              alt="Social icon"
              className="social-icon"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1bac3668b19309ab1c82835d154f9962b24bad9c262723d53374e3173c3e762?placeholderIfAbsent=true&apiKey=f682e8de3cb14cc19333c5fafcca59c5"
              alt="Social icon"
              className="social-icon"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c9c8d64becb556072cf4288b2dadd32d18a3ce8e19d5cc15f298f66d1125313b?placeholderIfAbsent=true&apiKey=f682e8de3cb14cc19333c5fafcca59c5"
              alt="Social icon"
              className="social-icon"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0828515f09127d365461d17e1036e88788811bd5c0258116139d171a870fbe56?placeholderIfAbsent=true&apiKey=f682e8de3cb14cc19333c5fafcca59c5"
              alt="Social icon"
              className="social-icon"
            />
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-columns">
            <div className="footer-column">
              <div className="link-group">
                <h3 className="link-topic">Topic</h3>
                <a href="#" className="link-page">
                  Page
                </a>
                <a href="#" className="link-page">
                  Page
                </a>
                <a href="#" className="link-page">
                  Page
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: rgba(255, 255, 255, 1);
          margin-top: 60px;
          width: 100%;
          padding: 0 80px 46px;
          overflow: hidden;
        }

        .divider {
          border-color: rgba(230, 230, 230, 1);
          border-style: solid;
          border-width: 1px;
          width: 1280px;
          flex-shrink: 0;
          max-width: 100%;
          height: 1px;
        }

        .footer-content {
          display: flex;
          margin-top: 47px;
          width: 100%;
          align-items: stretch;
          gap: 40px 100px;
          flex-wrap: wrap;
        }

        .footer-info {
          align-self: start;
          display: flex;
          margin-top: 4px;
          flex-direction: column;
          align-items: stretch;
        }

        .site-name {
          color: #000;
          font-family:
            Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
          font-size: 24px;
          font-weight: 400;
          align-self: start;
          margin: 0;
        }

        .social-icons {
          display: flex;
          margin-top: 88px;
          align-items: start;
          gap: 8px;
          justify-content: start;
        }

        .social-icon {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 40px;
          border-radius: 4px;
          flex-shrink: 0;
        }

        .footer-links {
          flex-grow: 1;
          flex-shrink: 1;
          flex-basis: auto;
        }

        .footer-columns {
          gap: 20px;
          display: flex;
        }

        .footer-column {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          line-height: normal;
          width: 33%;
          margin-left: 0px;
        }

        .footer-column:not(:first-child) {
          margin-left: 20px;
        }

        .link-group {
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          align-items: stretch;
          font-family:
            Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
          font-size: 16px;
          color: #454545;
          font-weight: 500;
          white-space: nowrap;
          justify-content: center;
        }

        .link-topic {
          color: #000;
          margin: 0;
          font-size: 16px;
          font-weight: 500;
        }

        .link-page {
          margin-top: 24px;
          text-decoration: none;
          color: #454545;
        }

        @media (max-width: 991px) {
          .footer {
            max-width: 100%;
            padding: 0 20px 46px;
            margin-top: 40px;
          }

          .divider {
            margin-right: 2px;
          }

          .footer-content {
            max-width: 100%;
            margin-top: 40px;
          }

          .social-icons {
            margin-top: 40px;
          }

          .footer-links {
            max-width: 100%;
          }

          .footer-columns {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }

          .footer-column {
            width: 100%;
          }

          .footer-column:not(:first-child) {
            margin-left: 0;
          }

          .link-group {
            margin-top: 32px;
            white-space: initial;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
