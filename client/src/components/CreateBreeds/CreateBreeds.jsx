import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTemperaments,
  cargar_temperamentos,
  addBreed,
} from "../../redux/actions";
import { v4 } from "uuid";
import Nav from "../Nav/Nav";
import "./CreateBreeds.css";
import { useNavigate } from "react-router-dom";

const CreateBreeds = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllTemperaments());
  }, []);
  //   const { temperaments, labelSelect } = useSelector((state) => state);
  const { temperaments } = useSelector((state) => state);
  const [breed, setBreed] = useState({
    id: v4(),
    name: "",
    height: "",
    weight: "",
    life_span: "",
    temperaments: [],
  });
  const handleTemperament = (e) => {
    const { id } = e.target;
    breed.temperaments.push(id);
    dispatch(cargar_temperamentos(breed.temperaments));
  };
  const handleTemperamentDeseleccionar = (e) => {
    const { id } = e.target;
    for (let i = 0; i < breed.temperaments.length; i++) {
      if (breed.temperaments[i] === id) {
        breed.temperaments.splice(i, 1);
      }
    }
    dispatch(cargar_temperamentos(breed.temperaments));
  };
  const handleVerificar = (id) => {
    let ban = false;
    if (breed.temperaments.length > 0) {
      breed.temperaments.map((select) => {
        if (id === select) {
          ban = true;
        }
      });
    }
    return ban;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBreed({
      ...breed,
      [name]: value,
    });
  };
  const handleCreateBreed = () => {
    console.log(breed);
    dispatch(addBreed(breed));
    dispatch(cargar_temperamentos([]));
    navigate("/breeds");
  };
  return (
    <div>
      <Nav />
      <div className="create_breeds">
        <h1>Create Breeds</h1>
        <div className="form_create">
          <div className="container_create">
            <div className="create_item">
              <h3>Nombre:</h3>
              <input
                type={"text"}
                placeholder="Name..."
                name="name"
                onChange={handleInputChange}
              />
            </div>
            <div className="create_item">
              <h3>Altura:</h3>
              <input
                type={"text"}
                placeholder="64 - 69"
                name="height"
                onChange={handleInputChange}
              />
            </div>
            <div className="create_item">
              <h3>Peso:</h3>
              <input
                type={"text"}
                placeholder="23 - 27"
                name="weight"
                onChange={handleInputChange}
              />
            </div>
            <div className="create_item">
              <h3>Años:</h3>
              <input
                type={"text"}
                placeholder="10 - 13"
                name="life_span"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="table_temperaments">
            {temperaments.map((temperament) => {
              return (
                <React.Fragment key={temperament.id}>
                  {breed.temperaments.map((select) => {
                    return (
                      <React.Fragment key={select}>
                        {select === temperament.id && (
                          <div className="label_table_sel" key={temperament.id}>
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
                    <div className="label_table" key={temperament.id}>
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
        <button onClick={handleCreateBreed}>Create</button>
      </div>
    </div>
  );
};

export default CreateBreeds;
