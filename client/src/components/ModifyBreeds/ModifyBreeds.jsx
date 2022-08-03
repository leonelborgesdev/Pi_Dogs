import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllTemperaments,
  getBreedById,
  get_all_breeds,
} from "../../redux/actions";
import Nav from "../Nav/Nav";
import "./ModifyBreeds.css";
export const ModifyBreeds = () => {
  const dispatch = useDispatch();
  const IdBreed = useParams();
  useEffect(() => {
    dispatch(getAllTemperaments());
    dispatch(get_all_breeds());
    dispatch(getBreedById(IdBreed));
  }, []);
  const { temperaments_search, breed } = useSelector((state) => state);
  const [labelError, setLabelError] = useState({ label: "" });
  const [breedMody, setBreedMody] = useState({
    id: "",
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "",
    temperaments: [],
  });
  const [height, setHeigth] = useState({ height1: 0, height2: 0 });
  const [weight, setWeigth] = useState({ weight1: 0, weight2: 0 });
  const [life_span, setLife_span] = useState({
    life_span1: "",
    life_span2: "",
  });
  return (
    <div>
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
              <input type="text" name="weigth1" />
              <h3>-</h3>
              <input type="text" name="weigth2" />
            </div>
            <div className="inputs_item">
              <h3 className="input_item_h3">Life_span:</h3>
              <input type="text" name="life_span1" />
              <h3>-</h3>
              <input type="text" name="life_span2" />
            </div>
            <div className="inputs_item">
              <h3 className="input_item_h3">Url Image:</h3>
              <input type="text" name="Image" />
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
