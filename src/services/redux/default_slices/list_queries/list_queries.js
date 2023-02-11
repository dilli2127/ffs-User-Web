import { createSlice } from "@reduxjs/toolkit";
import lodash from "lodash";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  list_queries: [],
  update_ref: null,
};

const slice = createSlice({
  name: "listQueries",
  initialState,
  reducers: {
    _set_list_query: (state, { payload }) => {
      let list_queries = JSON.parse(JSON.stringify(state.list_queries));
      let list_query = list_queries.find((x) => x.group === payload.group);
      if (!list_query) {
        list_query = { group: payload.group, query: {}, update_ref: null };
        list_queries.push(list_query);
        list_query = list_queries.find((x) => x.group === payload.group);
      }
      lodash.set(list_query, payload.key, payload.value);
      lodash.set(list_query, "update_ref", uuidv4());
      state.list_queries = list_queries;
      state.update_ref = uuidv4();
    },
  },
});

const { _set_list_query } = slice.actions;

export const listQueriesSelector = (state) => state.listQueries;

export const listQueriesReducer = slice.reducer;

export function set_list_query(group, key, value) {
  return async (dispatch) => {
    dispatch(_set_list_query({ group, key, value }));
  };
}
