import {
  GET_ALL_BREEDS,
  GET_BREED_BY_ID,
  GET_ALL_TEMPERAMENTS,
  CARGAR_TEMEPERAMENTOS,
} from "./types";

const api = "http://localhost:3001";

export const get_all_breeds = () => {
  return async function (dispatch) {
    const response = await fetch(`${api}/breeds`);
    if (response) {
      const date = await response.json();
      console.log(date);
      dispatch({
        type: GET_ALL_BREEDS,
        payload: date,
      });
    }
  };
};

export const getBreedById = (idBreed) => {
  return async function (dispatch) {
    const response = await fetch(`${api}/breed/${idBreed}`);
    if (response) {
      const date = await response.json();
      dispatch({
        type: GET_BREED_BY_ID,
        payload: date,
      });
    }
  };
};

export const getAllTemperaments = () => {
  return async function (dispatch) {
    const response = await fetch(`${api}/temperaments`);
    if (response) {
      const date = await response.json();
      dispatch({
        type: GET_ALL_TEMPERAMENTS,
        payload: date,
      });
    }
  };
};

export const cargar_temperamentos = (temperamentos) => {
  return function (dispatch) {
    dispatch({
      type: CARGAR_TEMEPERAMENTOS,
      payload: temperamentos,
    });
  };
};
