import produce from "immer";
import { getRightDate } from "../../utils/getRightDate";
import { LOGIN } from "../actions/login";

const initialState = {
  
};

const loginReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOGIN._SUCCESS: {
        console.log("action.type", action);
        const { data } = action;

        draft.user = { ...data.user };
        draft.success = data.user ? true : false;
        draft.loginError = false
        break;
      }
      case LOGIN._ERROR: {
        console.log("action.type", action);
        draft.loginError = action.error.response.data;
        draft.success = false
        break;
      }

      default:
        return state;
    }
    return draft;
  });

export default loginReducer;
