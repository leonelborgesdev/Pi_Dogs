import React from "react";
import "./CardBreed.css";

export const CardBreed = ({ breed }) => {
  return (
    <div className="card">
      <div className="card_img">
        <img src={breed.image} width={"350px"} height={"250px"} />
      </div>
      <h3>Name: {breed.name}</h3>
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
  );
};
