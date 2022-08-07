import React, { useEffect } from "react";
import Nav from "../Nav/Nav";
import {
  getAllTemperaments,
  getBreedById,
  get_all_breeds,
} from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./BreedDetail.css";
import { CardBreed } from "../Cards/CardBreed";

export const BreedDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idBreed } = useParams();
  useEffect(() => {
    dispatch(getAllTemperaments());
    dispatch(get_all_breeds());
  }, []);
  const { breeds } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getBreedById(idBreed, breeds));
  }, []);
  const { breed, breedsRecomend } = useSelector((state) => state);
  return (
    <div>
      <Nav />
      <div className="container_detail_breed">
        <h1 className="detail_titulo">Breed Detail</h1>
        {breed ? (
          <div className="breed_detail">
            <img className="img_detail" src={breed.image} />

            <div className="breed_descripcion">
              <h3 className="text_descripcion">Name: {breed.name}</h3>
              <h3 className="text_descripcion">Height: {breed.height}</h3>
              <h3 className="text_descripcion">Weight: {breed.weight}</h3>
              <h3 className="text_descripcion">Life Span: {breed.life_span}</h3>
              <h3 className="text_descripcion">
                Temperaments:
                {breed.temperaments?.map((temperament) => {
                  return (
                    <React.Fragment key={temperament.id}>
                      {breed.temperaments.indexOf(temperament) !==
                      breed.temperaments.length - 1 ? (
                        <span> {temperament.name},</span>
                      ) : (
                        <span> {temperament.name}.</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </h3>
              <div className="group_btn">
                <button
                  onClick={() => {
                    navigate(`/modify/${breed.id}`);
                  }}
                >
                  Modificar
                </button>
                <button
                  onClick={() => {
                    navigate(`/breeds`);
                  }}
                >
                  Volver
                </button>
              </div>
            </div>
          </div>
        ) : (
          <span>No se encontro la raza</span>
        )}
      </div>
      <h3 className="text_descripcion">Matches Temperaments:</h3>
      <div className="cards">
        {breedsRecomend.map((breed) => {
          return (
            <div key={breed.id}>
              <CardBreed breed={breed} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
