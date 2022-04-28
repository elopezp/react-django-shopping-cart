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

const INITIAL_STATE_USER_TOKEN = {
  isAuthenticated: false,
  token: "",
  userInfo: null,
};

export const userTokenReducer = (state = INITIAL_STATE_USER_TOKEN, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        userInfo: action.payload
      };
    case UNSET_CURRENT_USER:
      return INITIAL_STATE_USER_TOKEN;

    default:
      return state
  }
}


const INITIAL_STATE_USER_LOGIN = {
  token: {},
  error: {},
  loading: false,
};

export const userLoginReducer = (state = INITIAL_STATE_USER_LOGIN, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case USER_LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          token: action.payload
        }
      case USER_LOGIN_FAIL:
        const errorState = {
          emailError: "",
          passwordError: "",
          nameError: "",
          genderError: "",
          dobError: "",
        };
        if (action.payload.hasOwnProperty("email")) {
          errorState.emailError = action.payload["email"];
        }
        if (action.payload.hasOwnProperty("password")) {
          errorState.passwordError = action.payload["password"];
        }
        if (action.payload.hasOwnProperty("non_field_errors")) {
          errorState.fieldErrors = action.payload["non_field_errors"];
        }

        return { ...state, loading: false, error: errorState }
    case USER_LOGOUT:
      return INITIAL_STATE_USER_LOGIN
    default:
      return state;
  }
};


export const userMeReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ME_REQUEST:
      return { loading: true };
    case USER_ME_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_ME_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
};