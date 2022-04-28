import {
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_RESET
} from "../constants";


export const signupReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { ...state, loading: true };
    case USER_SIGNUP_SUCCESS:
      return { loading: false, userSignedin: action.payload }
    case USER_SIGNUP_FAIL:
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
      if (action.payload.hasOwnProperty("name")) {
        errorState.nameError = action.payload["name"];
      }
      if (action.payload.hasOwnProperty("gender")) {
        errorState.genderError = action.payload["gender"];
      }
      if (action.payload.hasOwnProperty("dob")) {
        errorState.dobError = action.payload["dob"];
      }
      if (action.payload.hasOwnProperty("role")) {
        errorState.roleError = action.payload["role"];
      }
      if (action.payload.hasOwnProperty("non_field_errors")) {
        errorState.fieldErrors = action.payload["non_field_errors"];
      }
      return { loading: false, error: errorState }
    case USER_SIGNUP_RESET:
        return {}
    default:
      return state;
  }
};
