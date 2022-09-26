import _ from "lodash";
import {
  CREATE_CURRENCY,
  FETCH_CURRENCIES,
  FETCH_CURRENCY,
  DELETE_CURRENCY,
  EDIT_CURRENCY,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_CURRENCIES:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_CURRENCY:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_CURRENCY:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_CURRENCY:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_CURRENCY:
      return _.omit(state, action.payload); //note that payload is just the currency id
    default:
      return state;
  }
};
