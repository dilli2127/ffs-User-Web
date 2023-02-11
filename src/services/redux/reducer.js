import { combineReducers } from "redux";
import { dynamicReducers } from "./slices/dynamic_entity";
import { accordionsReducer } from "./default_slices/accordions";
import { listQueriesReducer } from "./default_slices/list_queries";

export const rootReducer = combineReducers({
  ...dynamicReducers,
  ...accordionsReducer,
  ...listQueriesReducer,
});
