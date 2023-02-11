import React, { useState, useEffect } from "react";
import { HStack } from "native-base";
import DynamicEntityListView from "@views/components/common/dynamic_entity/dynamic_entity_list";
import { useDispatch, useSelector } from "react-redux";
import { useDynamicSelector, dynamicRequest } from "@services/redux";
import ElementForm from "@views/components/elements/element_form";
import ElementOptionForm from "@views/components/elements/element_option_form";
import { ROUTES } from "@views/routes/my_routes";
import {
  delete_element_mutation,
  delete_element_option_mutation,
  get_all_elements_query,
  get_element_options_query,
} from "@services/redux/slices/dynamic_entity/graphql/graphql_element";

const Elements = (props) => {
  const dispatch = useDispatch();
  const { element_id } = props;
  const [selected_element, setSelectedElement] = useState(null);
  const [selected_element_option, setSelectedElementOption] = useState(null);
  const { items: element_items, loading: elements_loading } =
    useDynamicSelector("elements");

  useEffect(() => {
    if (element_id) {
      setSelectedElement({ id: element_id });
    } else {
      setSelectedElement(null);
    }
  }, [element_id]);

  const content = {
    type: "element",
    form_id: "element",
    entity_title: "Elements",
    add_header_label: "New Element",
    search_label: "search element",
    display_field: "name",
    sort_field: "name",
    has_children: true,
    get_entities_query: get_all_elements_query,
    keys: [{ key: "elements", loading: true }],
    parent_item: null,
    get_api_variables: {},
    reload_keys: [],
    reload_query: null,
    reload_variables: null,
    list_key: "elements",
    create_key: "create_element",
    update_key: "update_element",
    delete_key: "delete_element",
    form: <ElementForm />,
    base_props: null,
  };

  const second_content = {
    type: "element_option",
    form_id: "element_option",
    entity_title: "Element Options",
    add_header_label: "New Element Option",
    search_label: "search element option",
    display_field: "en_label",
    sort_field: "sort_order",
    has_children: false,
    get_entities_query: get_element_options_query,
    keys: [{ key: "element_options", loading: true }],
    parent_item: selected_element?.id,
    get_api_variables: {
      element_id: selected_element?.id,
    },
    reload_keys: [{ key: "elements", loading: false }],
    reload_query: get_all_elements_query,
    reload_variables: {},
    list_key: "element_options",
    create_key: "create_element_option",
    update_key: "update_element_option",
    delete_key: "delete_element_option",
    form: <ElementOptionForm />,
    base_props: {
      element_id: selected_element?.id,
    },
  };

  const handleAction = (action, type, item) => {
    if (type === "element") {
      if (action === "Delete") {
        let keys = [{ key: "delete_element", loading: true }];
        dispatch(
          dynamicRequest(
            keys,
            delete_element_mutation,
            {
              id: item.id,
            },
            "M"
          )
        );
      } else if (action === "get_children") {
        if (item !== selected_element) {
          setSelectedElement(item);
          // dispatch(getEntityFields({ entity_id: item.id, loading: true }));
          window.history.replaceState(null, null, `/admin/element/${item.id}`);
        }
      } else if (action === "clear_children") {
        setSelectedElement(null);
        window.history.replaceState(null, null, `${ROUTES.ELEMENTS}`);
      }
    } else if (type === "element_option") {
      if (action === "Delete") {
        let keys = [{ key: "delete_element_option", loading: true }];
        dispatch(
          dynamicRequest(
            keys,
            delete_element_option_mutation,
            {
              id: item.id,
            },
            "M"
          )
        );
      }
    }
  };

  const menu_items = [
    {
      label: "Edit",
      action: "Edit",
    },
    {
      label: "Delete",
      action: "Delete",
    },
  ];

  useEffect(() => {
    if (element_items && element_items.length && element_id) {
      let element_item = element_items.find((x) => x.id === element_id);
      setSelectedElement(element_item);
      // dispatch(getEntityFields({ entity_id: entity_id, loading: true }));
    }
  }, [element_items, element_id]);

  return (
    <HStack style={{ color: "white", height: "100%" }}>
      <DynamicEntityListView
        title={content.entity_title}
        add_header_label={content.add_header_label}
        search_label={content.search_label}
        display_field={content.display_field}
        parent_item={content.parent_item}
        sort_field={content.sort_field}
        selected_item={selected_element}
        menu_items={menu_items}
        handleAction={handleAction}
        type={content.type}
        has_children={content.has_children}
        get_query={content.get_entities_query}
        get_api_variables={content.get_api_variables}
        reload_keys={content.reload_keys}
        reload_query={content.reload_query}
        reload_variables={content.reload_variables}
        keys={content.keys}
        list_key={content.list_key}
        create_key={content.create_key}
        update_key={content.update_key}
        delete_key={content.delete_key}
        drawer_item={{
          form_id: content.form_id,
          component: content.form,
        }}
        base_props={content.base_props}
      />
      {selected_element && (
        <DynamicEntityListView
          title={second_content.entity_title}
          add_header_label={second_content.add_header_label}
          search_label={second_content.search_label}
          display_field={second_content.display_field}
          parent_item={second_content.parent_item}
          sort_field={second_content.sort_field}
          selected_item={selected_element_option}
          menu_items={menu_items}
          handleAction={handleAction}
          type={second_content.type}
          has_children={second_content.has_children}
          get_query={second_content.get_entities_query}
          get_api_variables={second_content.get_api_variables}
          reload_keys={second_content.reload_keys}
          reload_query={second_content.reload_query}
          reload_variables={second_content.reload_variables}
          keys={second_content.keys}
          list_key={second_content.list_key}
          create_key={second_content.create_key}
          update_key={second_content.update_key}
          delete_key={second_content.delete_key}
          drawer_item={{
            form_id: second_content.form_id,
            component: second_content.form,
          }}
          base_props={second_content.base_props}
        />
      )}
    </HStack>
  );
};
export default Elements;
