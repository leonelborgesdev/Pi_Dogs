import React from "react";
import { useNavigate } from "react-router-dom";
import Confir from "../../assets/Confir.gif";

export const Confirmation = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Confirmation</h1>
      <img src={Confir} />
      <div className="group_btn">
        <button
          onClick={() => {
            navigate("/breeds");
          }}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};
