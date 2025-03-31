"use client";
import React from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";

function LoginPage() {
  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <div className="login-container">
          <LoginForm />
        </div>
      </main>
      <Footer />
      <style jsx>{`
        .page-container {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          align-items: stretch;
          background-color: #022839;
        }
        .main-content {
          margin-left: auto;
          margin-right: auto;
          padding-left: 0px;
          padding-right: 0px;
          padding-top: 60px;
          padding-bottom: 60px;
          width: 90%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          align-items: stretch;
        }
        @media (max-width: 991px) {
          .main-content {
            max-width: 991px;
          }
        }
        @media (max-width: 640px) {
          .main-content {
            max-width: 640px;
          }
        }
        .login-container {
          width: 100%;
          max-width: 1342px;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
