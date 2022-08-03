import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  cargar_temperamentos,
  getAllTemperaments,
  getBreedById,
  getTemperamentsByName,
  get_all_breeds,
} from "../../redux/actions";
import Nav from "../Nav/Nav";
import "./ModifyBreeds.css";
export const ModifyBreeds = () => {
  const dispatch = useDispatch();
  const { idBreed } = useParams();
  console.log(idBreed);
  const { temperaments_search, breed } = useSelector((state) => state);
  const [labelError, setLabelError] = useState({ label: "" });
  const [breedMody, setBreedMody] = useState({
    id: "",
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "",
    temperaments: cargar_datos(breed),
  });
  useEffect(() => {
    dispatch(getAllTemperaments());
  }, []);
  useEffect(() => {
    dispatch(get_all_breeds());
  }, []);
  useEffect(() => {
    console.log(idBreed);
    dispatch(getBreedById(idBreed));
  }, []);
  function cargar_datos(breedId) {
    return breedId.temperaments.map((temperament) => {
      return temperament.id;
    });
  }
  const vec = Object.keys(breed).length > 0 && breed.height.split("-");
  const vec2 = Object.keys(breed).length > 0 && breed.weight.split("-");
  const vec3 = Object.keys(breed).length > 0 && breed.life_span.split(" ");

  const [height, setHeigth] = useState({ height1: vec[0], height2: vec[1] });
  const [weight, setWeigth] = useState({ weight1: vec2[0], weight2: vec2[1] });
  const [life_span, setLife_span] = useState({
    life_span1: vec3[0],
    life_span2: vec3[2],
  });
  const handleTemperamentDeseleccionar = (e) => {
    const { id } = e.target;
    console.log(id);
    for (let i = 0; i < breedMody.temperaments.length; i++) {
      if (breedMody.temperaments[i] === id) {
        breedMody.temperaments.splice(i, 1);
      }
    }
    dispatch(cargar_temperamentos(breedMody.temperaments));
  };
  const handleVerificar = (id) => {
    let ban = false;
    if (breedMody.temperaments.length > 0) {
      breedMody.temperaments.map((select) => {
        if (id === select) {
          ban = true;
        }
      });
    }
    return ban;
  };
  const handleTemperament = (e) => {
    const { id } = e.target;
    breedMody.temperaments.push(id);
    dispatch(cargar_temperamentos(breedMody.temperaments));
  };
  const handleInputChangeSearch = (e) => {
    const { value } = e.target;
    dispatch(getTemperamentsByName(value));
  };
  return (
    <div>
      {console.log(breedMody)}
      <Nav />
      <div className="modify_breeds">
        <h1>Modify Breed</h1>
        <div className="form_modify_breed">
          <div className="inputs_modify">
            <div className="inputs_item">
              <h3 className="input_item_h3">Name:</h3>
              <input
                type="text"
                placeholder={breed.name ? breed.name : ""}
                name="name"
              />
            </div>
            <div className="inputs_item">
              <h3 className="input_item_h3">Heigth:</h3>
              <input
                type="text"
                placeholder={`${height.height1}`}
                name="heigth1"
              />
              <h3>-</h3>
              <input
                type="text"
                placeholder={`${height.height2}`}
                name="heigth2"
              />
            </div>
            <div className="inputs_item">
              <h3 className="input_item_h3">Weigth:</h3>
              <input
                type="text"
                name="weigth1"
                placeholder={`${weight.weight1}`}
              />
              <h3>-</h3>
              <input
                type="text"
                name="weigth2"
                placeholder={`${weight.weight2}`}
              />
            </div>
            <div className="inputs_item">
              <h3 className="input_item_h3">Life_span:</h3>
              <input
                type="text"
                name="life_span1"
                placeholder={`${life_span.life_span1}`}
              />
              <h3>-</h3>
              <input
                type="text"
                name="life_span2"
                placeholder={`${life_span.life_span2}`}
              />
            </div>
            <div className="inputs_item">
              <h3 className="input_item_h3">Url Image:</h3>
              <input
                type="text"
                name="image"
                placeholder={breed.image ? breed.image : ""}
              />
            </div>
          </div>
          <div className="panel_temperaments">
            <div className="inputs_item">
              <h3 className="textCreate">Nombre:</h3>
              <input
                type={"text"}
                placeholder="Temperament..."
                name="name"
                onChange={handleInputChangeSearch}
              />
            </div>
            <div className="table_temperaments">
              {temperaments_search.map((temperament) => {
                return (
                  <React.Fragment key={temperament.id}>
                    {breedMody.temperaments.map((select) => {
                      return (
                        <React.Fragment key={select}>
                          {select === temperament.id && (
                            <div className="label_table_sel">
                              <label
                                id={temperament.id}
                                onClick={handleTemperamentDeseleccionar}
                              >
                                {temperament.name}
                              </label>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                    {handleVerificar(temperament.id) === false && (
                      <div className="label_table">
                        <label id={temperament.id} onClick={handleTemperament}>
                          {temperament.name}
                        </label>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
        <div className="group_btn">
          <button>Modify</button>
        </div>
      </div>
    </div>
  );
};
