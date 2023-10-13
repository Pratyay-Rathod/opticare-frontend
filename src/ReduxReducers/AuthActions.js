import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./AuthTypes";

export const loginSuccess = (Uid) => {
    return {
        type: LOGIN_SUCCESS,
        payload: Uid,
    };
};

export const loginFailure = () => {
    return {
        type: LOGIN_FAILURE,
    };
};

export const logout = () => {
    return {
        type: LOGOUT,
    };
};