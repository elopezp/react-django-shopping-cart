import axios from "axios";
import {
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS
} from "../constants";

export const signupNewUser = userData => async (dispatch) => {
  try {
    dispatch({
      type: USER_SIGNUP_REQUEST
    })

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    const { data } = await axios.post(
      "/api/user/create/",
      userData,
      config
    )

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.response.data,
    })
  }
};
