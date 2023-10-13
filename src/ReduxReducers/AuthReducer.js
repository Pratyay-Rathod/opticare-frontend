// authReducer.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './AuthTypes';

const initialState = {
  isAuthenticated: false,
  Uid: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        Uid: action.payload,
      };
    case "LOGIN_FAILURE":
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        Uid: null,
      };
    default:
      return state;
  }
};

export default authReducer;
