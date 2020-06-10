import axios from "axios";
import { FETCH_USER, LOGOUT_USER } from "./types";

// Fetch user
export const fetchUser = () => async (dispatch) => {
  try {
    const resp = await axios.get("/api/current_user");
    dispatch({
      type: FETCH_USER,
      payload: resp.data,
    });
  } catch (error) {
    console.error(error);
  }
};

// Logout user
export const logoutUser = () => async (dispatch) => {
  try {
    const resp = await axios.get("/api/logout");
    console.log(resp.data);
    dispatch({
      type: LOGOUT_USER,
      payload: resp.data,
    });
  } catch (error) {
    console.error(error);
  }
};
