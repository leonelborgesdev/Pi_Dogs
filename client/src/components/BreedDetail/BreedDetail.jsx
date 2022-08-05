import React, { useEffect } from "react";
import Nav from "../Nav/Nav";
import {
  filter_breeds_temperamend_breedId,
  getBreedById,
} from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./BreedDetail.css";

export const BreedDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idBreed } = useParams();
  const { breed, breeds } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getBreedById(idBreed, breeds));
  }, []);
  return (
    <div>
      <Nav />
      <div className="container_detail_breed">
        <h1>Breed Detail</h1>
        {breed ? (
          <div className="breed_detail">
            {breed.image && <img src={breed.image} width="500px" />}
            <div className="breed_descripcion">
              <h3>Name: {breed.name}</h3>
              <h3>Height: {breed.height}</h3>
              <h3>Weight: {breed.weight}</h3>
              <h3>Life Span: {breed.life_span}</h3>
              <h3>
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
              </div>
            </div>
          </div>
        ) : (
          <span>No se encontro la raza</span>
        )}
      </div>
    </div>
  );
};
