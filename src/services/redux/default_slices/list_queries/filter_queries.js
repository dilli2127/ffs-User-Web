import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter_queries: {},
};

const slice = createSlice({
  name: "filterQueries",
  initialState,
  reducers: {
    _set_filter_query: (state, { payload }) => {
      state.filter_queries = payload;
    },
    _set_filter_query_reset: (state) => {
      state.filter_queries = {};
    },
  },
});

const { _set_filter_query, _set_filter_query_reset } = slice.actions;

export const filterQueriesSelector = (state) => state.filterQueries;

export const filterQueriesReducer = slice.reducer;

export function set_filter_query(query) {
  return async (dispatch) => {
    dispatch(_set_filter_query(query));
  };
}
export function reset_filter_query() {
  return async (dispatch) => {
    dispatch(_set_filter_query_reset());
  };
}
