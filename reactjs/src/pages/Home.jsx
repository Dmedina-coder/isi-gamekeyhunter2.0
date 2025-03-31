"use client";
import React from "react";
import img from "../media/Game.webp";

import Header from "../components/Header";
import Slider from "../components/Slider";
import NewsSection from "../components/FreeSection";
import GameListLast from "../components/GameListLast";
import GameListMost from "../components/GameListMost";
import TestimonialSection from "../components/TestimonialSection";
import Footer from "../components/Footer";

function Home() {

  return (
    <main className="home">
      <Header />
      <Slider />
      <NewsSection />
      <GameListMost
        title="TOP 5 MAS BUSCADOS"
        className="top-searched"
      />
      {/*<GameListLast
        title="TOP 5 ULTIMOS BUSCADOS"
        className="latest-searched"
      />*/}
      <TestimonialSection />
      <Footer />

      <style jsx>{`
        .home {
          background-color: rgba(2, 40, 57, 1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          align-items: stretch;
        }
      `}</style>
    </main>
  );
}

export default Home;
