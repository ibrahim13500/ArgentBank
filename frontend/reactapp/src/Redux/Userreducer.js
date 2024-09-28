import { GET_USERPROFILE, LOGOUT, EDIT_USERNAME } from "./Useraction.js";

/* Initial user state */
const initialState = {
  status: "VOID",
  userData: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERPROFILE:
      return {
        ...state,
        status: "SUCCEEDED",
        userData: action.payload,
      };

    case LOGOUT: {
      return initialState;
    }
    case EDIT_USERNAME:
      return {
        ...state,
        status: "MODIFIED",
        userData: {
          ...state.userData,
          username: action.payload,
        },
      };

    default:
      return state;
  }
};