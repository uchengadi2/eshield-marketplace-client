import _ from "lodash";
import {
  FETCH_RETURNDELIVERIES,
  FETCH_RETURNDELIVERY,
  EDIT_RETURNDELIVERY,
  DELETE_RETURNDELIVERY,
  CREATE_RETURNDELIVERY,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_RETURNDELIVERIES:
      //console.log("this state is:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_RETURNDELIVERY:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_RETURNDELIVERY:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_RETURNDELIVERY:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_RETURNDELIVERY:
      return _.omit(state, action.payload); //note that payload is just the policy id
    default:
      return state;
  }
};
