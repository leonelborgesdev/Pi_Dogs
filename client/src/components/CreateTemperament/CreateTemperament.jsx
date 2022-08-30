import React from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import "./CreateTemperament.css";

export const CreateTemperament = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Nav />
      <div className="create_temperaments">
        <div className="form_temperament">
          <h1>Create Temperament</h1>
          <div className="form_text">
            <input type="text" required="required" />
            <span>Nombre</span>
          </div>
          <div className="group_btn">
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
