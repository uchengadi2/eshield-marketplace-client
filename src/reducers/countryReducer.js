import _ from "lodash";
import {
  CREATE_COUNTRY,
  FETCH_COUNTRIES,
  FETCH_COUNTRY,
  DELETE_COUNTRY,
  EDIT_COUNTRY,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_COUNTRY:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_COUNTRY:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_COUNTRY:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_COUNTRY:
      return _.omit(state, action.payload); //note that payload is just the country id
    default:
      return state;
  }
};
