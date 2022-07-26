const initialState = {
  country: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 1:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
