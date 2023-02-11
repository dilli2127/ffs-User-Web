import { filterQueriesReducer as _filterQueriesReducer } from "./filter_queries";
import { listQueriesReducer as _listQueriesReducer } from "./list_queries";

export const listQueriesReducer = {
  filterQueries: _filterQueriesReducer,
  listQueries: _listQueriesReducer,
};

export * from "./list_queries";
export * from "./filter_queries";
