import { GET_ALL_BREEDS } from "../actions/types";
const initialState = {
  breeds: [],
  breedsTable: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BREEDS:
      return {
        ...state,
        breeds: action.payload,
        breedsTable: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
