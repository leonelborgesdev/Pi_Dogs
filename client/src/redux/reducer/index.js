import {
  GET_ALL_BREEDS,
  GET_ALL_TEMPERAMENTS,
  GET_BREED_BY_ID,
  CARGAR_TEMEPERAMENTOS,
  GET_BREEDS_BY_NAME,
  GET_BREEDS_BY_TEMPERAMENT,
  ORDENAMIENTO_ALFABETICO,
  GET_PAGES,
  CHANGE_PAGE,
  GET_TEMPERAMENTS_BY_NAME,
  MESSAGE_CONFIRM,
} from "../actions/types";
const initialState = {
  breeds: [],
  breedsTable: [],
  breed: {},
  message: "",
  temperaments: [],
  temperaments_search: [],
  labelSelect: [],

  lim_paginas: 8,
  pagina: 1,
  atras: 0,
  adelante: 3,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BREEDS:
      return {
        ...state,
        breeds: action.payload,
        breedsTable: action.payload,
        pagina: 1,
        atras: 0,
        adelante: 3,
      };
    case GET_BREED_BY_ID:
      return {
        ...state,
        breed: action.payload,
        labelSelect: action.payloadLabelSelect,
      };
    case GET_ALL_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
        temperaments_search: action.payload,
      };
    case GET_TEMPERAMENTS_BY_NAME:
      return {
        ...state,
        temperaments_search: action.payload,
      };
    case CARGAR_TEMEPERAMENTOS:
      return {
        ...state,
        labelSelect: action.payload,
      };
    case GET_BREEDS_BY_NAME:
      return {
        ...state,
        breeds: action.payload,
      };
    case GET_BREEDS_BY_TEMPERAMENT:
      return {
        ...state,
        breeds: action.payload,
        pagina: 1,
      };
    case ORDENAMIENTO_ALFABETICO:
      return {
        ...state,
        breeds: action.payload,
      };
    case GET_PAGES:
      return {
        ...state,
        pagina: action.payload,
        lim_paginas: action.limite,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        adelante: action.payload,
        atras: action.payload2,
      };
    case MESSAGE_CONFIRM:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
