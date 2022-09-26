import _ from "lodash";
import {
  FETCH_FULLFILLED_TRIP,
  FETCH_FULLFILLED_TRIPS,
  EDIT_FULLFILLED_TRIP,
  DELETE_FULLFILLED_TRIP,
  CREATE_FULLFILLED_TRIP,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_FULLFILLED_TRIPS:
      // console.log("this state isiiii:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_FULLFILLED_TRIP:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_FULLFILLED_TRIP:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_FULLFILLED_TRIP:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_FULLFILLED_TRIP:
      return _.omit(state, action.payload); //note that payload is just the city id
    default:
      return state;
  }
};
