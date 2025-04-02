"use client";
import React, { useState, useEffect } from "react";

function Slider() {
  // Array of slide images
  const slides = [
    {
      id: 1,
      src: "https://cdn.allkeyshop.com/images/tiles/slide1.webp?v=1742405609",
      alt: "Featured game 1",
    },
    {
      id: 2,
      src: "https://cdn.allkeyshop.com/images/tiles/slide2.webp?v=1742405611", // Using https://cdn.builder.io/api/v1/image/assets/TEMP/b6f2b8a4adc210b26c6d939be18c9e7f69a68b01f26c905ebe2f34c43728b5ef?placeholderIfAbsent=true&apiKey=f682e8de3cb14cc19333c5fafcca59c5 as placeholder for second image
      alt: "Featured game 2",
    },
    {
      id: 3,
      src: "https://cdn.allkeyshop.com/images/tiles/slide3.webp?v=1742405606", // Using https://cdn.builder.io/api/v1/image/assets/TEMP/19ae72ff2779f2f6cd1fd9d5b06347885049c82c8534d15be4b89ace8d3e32a2?placeholderIfAbsent=true&apiKey=f682e8de3cb14cc19333c5fafcca59c5 as placeholder for third image
      alt: "Featured game 3",
    },
    {
      id: 4,
      src: "https://cdn.allkeyshop.com/images/tiles/slide4.webp?v=1742405613", // Using https://cdn.builder.io/api/v1/image/assets/TEMP/ed5aa7439cd9d9ff3a864c3dac10325030bd741d4780ac40458f0d3318610f95?placeholderIfAbsent=true&apiKey=f682e8de3cb14cc19333c5fafcca59c5 as placeholder for fourth image
      alt: "Featured game 4",
    },
	{
		id: 5,
		src: "https://cdn.allkeyshop.com/images/tiles/slide5.webp?v=1742405606", // Using https://cdn.builder.io/api/v1/image/assets/TEMP/19ae72ff2779f2f6cd1fd9d5b06347885049c82c8534d15be4b89ace8d3e32a2?placeholderIfAbsent=true&apiKey=f682e8de3cb14cc19333c5fafcca59c5 as placeholder for third image
		alt: "Featured game 5",
	  },
	  {
		id: 6,
		src: "https://cdn.allkeyshop.com/images/tiles/slide6.webp?v=1742405613", // Using https://cdn.builder.io/api/v1/image/assets/TEMP/ed5aa7439cd9d9ff3a864c3dac10325030bd741d4780ac40458f0d3318610f95?placeholderIfAbsent=true&apiKey=f682e8de3cb14cc19333c5fafcca59c5 as placeholder for fourth image
		alt: "Featured game 6",
	  },
  ];

  // State for current slide index
  const [currentSlide, setCurrentSlide] = useState(0);
  // State for auto-play
  const [autoPlay, setAutoPlay] = useState(true);

  // Function to go to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Function to go to previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Function to go to a specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play effect
  useEffect(() => {
    let slideInterval;

    if (autoPlay) {
      slideInterval = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
    }

    // Clean up interval on component unmount or when autoPlay changes
    return () => {
      if (slideInterval) {
        clearInterval(slideInterval);
      }
    };
  }, [autoPlay, currentSlide]);

  // Pause auto-play when user interacts with controls
  const handleControlInteraction = (callback) => {
    return () => {
      setAutoPlay(false); // Pause auto-play
      callback(); // Execute the provided callback (prev/next/goToSlide)

      // Resume auto-play after 10 seconds of inactivity
      setTimeout(() => {
        setAutoPlay(true);
      }, 10000);
    };
  };

  return (
    <section className="slider">
      <div className="carousel-container">
        <div
          className="slides-container"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div className="slide" key={slide.id}>
              <img src={slide.src} className="slider-image" alt={slide.alt} />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          className="carousel-control prev-button"
          onClick={handleControlInteraction(prevSlide)}
          aria-label="Previous slide"
        >
          &#10094;
        </button>

        <button
          className="carousel-control next-button"
          onClick={handleControlInteraction(nextSlide)}
          aria-label="Next slide"
        >
          &#10095;
        </button>

        {/* Slide indicators */}
        <div className="indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={handleControlInteraction(() => goToSlide(index))}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .slider {
          background-color: rgba(6, 31, 46, 1);
          margin-top: 27px;
          overflow: hidden;
          position: relative;
        }

        .carousel-container {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .slides-container {
          display: flex;
          transition: transform 0.5s ease-in-out;
          width: 100%;
        }

        .slide {
          min-width: 100%;
          flex: 1 0 100%;
        }

        .slider-image {
          aspect-ratio: 2.35;
          object-fit: contain;
          object-position: center;
          width: 100%;
          display: block;
        }

        .carousel-control {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.3s;
          z-index: 10;
        }

        .carousel-control:hover {
          opacity: 1;
        }

        .prev-button {
          left: 20px;
        }

        .next-button {
          right: 20px;
        }

        .indicators {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 10;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          border: none;
          cursor: pointer;
          transition: background-color 0.3s;
          padding: 0;
        }

        .indicator.active {
          background-color: white;
        }

        @media (max-width: 991px) {
          .slider {
            max-width: 100%;
          }

          .slider-image {
            max-width: 100%;
          }

          .carousel-control {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }

          .prev-button {
            left: 10px;
          }

          .next-button {
            right: 10px;
          }
        }

        @media (max-width: 576px) {
          .carousel-control {
            width: 30px;
            height: 30px;
            font-size: 16px;
          }

          .indicators {
            bottom: 10px;
          }

          .indicator {
            width: 8px;
            height: 8px;
          }
        }
      `}</style>
    </section>
  );
}

export default Slider;
