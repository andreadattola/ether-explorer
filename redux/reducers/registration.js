import produce from "immer";
import { REGISTRATION } from "../actions/registration";

const initialState = {};

const registrationReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REGISTRATION._SUCCESS: {
        const { data } = action;

        draft.user = { ...data.user };
        draft.success = data.user? true : false;
        draft.registrationError = false;
        break;
      }
      case REGISTRATION._ERROR: {
        draft.registrationError = action.error.response.data
        draft.success = false

        break;
      }

      default:
        return state;
    }
    return draft;
  });

export default registrationReducer;
