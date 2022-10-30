import _ from "lodash";
import {
  FETCH_ORDERSFORDELIVERY,
  FETCH_ORDERFORDELIVERY,
  EDIT_ORDERFORDELIVERY,
  DELETE_ORDERFORDELIVERY,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ORDERSFORDELIVERY:
      //console.log("this state is:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_ORDERFORDELIVERY:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_ORDERFORDELIVERY:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_ORDERFORDELIVERY:
      return _.omit(state, action.payload); //note that payload is just the product id
    default:
      return state;
  }
};
