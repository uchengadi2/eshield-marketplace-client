import _ from "lodash";
import {
  FETCH_PARTIAL_REMITTANCE,
  FETCH_PARTIAL_REMITTANCES,
  EDIT_PARTIAL_REMITTANCE,
  DELETE_PARTIAL_REMITTANCE,
  PROCESS_PARTIAL_REMITTANCE,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PARTIAL_REMITTANCES:
      //console.log("this state is:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_PARTIAL_REMITTANCE:
      return { ...state, [action.payload.id]: action.payload };
    case PROCESS_PARTIAL_REMITTANCE:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_PARTIAL_REMITTANCE:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_PARTIAL_REMITTANCE:
      return _.omit(state, action.payload); //note that payload is just the payment id
    default:
      return state;
  }
};
