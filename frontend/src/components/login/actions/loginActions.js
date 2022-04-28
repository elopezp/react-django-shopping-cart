import axios from "axios";
import {
  SET_TOKEN,
  SET_CURRENT_USER,
  UNSET_CURRENT_USER,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,

  USER_ME_REQUEST,
  USER_ME_SUCCESS,
  USER_ME_FAIL,
  USER_LOGOUT,

} from "../constants";
import { setAxiosAuthToken } from "../../../utils/Utils";
import { CART_CLEAR_ITEMS } from "../../cart/constants"
import { USER_SIGNUP_RESET } from "../../signup/constants";

export const login = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    const { data } = await axios.post(
      '/api/user/token/',
      userData,
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })
    const { token } = data;
    if (token) {
      dispatch(setToken(token));
    }

  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.response.data,
    })
    
  }
}

export const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_ME_REQUEST
    })
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const { data } = await axios.get(
      "/api/user/me/",
      config
    )
    const user = {
      name: data.name,
      email: data.email,
      role: data.role
    };
    dispatch({
      type: USER_ME_SUCCESS,
      payload: data
    })

    dispatch(setCurrentUser(user));

  } catch (error) {
    dispatch({
      type: USER_ME_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.response.data,
    })
    dispatch(unsetCurrentUser());
  }
};

export const setCurrentUser = (user) => dispatch => {
  localStorage.setItem("userInfo", JSON.stringify(user));
  dispatch({
    type: SET_CURRENT_USER,
    payload: user
  });
};

export const setToken = token => dispatch => {
  setAxiosAuthToken(token);
  localStorage.setItem("token", token);
  dispatch({
    type: SET_TOKEN,
    payload: token
  });
};

export const unsetCurrentUser = () => dispatch => {
  setAxiosAuthToken("");
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  dispatch({
    type: UNSET_CURRENT_USER
  });
  dispatch({
    type: CART_CLEAR_ITEMS,
  })
  dispatch({
    type: USER_SIGNUP_RESET,
  })
  dispatch({
    type: USER_LOGOUT,
  })
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "/api/user/logout/")
    if (data) {
      dispatch(unsetCurrentUser());
    }
  } catch (error) {
    dispatch(unsetCurrentUser());
  }
};
