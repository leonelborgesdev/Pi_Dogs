import {
  GET_ALL_BREEDS,
  GET_BREED_BY_ID,
  GET_ALL_TEMPERAMENTS,
  CARGAR_TEMEPERAMENTOS,
  GET_BREEDS_BY_NAME,
  GET_BREEDS_BY_TEMPERAMENT,
  ORDENAMIENTO_ALFABETICO,
  GET_PAGES,
  CHANGE_PAGE,
  GET_TEMPERAMENTS_BY_NAME,
} from "./types";

const api = "http://localhost:3001";

export const get_all_breeds = () => {
  return async function (dispatch) {
    const response = await fetch(`${api}/breeds`);
    if (response) {
      const date = await response.json();
      dispatch({
        type: GET_ALL_BREEDS,
        payload: date,
      });
    }
  };
};

export const getBreedById = (idBreed) => {
  return async function (dispatch) {
    const response = await fetch(`${api}/breeds/${idBreed}`);
    try {
      if (response) {
        const date = await response.json();
        dispatch({
          type: GET_BREED_BY_ID,
          payload: date,
          payloadLabelSelect: date.temperaments,
        });
      }
    } catch (error) {
      console.log(error);
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

export const getTemperamentsByName = (name) => {
  return async function (dispatch) {
    const response = await fetch(`${api}/temperaments?name=${name}`);
    if (response) {
      const date = await response.json();
      dispatch({
        type: GET_TEMPERAMENTS_BY_NAME,
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

export const getBreedByName = (name) => {
  return async function (dispatch) {
    const response = await fetch(`${api}/breeds?name=${name}`);
    if (response) {
      const data = await response.json();
      dispatch({
        type: GET_BREEDS_BY_NAME,
        payload: data,
      });
    }
  };
};
export const getBreedByTemperament = (Breeds, Temperament) => {
  const verificar = (Breed) => {
    const BreedTemperament = Breed.temperaments.filter(
      (temperamentos) => temperamentos.name === Temperament
    );
    if (BreedTemperament.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  const filterBreeds = Breeds.filter((Breed) => verificar(Breed) === true);
  return {
    type: GET_BREEDS_BY_TEMPERAMENT,
    payload: filterBreeds,
  };
};
export const orderAlphabetic = (asc_desc, column, breeds) => {
  let orderBreeds;
  if (asc_desc) {
    orderBreeds = breeds.sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] < b[column]) return 1;
      return 0;
    });
  } else {
    orderBreeds = breeds.sort((a, b) => {
      if (a[column] > b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
  }
  return {
    type: ORDENAMIENTO_ALFABETICO,
    payload: orderBreeds,
  };
};
export const getPages = (page, lim_paginas) => {
  return function (dispatch) {
    if (page) {
      dispatch({
        type: GET_PAGES,
        payload: page,
        limite: lim_paginas,
      });
    }
  };
};
export const changePage = (Page, adelante, atras) => {
  return function (dispatch) {
    if (Page === "adelante") {
      dispatch({
        type: CHANGE_PAGE,
        payload: adelante + 1,
        payload2: atras + 1,
      });
    } else {
      dispatch({
        type: CHANGE_PAGE,
        payload: adelante - 1,
        payload2: atras - 1,
      });
    }
  };
};
export const addBreed = (breed) => {
  console.log(breed);
  return async function () {
    const response = await fetch(`${api}/breeds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(breed),
    });
    return response.json();
  };
};
export const modifyBreed = (breed) => {
  return async function () {
    const response = await fetch(`${api}/breeds/${breed.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(breed),
    });
    return response.json();
  };
};
