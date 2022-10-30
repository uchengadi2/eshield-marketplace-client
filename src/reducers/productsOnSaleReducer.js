import _ from "lodash";
import {
  FETCH_PRODUCTONSSALE,
  FETCH_PRODUCTONSALE,
  EDIT_PRODUCTONSALE,
  DELETE_PRODUCTONSALE,
  CREATE_PRODUCTONSALE,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTONSSALE:
      //console.log("this state is:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_PRODUCTONSALE:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_PRODUCTONSALE:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_PRODUCTONSALE:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_PRODUCTONSALE:
      return _.omit(state, action.payload); //note that payload is just the product id
    default:
      return state;
  }
};
