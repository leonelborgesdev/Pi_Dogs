import { GET_ALL_BREEDS, GET_BREED_BY_ID } from "../actions/types";
const initialState = {
  breeds: [],
  breedsTable: [],
  breed: {},
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
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
