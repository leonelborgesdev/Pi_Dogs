import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { addTemperament, getAllTemperaments } from "../../redux/actions";
import Nav from "../Nav/Nav";
import "./CreateTemperament.css";

export const CreateTemperament = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTemperaments());
  }, []);
  const [temperament, setTemperament] = useState({ id: v4(), name: "" });
  const handleChange = (e) => {
    const { value } = e.target;
    setTemperament({
      ...temperament,
      ["name"]: value,
    });
  };
  const handleCreateTemperament = () => {
    dispatch(addTemperament(temperament));
    navigate(`/createBreeds`);
  };
  return (
    <div>
      <Nav />
      <div className="create_temperaments">
        <div className="form_temperament">
          <h1>Create Temperament</h1>
          <div className="form_text">
            <input type="text" required="required" onChange={handleChange} />
            <span>Nombre</span>
          </div>
          <div className="group_btn">
            <button onClick={handleCreateTemperament}>Crear</button>
            <button
              onClick={() => {
                navigate(`/createBreeds`);
              }}
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
