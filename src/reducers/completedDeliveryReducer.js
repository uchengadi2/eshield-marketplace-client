import _ from "lodash";
import {
  FETCH_COMPLETEDDELIVERIES,
  FETCH_COMPLETEDDELIVERY,
  EDIT_COMPLETEDDELIVERY,
  DELETE_COMPLETEDDELIVERY,
  CREATE_COMPLETEDDELIVERY,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_COMPLETEDDELIVERIES:
      //console.log("this state is:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_COMPLETEDDELIVERY:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_COMPLETEDDELIVERY:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_COMPLETEDDELIVERY:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_COMPLETEDDELIVERY:
      return _.omit(state, action.payload); //note that payload is just the policy id
    default:
      return state;
  }
};
