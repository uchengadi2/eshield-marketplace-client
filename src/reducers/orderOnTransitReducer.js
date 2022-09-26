import _ from "lodash";
import {
  FETCH_ONTRANSIT_ORDERS,
  FETCH_ONTRANSIT_ORDER,
  EDIT_ONTRANSIT_ORDER,
  DELETE_ONTRANSIT_ORDER,
  CREATE_ONTRANSIT_ORDER,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    // case FETCH_ORDERS:
    //   //console.log("this state is:", state);
    //   return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_ONTRANSIT_ORDERS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_ONTRANSIT_ORDER:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_ONTRANSIT_ORDER:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_ONTRANSIT_ORDER:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_ONTRANSIT_ORDER:
      return _.omit(state, action.payload); //note that payload is just the city id
    default:
      return state;
  }
};
