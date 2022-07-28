import {
  GET_ALL_BREEDS,
  GET_ALL_TEMPERAMENTS,
  GET_BREED_BY_ID,
  CARGAR_TEMEPERAMENTOS,
} from "../actions/types";
const initialState = {
  breeds: [],
  breedsTable: [],
  breed: {},
  temperaments: [],
  labelSelect: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BREEDS:
      return {
        ...state,
        breeds: action.payload,
        breedsTable: action.payload,
      };
    case GET_BREED_BY_ID:
      return {
        ...state,
        breed: action.payload,
      };
    case GET_ALL_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case CARGAR_TEMEPERAMENTOS:
      return {
        ...state,
        labelSelect: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
