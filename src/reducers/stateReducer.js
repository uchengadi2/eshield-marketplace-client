import _ from "lodash";
import {
  CREATE_STATE,
  FETCH_STATES,
  FETCH_STATE,
  DELETE_STATE,
  EDIT_STATE,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STATES:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_STATE:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STATE:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STATE:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STATE:
      return _.omit(state, action.payload); //note that payload is just the state id
    default:
      return state;
  }
};
