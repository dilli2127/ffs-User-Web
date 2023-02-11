import { createSlice, createSelector } from "@reduxjs/toolkit";
import { MutateRequest, QueryRequest } from "@services/apollo/api_service";

const initialState = {
  data: {},
  loading: false,
};

const slice = createSlice({
  name: "dynamicRequest",
  initialState,
  reducers: {
    _intiateDynamicRequest: (state, { payload: { keys } }) => {
      keys.map((item) => {
        if (item.key === "reload") {
          if (item.loading) {
            state.loading = true;
          }
        } else if (item.appending) {
          if (item.loading) {
            if (state.data[item.key]) {
              state.data[item.key].loading = item.loading;
            } else {
              state.data[item.key] = {
                loading: item.loading,
              };
            }
          }
        } else if (item.loading) {
          state.data[item.key] = {
            loading: item.loading ? item.loading : true,
          };
        }
      });
    },
    _dynamicRequestResponse: (state, { payload: { keys, data } }) => {
      Object.keys(data).forEach(function (key) {
        let _key = keys?.find((x) => x.key === key);
        let item = data[key];
        let item_json = state.data[key] ? state.data[key] : {};
        Object.keys(item).forEach(function (item_key) {
          if (_key?.append_keys?.indexOf(item_key) > -1) {
            if (!item_json[item_key]) {
              item_json[item_key] = [];
            }
            item_json[item_key] = item_json[item_key].concat(item[item_key]);
          } else {
            item_json[item_key] = item[item_key];
          }
        });
        state.data[key] = {
          ...item_json,
          loading: false,
        };
      });
      state.loading = false;
    },
    _dynamicRequestFailure: (state, { payload: { keys, error } }) => {
      keys.map((item) => {
        state.data[item.key] = {
          loading: false,
          status: "failure",
          error: error,
        };
      });
      state.loading = false;
    },
    _setState: (state, { payload: { key, value } }) => {
      state.data[key] = value;
    },
    _clearState: (state, { payload: { key } }) => {
      state.data[key] = null;
    },
    _removeState: (state, { payload: { key } }) => {
      let data = state.data;
      data = JSON.parse(JSON.stringify(data));
      delete data[key];
      state.data = data;
    },
  },
});

const {
  _intiateDynamicRequest,
  _dynamicRequestResponse,
  _dynamicRequestFailure,
  _setState,
  _clearState,
  _removeState,
} = slice.actions;

export const dynamicRequestSelector = (state) => state.dynamicRequest;

export const dynamicRequestReducer = slice.reducer;
export const _getDynamicRequest = (state) => state.dynamicRequest?.data;

export const dynamicEntitySelector = createSelector(
  [_getDynamicRequest, (state, key) => key],
  (data, key) => data?.[key]
);
export function dynamicRequest(keys, query, variables, type) {
  return async (dispatch) => {
    dispatch(_intiateDynamicRequest({ keys }));
    try {
      let request = QueryRequest;
      if (type === "M") {
        request = MutateRequest;
      }
      const response = await request(query, variables, dispatch);
      if (response.req_error) {
        dispatch(
          _dynamicRequestFailure({ keys, error: response.req_error.message })
        );
      } else if (response === "Not authorized") {
        dispatch(_dynamicRequestFailure({ keys, error: response }));
      } else {
        dispatch(_dynamicRequestResponse({ keys, data: response?.data }));
      }
      // }
    } catch (error) {
      dispatch(_dynamicRequestFailure({ keys, error }));
    }
  };
}

export function dynamicSet(key, value) {
  return async (dispatch) => {
    dispatch(_setState({ key, value }));
  };
}

export function dynamicClear(key) {
  return async (dispatch) => {
    dispatch(_clearState({ key }));
  };
}

export function dynamicRemove(key) {
  return async (dispatch) => {
    dispatch(_removeState({ key }));
  };
}
