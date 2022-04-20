import produce from "immer";

import { UPDATE_USER } from "../actions/updateUser";

const initialState = {};

const updateUserReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UPDATE_USER._SUCCESS: {
        const { data } = action;

        draft.user = { ...data.user };
        draft.success = data.success;
        draft.updateUserError = false;
        break;
      }
      case UPDATE_USER._ERROR: {
        draft.updateUserError = action.error.response.data.message;
        draft.success = false

        break;
      }

      default:
        return state;
    }
    return draft;
  });

export default updateUserReducer;
