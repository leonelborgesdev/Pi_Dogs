import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTemperaments, cargar_temperamentos } from "../../redux/actions";
import Nav from "../Nav/Nav";
import "./CreateBreeds.css";

const CreateBreeds = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTemperaments());
  }, []);
  const { temperaments, labelSelect } = useSelector((state) => state);
  const handleTemperament = (e) => {
    const { id } = e.target;
    labelSelect.push(id);
    dispatch(cargar_temperamentos(labelSelect));
  };
  const handleTemperamentDeseleccionar = (e) => {
    const { id } = e.target;
    console.log("labelselect", labelSelect);
    for (let i = 0; i < labelSelect.length; i++) {
      if (labelSelect[i] === id) {
        labelSelect.splice(i, 1);
      }
    }
    dispatch(cargar_temperamentos(labelSelect));
  };
  const handleVerificar = (id) => {
    let ban = false;
    if (labelSelect.length > 0) {
      labelSelect.map((select) => {
        if (id === select) {
          ban = true;
        }
      });
    }
    return ban;
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
              <input type={"text"} placeholder="Name..." />
            </div>
            <div className="create_item">
              <h3>Altura:</h3>
              <input type={"text"} placeholder="64 - 69" />
            </div>
            <div className="create_item">
              <h3>Peso:</h3>
              <input type={"text"} placeholder="23 - 27" />
            </div>
            <div className="create_item">
              <h3>Años:</h3>
              <input type={"text"} placeholder="10 - 13" />
            </div>
          </div>
          <div className="table_temperaments">
            {temperaments.map((temperament) => {
              return (
                <React.Fragment key={temperament.id}>
                  {labelSelect.map((select) => {
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
        <button>Create</button>
      </div>
    </div>
  );
};

export default CreateBreeds;
