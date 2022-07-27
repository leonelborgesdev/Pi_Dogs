import React, { useEffect } from "react";
import Nav from "../Nav/Nav";
import { get_all_breeds } from "../../redux/actions/index";
import { useDispatch } from "react-redux";

const Breeds = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_all_breeds());
  }, []);
  return (
    <div>
      <Nav />
      <h1>Breeds</h1>
    </div>
  );
};

export default Breeds;
