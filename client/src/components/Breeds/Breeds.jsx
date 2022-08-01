import React, { useEffect } from "react";
import Nav from "../Nav/Nav";
import { getAllTemperaments, get_all_breeds } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { CardBreed } from "../Cards/CardBreed";
import "./Breeds.css";
import pet from "../../assets/pet.gif";
import { Paginado } from "../Paginado/Paginado";

const Breeds = () => {
  const dispatch = useDispatch();
  const { breeds, pagina, lim_paginas } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getAllTemperaments());
    dispatch(get_all_breeds());
  }, []);
  let lim = lim_paginas;
  let max = pagina * lim;
  let min = max - lim;
  if (pagina >= 2) {
    max = max;
    min = min;
  }
  return (
    <div className="containerBreed">
      <Nav />
      <h1 className="h1_razas">Breeds</h1>
      <div className="cards">
        {breeds.map((breed) => {
          return (
            <div key={breed.id}>
              {breeds.indexOf(breed) < max && breeds.indexOf(breed) >= min && (
                <CardBreed breed={breed} />
              )}
            </div>
          );
        })}
      </div>
      <img className="pet_breeds" src={pet} />
      <Paginado />
    </div>
  );
};

export default Breeds;
