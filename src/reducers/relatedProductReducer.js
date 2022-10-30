import _ from "lodash";
import {
  FETCH_RELATEDPRODUCTS,
  FETCH_RELATEDPRODUCT,
  EDIT_RELATEDPRODUCT,
  DELETE_RELATEDPRODUCT,
  CREATE_RELATEDPRODUCT,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_RELATEDPRODUCTS:
      //console.log("this state is:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_RELATEDPRODUCT:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_RELATEDPRODUCT:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_RELATEDPRODUCT:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_RELATEDPRODUCT:
      return _.omit(state, action.payload); //note that payload is just the product id
    default:
      return state;
  }
};
