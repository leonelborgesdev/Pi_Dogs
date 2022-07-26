import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CardBreed.css";

export const CardBreed = ({ breed }) => {
  const navigate = useNavigate();
  return (
    <div className="card">
      <div className="card_img">{breed.image && <img src={breed.image} />}</div>
      <h1 className="card_titulo">{breed.name}</h1>
      <div className="card_temperaments">
        <h3 className="card_texto">Weight(kg): {breed.weight}</h3>
        <h3 className="card_texto">
          Temperaments:
          {breed.temperaments.length > 0 ? (
            breed.temperaments.map((temperament) => {
              return <span key={temperament.id}>[{temperament.name}]</span>;
            })
          ) : (
            <span className="card_texto"> [No se encontro Temperamentos]</span>
          )}
        </h3>
      </div>
      <div className="group_btn">
        <button
          onClick={() => {
            navigate(`/breedDetail/${breed.id}`);
            window.location.reload();
          }}
        >
          Detail
        </button>
      </div>
    </div>
  );
};
