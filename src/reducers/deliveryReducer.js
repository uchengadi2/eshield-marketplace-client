import _ from "lodash";
import {
  FETCH_DELIVERIES,
  FETCH_DELIVERY,
  EDIT_DELIVERY,
  DELETE_DELIVERY,
  CREATE_DELIVERY,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    // case FETCH_ORDERS:
    //   //console.log("this state is:", state);
    //   return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_DELIVERIES:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_DELIVERY:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_DELIVERY:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_DELIVERY:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_DELIVERY:
      return _.omit(state, action.payload); //note that payload is just the city id
    default:
      return state;
  }
};
