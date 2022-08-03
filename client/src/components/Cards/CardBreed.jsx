import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardBreed.css";

export const CardBreed = ({ breed }) => {
  const navigate = useNavigate();
  return (
    <div className="card">
      <div className="card_img">{breed.image && <img src={breed.image} />}</div>
      <h1>{breed.name}</h1>
      <div className="card_temperaments">
        <h3>Weight(kg): {breed.weight}</h3>
        <h3>
          Temperaments:
          {breed.temperaments.length > 0 ? (
            breed.temperaments.map((temperament) => {
              return <span key={temperament.id}>[{temperament.name}]</span>;
            })
          ) : (
            <span> [No se encontro Temperamentos]</span>
          )}
        </h3>
      </div>
      <div className="group_btn">
        <button
          onClick={() => {
            navigate(`/breedDetail/${breed.id}`);
          }}
        >
          Detail
        </button>
      </div>
    </div>
  );
};
