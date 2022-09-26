import _ from "lodash";
import {
  FETCH_COMPLETE_REMITTANCE,
  FETCH_COMPLETE_REMITTANCES,
  EDIT_COMPLETE_REMITTANCE,
  DELETE_COMPLETE_REMITTANCE,
  PROCESS_COMPLETE_REMITTANCE,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_COMPLETE_REMITTANCES:
      //console.log("this state is:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_COMPLETE_REMITTANCE:
      return { ...state, [action.payload.id]: action.payload };
    case PROCESS_COMPLETE_REMITTANCE:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_COMPLETE_REMITTANCE:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_COMPLETE_REMITTANCE:
      return _.omit(state, action.payload); //note that payload is just the payment id
    default:
      return state;
  }
};
