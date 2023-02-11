import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Input, Skeleton } from "antd";
import lodash from "lodash";
import { FiEdit3 } from "react-icons/fi";
import { Box, HStack, VStack } from "native-base";
import { useDispatch } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars-2";
import SideDrawer from "@views/components/ui/drawer";
import DynamicEntityItem from "./dynamic_entity_item";
import { showNotification } from "@helpers/notify";
import { dynamicRequest, useDynamicSelector } from "@services/redux";
const { Search } = Input;

const DynamicEntityList = (props) => {
  const {
    title,
    add_header_label,
    search_label,
    display_field,
    sort_field,
    parent_item,
    selected_item,
    menu_items,
    handleAction,
    checkIsValid,
    type,
    has_children,
    reload_keys,
    reload_query,
    reload_variables,
    get_query,
    get_api_variables,
    keys,
    list_key,
    create_key,
    update_key,
    delete_key,
    drawer_item,
    base_props,
  } = props;
  const dispatch = useDispatch();
  const [action_type, setActionType] = useState(null);
  const [drawer_open, setDrawerOpen] = useState(false);
  const [drawer_title, setDrawerTitle] = useState("");
  const [drawer_component, setDrawerComponent] = useState(null);
  const [drawer_loading, setDrawerLoading] = useState(false);
  const [item_list, setItemList] = useState([]);
  const { loading: create_entity_loading, status: create_entity_status } =
    useDynamicSelector(create_key);
  const { loading: update_entity_loading, status: update_entity_status } =
    useDynamicSelector(update_key);
  const { loading: delete_entity_loading, status: delete_entity_status } =
    useDynamicSelector(delete_key);
  const { items: entity_items, loading: get_entities_loading } =
    useDynamicSelector(list_key);
  useEffect(() => {
    dispatch(dynamicRequest(keys, get_query, get_api_variables));
  }, [parent_item]);

  useEffect(() => {
    if (entity_items) {
      if (sort_field) {
        let sorted = JSON.parse(JSON.stringify(entity_items));
        sorted.sort(function (a, b) {
          if (a[sort_field] > b[sort_field]) {
            return 1;
          }
          if (a[sort_field] < b[sort_field]) {
            return -1;
          }
          return 0;
        });
        setItemList(sorted);
      } else {
        setItemList(entity_items);
      }
    }
  }, [entity_items]);

  useEffect(() => {
    if (action_type === "Add") {
      setDrawerLoading(create_entity_loading);
    } else if (action_type === "Edit") {
      setDrawerLoading(update_entity_loading);
    }
  }, [create_entity_loading, update_entity_loading]);

  useEffect(() => {
    if (action_type === "Add" && create_entity_status === "success") {
      setDrawerOpen(false);
      let new_keys = JSON.parse(JSON.stringify(keys));
      for (let i = 0; i < new_keys.length; i++) {
        new_keys[i]["loading"] = false;
      }
      dispatch(dynamicRequest(new_keys, get_query, get_api_variables));
      showNotification({
        type: "success",
        message: `${lodash.startCase(lodash.toLower(type))} added successfully`,
      });
    } else if (action_type === "Edit" && update_entity_status === "success") {
      setDrawerOpen(false);
      let new_keys = JSON.parse(JSON.stringify(keys));
      for (let i = 0; i < new_keys.length; i++) {
        new_keys[i]["loading"] = false;
      }
      dispatch(dynamicRequest(new_keys, get_query, get_api_variables));
      showNotification({
        type: "success",
        message: `${lodash.startCase(
          lodash.toLower(type)
        )} updated successfully`,
      });
    } else if (action_type === "Delete" && delete_entity_status === "success") {
      let new_keys = JSON.parse(JSON.stringify(keys));
      for (let i = 0; i < new_keys.length; i++) {
        new_keys[i]["loading"] = false;
      }
      dispatch(dynamicRequest(new_keys, get_query, get_api_variables));
      showNotification({
        type: "success",
        message: `${lodash.startCase(
          lodash.toLower(type)
        )} deleted successfully`,
      });
    }
  }, [create_entity_status, update_entity_status, delete_entity_status]);

  const onSearch = (search_input) => {
    let _item_list = entity_items.filter((entity) =>
      entity[display_field].toLowerCase().includes(search_input.toLowerCase())
    );
    if (sort_field) {
      let sorted = JSON.parse(JSON.stringify(_item_list));
      sorted.sort(function (a, b) {
        if (a[sort_field] > b[sort_field]) {
          return 1;
        }
        if (a[sort_field] < b[sort_field]) {
          return -1;
        }
        return 0;
      });
      setItemList(sorted);
    } else {
      setItemList(_item_list);
    }
  };

  const onAction = (action, type, item) => {
    setActionType(action);
    if (action === "Add" || action === "Edit") {
      setDrawerTitle(`${action} ${type}`);
      let _drawer_component = React.cloneElement(drawer_item["component"], {
        form_id: drawer_item["form_id"],
        item: item ? JSON.parse(JSON.stringify(item)) : null,
        base_props: base_props,
      });
      setDrawerComponent(_drawer_component);
      setDrawerOpen(true);
      handleAction("clear_children", type, item);
    } else {
      handleAction(action, type, item);
    }
  };
  return (
    <>
      <VStack
        width={250}
        style={{
          borderRight: "1px solid #564f4f",
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          fontWeight="bolder"
          alignItems="center"
          height="5%"
          _text={{ color: "white", fontWeight: "bolder" }}
        >
          {title}
        </Box>
        <Box
          justifyContent="center"
          fontWeight="bolder"
          alignItems="center"
          height="5%"
          overflowY="hidden"
          cursor="pointer"
          _text={{ color: "white", fontWeight: "bolder" }}
        >
          <Button
            style={{
              width: 200,
              fontWeight: "bolder",
              background: "#4d4949",
              borderRadius: "5px",
              border: "1px solid #564f4f",
            }}
            onClick={() => {
              onAction("Add", type, null);
            }}
          >
            <HStack>
              <Box width="10%" justifyContent={"center"}>
                <FiEdit3 color="white" />
              </Box>
              <Box width="90%" _text={{ color: "white", fontWeight: "bolder" }}>
                {add_header_label}
              </Box>
            </HStack>
          </Button>
        </Box>
        <Box
          justifyContent="center"
          fontWeight="bolder"
          alignItems="center"
          height="5%"
          overflowY="hidden"
        >
          <Search
            placeholder={search_label}
            allowClear
            onChange={(e) => {
              onSearch(e.target.value);
            }}
            style={{
              width: 200,
            }}
          />
        </Box>

        <Box
          width={250}
          height="80%"
          mt="10%"
          style={{
            borderRight: "1px solid #564f4f",
          }}
        >
          <Scrollbars
            id="sbEntities"
            style={{ width: "100%" }}
            renderThumbVertical={(props) => (
              <div {...props} className="sbEntities-thumb-vertical" />
            )}
            renderTrackHorizontal={(props) => (
              <div
                {...props}
                style={{ display: "none" }}
                className="track-horizontal"
              />
            )}
            renderView={(props) => (
              <div {...props} style={{ ...props.style, overflowX: "hidden" }} />
            )}
          >
            {get_entities_loading && (
              <Box ml="10%">
                <Skeleton
                  loading={get_entities_loading}
                  title={false}
                  button
                  active
                  paragraph={{
                    rows: 30,
                    width: [
                      200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200,
                      200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200,
                      200, 200, 200, 200, 200, 200, 200, 200,
                    ],
                  }}
                />
              </Box>
            )}
            {!get_entities_loading &&
              item_list.map((item, index) => {
                return (
                  <DynamicEntityItem
                    key={index}
                    index={index}
                    item={item}
                    display_field={display_field}
                    title={title}
                    menu_items={menu_items}
                    handleAction={onAction}
                    checkIsValid={checkIsValid}
                    type={type}
                    has_children={has_children}
                    delete_entity_loading={delete_entity_loading}
                    delete_entity_status={delete_entity_status}
                    selected_item={selected_item ? selected_item : undefined}
                  />
                );
              })}
          </Scrollbars>
        </Box>
      </VStack>
      <SideDrawer
        open={drawer_open}
        loading={drawer_loading}
        onClose={() => setDrawerOpen(false)}
        title={drawer_title}
        form_id={drawer_item["form_id"]}
        component={drawer_component}
        reload_keys={reload_keys}
        reload_query={reload_query}
        reload_variables={reload_variables}
      />
    </>
  );
};
export default DynamicEntityList;
