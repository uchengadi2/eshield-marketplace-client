import _ from "lodash";
import {
  CREATE_CLUSTER,
  FETCH_CLUSTERS,
  FETCH_CLUSTER,
  DELETE_CLUSTER,
  EDIT_CLUSTER,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_CLUSTERS:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_CLUSTER:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_CLUSTER:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_CLUSTER:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_CLUSTER:
      return _.omit(state, action.payload); //note that payload is just the cluster id
    default:
      return state;
  }
};
