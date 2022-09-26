import _ from "lodash";
import {
  //   FETCH_ORDER,
  FETCH_ASSIGNED_ORDERS,
  FETCH_ASSIGNED_ORDER,
  EDIT_ASSIGNED_ORDER,
  DELETE_ASSIGNED_ORDER,
  CREATE_ASSIGNED_ORDER,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    // case FETCH_ORDERS:
    //   //console.log("this state is:", state);
    //   return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_ASSIGNED_ORDERS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_ASSIGNED_ORDER:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_ASSIGNED_ORDER:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_ASSIGNED_ORDER:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_ASSIGNED_ORDER:
      return _.omit(state, action.payload); //note that payload is just the city id
    default:
      return state;
  }
};
