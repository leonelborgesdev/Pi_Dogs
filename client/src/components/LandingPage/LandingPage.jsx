import React from "react";
import { useNavigate } from "react-router-dom";
import PerritoPng from "../../assets/PerritoPng1.png";
import "./LandingPage.css";

export const LandingPage = () => {
  return (
    <div className="landing">
      <div className="container_landing">
        <div className="textos">
          <h1 className="textos_h1">Razas de Perros</h1>
          <h2 className="textos_h2">
            Conoce todas las razas de perros, con imagenes, sus caracteristicas
            y crea tus propias razas
          </h2>
          <a className="textos_buton" href="/breeds">
            Ingresar
          </a>
        </div>
        <div className="cardImg">
          <img className="img_landing" src={PerritoPng} />
        </div>
      </div>
      <div className="wave">
        <div style={{ height: "250px", overflow: "hidden" }}>
          <svg
            viewBox="0 0 500 100"
            preserveAspectRatio="none"
            style={{ height: "250px", width: "100%" }}
          >
            <path
              d="M0.00,49.87 C150.00,149.67 349.21,-49.87 500.00,49.87 L500.00,149.67 L0.00,149.67 Z"
              style={{ stroke: "none", fill: "#fff" }}
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};
