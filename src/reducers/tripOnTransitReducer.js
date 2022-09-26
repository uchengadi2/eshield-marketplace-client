import _ from "lodash";
import {
  FETCH_ONTRANSIT_TRIP,
  FETCH_ONTRANSIT_TRIPS,
  EDIT_ONTRANSIT_TRIP,
  DELETE_ONTRANSIT_TRIP,
  CREATE_ONTRANSIT_TRIP,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ONTRANSIT_TRIPS:
      console.log("this state isiiii:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_ONTRANSIT_TRIP:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_ONTRANSIT_TRIP:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_ONTRANSIT_TRIP:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_ONTRANSIT_TRIP:
      return _.omit(state, action.payload); //note that payload is just the city id
    default:
      return state;
  }
};
