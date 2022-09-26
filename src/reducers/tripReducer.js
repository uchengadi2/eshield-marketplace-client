import _ from "lodash";
import {
  FETCH_TRIP,
  FETCH_TRIPS,
  EDIT_TRIP,
  DELETE_TRIP,
  CREATE_TRIP,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TRIPS:
      //console.log("this state is:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_TRIP:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_TRIP:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_TRIP:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_TRIP:
      return _.omit(state, action.payload); //note that payload is just the city id
    default:
      return state;
  }
};
