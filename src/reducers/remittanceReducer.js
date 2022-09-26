import _ from "lodash";
import {
  FETCH_REMITTANCE,
  FETCH_REMITTANCES,
  EDIT_REMITTANCE,
  DELETE_REMITTANCE,
  PROCESS_REMITTANCE,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_REMITTANCES:
      //console.log("this state is:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_REMITTANCE:
      return { ...state, [action.payload.id]: action.payload };
    case PROCESS_REMITTANCE:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_REMITTANCE:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_REMITTANCE:
      return _.omit(state, action.payload); //note that payload is just the payment id
    default:
      return state;
  }
};
