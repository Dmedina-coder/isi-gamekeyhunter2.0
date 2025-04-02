import React from "react";

function TestimonialCard({
  quote,
  avatarSrc,
  name = "Name",
  description = "Description",
}) {
  return (
    <article className="testimonial-card">
      <p className="quote-text">{quote}</p>
      <div className="avatar-container">
        <img src={avatarSrc} alt={name} className="avatar-image" />
        <div className="avatar-info">
          <p className="avatar-name">{name}</p>
          <p className="avatar-description">{description}</p>
        </div>
      </div>

      <style jsx>{`
        .testimonial-card {
          border-radius: 12px;
          background-color: rgba(255, 255, 255, 1);
          border: 1px solid rgba(230, 230, 230, 1);
          display: flex;
          min-width: 240px;
          padding: 32px;
          flex-direction: column;
          align-items: stretch;
          justify-content: start;
          flex: 1;
          flex-shrink: 1;
          flex-basis: 0%;
        }

        .quote-text {
          color: rgba(0, 0, 0, 1);
          font-size: 24px;
          font-family:
            Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
          font-weight: 500;
          margin: 0;
        }

        .avatar-container {
          align-self: start;
          display: flex;
          margin-top: 48px;
          align-items: center;
          gap: 16px;
          font-size: 16px;
          white-space: nowrap;
          justify-content: start;
        }

        .avatar-image {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 45px;
          border-radius: 50%;
          align-self: stretch;
          margin: auto 0;
          flex-shrink: 0;
        }

        .avatar-info {
          align-self: stretch;
          margin: auto 0;
        }

        .avatar-name {
          color: #000;
          margin: 0;
          font-family:
            Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
          font-weight: 500;
        }

        .avatar-description {
          color: #828282;
          margin: 0;
          font-family:
            Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
          font-weight: 500;
        }

        @media (max-width: 991px) {
          .testimonial-card {
            padding: 20px;
          }

          .avatar-container {
            margin-top: 40px;
            white-space: initial;
          }

          .avatar-info {
            white-space: initial;
          }
        }
      `}</style>
    </article>
  );
}

export default TestimonialCard;
