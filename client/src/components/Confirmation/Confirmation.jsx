import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Confir from "../../assets/Confir.gif";
import "./Confirmation.css";

export const Confirmation = () => {
  const navigate = useNavigate();
  const { message } = useSelector((state) => state);
  return (
    <div>
      <h1>Confirmation</h1>
      <img src={Confir} />
      <div className="container_confirm">
        <h3 className="label_h3">{message}</h3>
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
    </div>
  );
};
