import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loaded: false,
      };
    }

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS: {
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loaded: false,
      };
    }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT: {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        loaded: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    }
    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return state;
  }
};
export default AuthReducer;
