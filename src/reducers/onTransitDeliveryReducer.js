import _ from "lodash";
import {
  FETCH_ONTRANSITDELIVERIES,
  FETCH_ONTRANSITDELIVERY,
  EDIT_ONTRANSITDELIVERY,
  DELETE_ONTRANSITDELIVERY,
  CREATE_ONTRANSITDELIVERY,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ONTRANSITDELIVERIES:
      //console.log("this state is:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_ONTRANSITDELIVERY:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_ONTRANSITDELIVERY:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_ONTRANSITDELIVERY:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_ONTRANSITDELIVERY:
      return _.omit(state, action.payload); //note that payload is just the policy id
    default:
      return state;
  }
};
