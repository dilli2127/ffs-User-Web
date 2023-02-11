import { createSlice } from "@reduxjs/toolkit";
import lodash from "lodash";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  accordions: [],
};

const slice = createSlice({
  name: "accordions",
  initialState,
  reducers: {
    _reset_accordion_state: (state, { payload }) => {
      let accordions = JSON.parse(JSON.stringify(state.accordions));
      let accordion = accordions.find((x) => x.group === payload.group);
      if (!accordion) {
        accordion = {
          group: payload.group,
          items: [
            // {
            //   key: "1",
            //   value: false,
            //   height: 258,
            //   children: ["4", "5", "7"],
            // },
            // {
            //   key: "2",
            //   value: false,
            //   height: 185,
            //   children: ["6"],
            // },
            // {
            //   key: "3",
            //   value: false,
            //   height: 112,
            //   children: [],
            // },
            // {
            //   key: "4",
            //   value: false,
            //   height: 185,
            //   children: ["7"],
            // },
            // {
            //   key: "5",
            //   value: false,
            //   height: 112,
            //   children: [],
            // },
            // {
            //   key: "6",
            //   value: false,
            //   height: 112,
            //   children: [],
            // },
            // {
            //   key: "7",
            //   value: false,
            //   height: 112,
            //   children: [],
            // },
          ],
        };
        accordions.push(accordion);
        accordion = accordions.find((x) => x.group === payload.group);
      } else {
        accordion.items = [
          // {
          //   key: "1",
          //   value: false,
          //   height: 222,
          //   children: ["4", "5", "7"],
          // },
          // {
          //   key: "2",
          //   value: false,
          //   height: 185,
          //   children: ["6"],
          // },
          // {
          //   key: "3",
          //   value: false,
          //   height: 112,
          //   children: [],
          // },
          // {
          //   key: "4",
          //   value: false,
          //   height: 185,
          //   children: ["7"],
          // },
          // {
          //   key: "5",
          //   value: false,
          //   height: 112,
          //   children: [],
          // },
          // {
          //   key: "6",
          //   value: false,
          //   height: 112,
          //   children: [],
          // },
          // {
          //   key: "7",
          //   value: false,
          //   height: 112,
          //   children: [],
          // },
        ];
      }
      state.accordions = accordions;
    },
    _set_accordion_status: (state, { payload }) => {
      let accordions = JSON.parse(JSON.stringify(state.accordions));
      let accordion = accordions.find((x) => x.group === payload.group);
      if (accordion) {
        accordion.actionItem = payload.key;
        let item = accordion.items.find((x) => x.key === payload.key);
        let currentValue = false;
        if (!item) {
          item = {
            key: payload.key,
            value: currentValue,
            height: 0,
          };

          accordion.items.push(item);
          item = accordion.items.find((x) => x.key === payload.key);
        } else {
          currentValue = item.value;
        }
        for (let i = 0; i < accordion.items.length; i++) {
          let _item = accordion.items[i];
          if (payload.ancestors.indexOf(_item.key) === -1) {
            _item.value = false;
          }
        }
        item.value = !currentValue;
        state.accordions = accordions;
      }
    },
    _set_accordion_item_height: (state, { payload }) => {
      let accordions = JSON.parse(JSON.stringify(state.accordions));
      let accordion = accordions.find((x) => x.group === payload.group);
      if (accordion) {
        let item = accordion.items.find((x) => x.key === payload.key);
        if (!item) {
          item = {
            key: payload.key,
            value: false,
            height: 0,
            children: [],
          };
          accordion.items.push(item);
          item = accordion.items.find((x) => x.key === payload.key);
        }
        item.height = payload.height;
        state.accordions = accordions;
      }
    },
    _set_accordion_item_children: (state, { payload }) => {
      let accordions = JSON.parse(JSON.stringify(state.accordions));
      let accordion = accordions.find((x) => x.group === payload.group);
      if (accordion) {
        let item = accordion.items.find((x) => x.key === payload.key);
        if (!item) {
          item = {
            key: payload.key,
            value: false,
            height: 0,
            children: [],
          };

          accordion.items.push(item);
          item = accordion.items.find((x) => x.key === payload.key);
        }
        item.children = payload.children;
        state.accordions = accordions;
      }
    },
  },
});

const {
  _reset_accordion_state,
  _set_accordion_status,
  _set_accordion_item_height,
  _set_accordion_item_children,
} = slice.actions;

export const accordionsSelector = (state) => state.accordions;

export const accordionsReducer = slice.reducer;

export function reset_accordion_state(group) {
  return async (dispatch) => {
    dispatch(_reset_accordion_state({ group }));
  };
}

export function set_accordion_status(group, key, ancestors) {
  return async (dispatch) => {
    dispatch(_set_accordion_status({ group, key, ancestors }));
  };
}

export function set_accordion_item_height(group, key, height) {
  return async (dispatch) => {
    dispatch(_set_accordion_item_height({ group, key, height }));
  };
}

export function set_accordion_item_children(group, key, children) {
  return async (dispatch) => {
    dispatch(_set_accordion_item_children({ group, key, children }));
  };
}
