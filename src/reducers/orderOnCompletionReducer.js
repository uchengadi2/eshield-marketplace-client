import _ from "lodash";
import {
  FETCH_COMPLETED_ORDERS,
  FETCH_COMPLETED_ORDER,
  EDIT_COMPLETED_ORDER,
  DELETE_COMPLETED_ORDER,
  CREATE_COMPLETED_ORDER,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    // case FETCH_ORDERS:
    //   //console.log("this state is:", state);
    //   return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_COMPLETED_ORDERS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_COMPLETED_ORDER:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_COMPLETED_ORDER:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_COMPLETED_ORDER:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_COMPLETED_ORDER:
      return _.omit(state, action.payload); //note that payload is just the city id
    default:
      return state;
  }
};
