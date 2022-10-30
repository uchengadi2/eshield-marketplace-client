import _ from "lodash";
import {
  FETCH_REJECTEDORDERS,
  FETCH_REJECTEDORDER,
  EDIT_REJECTEDORDER,
  DELETE_REJECTEDORDER,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_REJECTEDORDERS:
      //console.log("this state is:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_REJECTEDORDER:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_REJECTEDORDER:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_REJECTEDORDER:
      return _.omit(state, action.payload); //note that payload is just the product id
    default:
      return state;
  }
};
