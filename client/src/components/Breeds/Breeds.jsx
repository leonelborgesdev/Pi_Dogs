import React, { useEffect } from "react";
import Nav from "../Nav/Nav";
import { get_all_breeds } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { CardBreed } from "../Cards/CardBreed";
import "./Breeds.css";

const Breeds = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_all_breeds());
  }, []);
  const { breeds } = useSelector((state) => state);
  return (
    <div>
      <Nav />
      <h1>Breeds</h1>
      <div className="cards">
        {breeds.map((breed) => {
          return (
            <div key={breed.id}>
              <CardBreed breed={breed} />
              {/* {breed.name} */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Breeds;
