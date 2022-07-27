import React, { useEffect } from "react";
import Nav from "../Nav/Nav";
import { get_all_breeds } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { CardBreed } from "../Cards/CardBreed";
import "./Breeds.css";
import { Link } from "react-router-dom";

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
              <Link to={`/breedDetail/${breed.id}`}>
                <CardBreed breed={breed} />
              </Link>
              {/* {breed.name} */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Breeds;
