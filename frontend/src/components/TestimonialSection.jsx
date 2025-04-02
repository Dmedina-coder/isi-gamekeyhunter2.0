import React from "react";
import TestimonialCard from "./TestimonialCard";

function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      quote: "A terrific piece of praise",
      avatarSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/67dbc2b3abd7ba2b199257ad113004315a8d161da7cdf226d0fb43b4dc0bf8b1?placeholderIfAbsent=true&apiKey=f682e8de3cb14cc19333c5fafcca59c5",
    },
    {
      id: 2,
      quote: "A fantastic bit of feedback",
      avatarSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/cdb0b2946111f8374c02f95ebb2e894d4a7d6a7005470f7ad69458fed543afc8?placeholderIfAbsent=true&apiKey=f682e8de3cb14cc19333c5fafcca59c5",
    },
    {
      id: 3,
      quote: "A genuinely glowing review",
      avatarSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4c66068ef92b4fdd40a8e0fc3a46be91247e6d5cb78c14c8850ce0914dbdef55?placeholderIfAbsent=true&apiKey=f682e8de3cb14cc19333c5fafcca59c5",
    },
  ];

  return (
    <section className="testimonial-section">
      {testimonials.map((testimonial) => (
        <TestimonialCard
          key={testimonial.id}
          quote={testimonial.quote}
          avatarSrc={testimonial.avatarSrc}
        />
      ))}

      <style jsx>{`
        .testimonial-section {
          align-self: center;
          display: flex;
          margin-top: 31px;
          width: 100%;
          max-width: 1280px;
          align-items: stretch;
          gap: 32px;
          font-family:
            Inter,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
          font-weight: 500;
          justify-content: start;
          flex-wrap: wrap;
        }

        @media (max-width: 991px) {
          .testimonial-section {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

export default TestimonialSection;
