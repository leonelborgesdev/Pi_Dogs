import { GET_ALL_BREEDS } from "./types";

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
