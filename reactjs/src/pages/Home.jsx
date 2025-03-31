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
  // Sample data for game lists
  const topSearchedGames = [
    {
      id: 1,
      title: "Minecraft",
      price: "9.99€",
      image:img,
    },
    {
      id: 2,
      title: "Assassins Creed",
      price: "99.99€",
      image:img,
    },
    {
      id: 3,
      title: "Counter",
      price: "199.99€",
      image:img,
    },
    {
      id: 4,
      title: "League of Legends",
      price: "99.99€",
      image:img,
    },
    {
      id: 5,
      title: "Assasins creed valhalla",
      price: "99.99€",
      image:img,
    },
  ];

  const latestSearchedGames = [
    {
      id: 1,
      title: "Lorem Ipsum",
      price: "99.99€",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ed5aa7439cd9d9ff3a864c3dac10325030bd741d4780ac40458f0d3318610f95?placeholderIfAbsent=true&apiKey=f682e8de3cb14cc19333c5fafcca59c5",
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      price: "99.99€",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ed5aa7439cd9d9ff3a864c3dac10325030bd741d4780ac40458f0d3318610f95?placeholderIfAbsent=true&apiKey=f682e8de3cb14cc19333c5fafcca59c5",
    },
    {
      id: 3,
      title: "Lorem Ipsum",
      price: "99.99€",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ed5aa7439cd9d9ff3a864c3dac10325030bd741d4780ac40458f0d3318610f95?placeholderIfAbsent=true&apiKey=f682e8de3cb14cc19333c5fafcca59c5",
    },
    {
      id: 4,
      title: "Lorem Ipsum",
      price: "99.99€",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ed5aa7439cd9d9ff3a864c3dac10325030bd741d4780ac40458f0d3318610f95?placeholderIfAbsent=true&apiKey=f682e8de3cb14cc19333c5fafcca59c5",
    },
    {
      id: 5,
      title: "Lorem Ipsum",
      price: "99.99€",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ed5aa7439cd9d9ff3a864c3dac10325030bd741d4780ac40458f0d3318610f95?placeholderIfAbsent=true&apiKey=f682e8de3cb14cc19333c5fafcca59c5",
    },
  ];

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
        games={latestSearchedGames}
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
