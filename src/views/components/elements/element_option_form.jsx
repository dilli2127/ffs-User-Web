import React, { useEffect, useState } from "react";
import VForm from "@views/components/ui/antd_form";
import { Form } from "antd";
import { useDispatch } from "react-redux";

import {
  create_element_option_mutation,
  update_element_option_mutation,
  dynamicRequest,
  useDynamicSelector,
} from "@services/redux";

const ElementOptionForm = (props) => {
  const { item, form_id, base_props } = props;
  const dispatch = useDispatch();
  const [element_items, setElementItems] = useState([]);
  const [parent_element_options, setParentElementOptions] = useState([]);

  const { items: elements } = useDynamicSelector("elements");

  const [form] = Form.useForm();
  const type = Form.useWatch("type", form);
  const parent_element_id = Form.useWatch("parent_element_id", form);
  const selected_parent_element_options = Form.useWatch(
    "parent_element_options",
    form
  );
  const parent_option_type = Form.useWatch("parent_element_option_type", form);
  useEffect(() => {
    if (item) {
      if (item.value !== undefined && item.value !== null) {
        item.type = "text";
      } else if (
        item.number_value !== undefined &&
        item.number_value !== null
      ) {
        item.type = "number";
      } else if (
        item.range_from_value !== undefined &&
        item.range_from_value !== null
      ) {
        item.type = "range";
      }
      if (
        item.parent_element_options &&
        item.parent_element_options.length > 0
      ) {
        item.parent_element_options = item.parent_element_options.map(
          (x) => x.id
        );
      }
      if (
        item.parent_element_id &&
        item.parent_element_number_value_greater_than_equal
      ) {
        form.setFields([
          {
            name: "parent_element_option_type",
            value: "greater_than",
          },
        ]);
      } else if (
        item.parent_element_id &&
        item.parent_element_number_value_lesser_than_equal
      ) {
        form.setFields([
          {
            name: "parent_element_option_type",
            value: "lesser_than",
          },
        ]);
      } else if (item.parent_element_id) {
        form.setFields([
          {
            name: "parent_element_option_type",
            value: "options",
          },
        ]);
      }
    }

    form.setFieldsValue(item);
  }, [item]);

  useEffect(() => {
    if (type) {
      if (type === "text") {
        form.setFields([
          {
            name: "number_value",
            value: null,
          },
        ]);
        form.setFields([
          {
            name: "range_from_value",
            value: null,
          },
        ]);
        form.setFields([
          {
            name: "range_to_value",
            value: null,
          },
        ]);
      } else if (type === "number") {
        form.setFields([
          {
            name: "value",
            value: null,
          },
        ]);
        form.setFields([
          {
            name: "range_from_value",
            value: null,
          },
        ]);
        form.setFields([
          {
            name: "range_to_value",
            value: null,
          },
        ]);
      } else if (type === "range") {
        form.setFields([
          {
            name: "value",
            value: null,
          },
        ]);
        form.setFields([
          {
            name: "number_value",
            value: null,
          },
        ]);
      }
    }
  }, [type]);

  useEffect(() => {
    let _parent_element_options = [];
    if (parent_element_id && elements) {
      _parent_element_options =
        elements.find((x) => x.id === parent_element_id).element_options || [];
    }
    let sorted = JSON.parse(JSON.stringify(_parent_element_options));
    sorted.sort(function (a, b) {
      if (a["en_label"] > b["en_label"]) {
        return 1;
      }
      if (a["en_label"] < b["en_label"]) {
        return -1;
      }
      return 0;
    });

    setParentElementOptions(sorted);
  }, [parent_element_id, elements]);

  useEffect(() => {
    if (parent_element_id && item?.parent_element_id !== parent_element_id) {
      form.setFields([
        {
          name: "parent_element_options",
          value: [],
        },
      ]);
      form.setFields([
        {
          name: "parent_element_number_value_greater_than_equal",
          value: null,
        },
      ]);
      form.setFields([
        {
          name: "parent_element_number_value_lesser_than_equal",
          value: null,
        },
      ]);
    }
  }, [parent_element_id]);

  useEffect(() => {
    if (elements) {
      let sorted = JSON.parse(JSON.stringify(elements));
      sorted.sort(function (a, b) {
        if (a["name"] > b["name"]) {
          return 1;
        }
        if (a["name"] < b["name"]) {
          return -1;
        }
        return 0;
      });
      sorted = [{ name: "", id: null }, ...sorted];
      setElementItems(sorted);
    }
  }, [elements]);

  const handleSubmit = (values) => {
    delete values.type;
    if (values.parent_element_option_type === "greater_than") {
      delete values.parent_element_number_value_lesser_than_equal;
      values.parent_element_number_value_greater_than_equal =
        values.number_value;
    } else if (values.parent_element_option_type === "lesser_than") {
      delete values.parent_element_number_value_greater_than_equal;
      values.parent_element_number_value_lesser_than_equal =
        values.number_value;
    }
    delete values.parent_element_option_type;
    if (item) {
      let variables = {
        id: item.id,
        data: values,
      };
      let keys = [{ key: "update_element_option", loading: true }];
      dispatch(
        dynamicRequest(keys, update_element_option_mutation, variables, "M")
      );
    } else {
      let variables = {
        data: { ...values, element_id: base_props?.element_id },
      };
      let keys = [{ key: "create_element_option", loading: true }];
      dispatch(
        dynamicRequest(keys, create_element_option_mutation, variables, "M")
      );
    }
  };

  const types = [
    {
      label: "Text",
      value: "text",
    },
    {
      label: "Number",
      value: "number",
    },
    {
      label: "Range",
      value: "range",
    },
  ];

  return (
    <Form
      form={form}
      name={form_id}
      layout={"vertical"}
      onFinish={handleSubmit}
    >
      <VForm.TextBox
        label={"Label"}
        field={"en_label"}
        rules={[
          {
            required: true,
            message: "Field cannot be empty",
          },
        ]}
      />
      <VForm.TextBox label={"Tamil Label"} field={"ta_label"} />
      <VForm.Select
        label={"Parent Element"}
        field={"parent_element_id"}
        options={element_items || []}
        labelField={"name"}
        valueField={"id"}
      />
      {parent_element_id && (
        <VForm.Select
          label={"Parent Element Option Type"}
          field={"parent_element_option_type"}
          options={[
            {
              id: "options",
              label: "Options",
            },
            {
              id: "greater_than",
              label: ">=",
            },
            {
              id: "lesser_than",
              label: "<=",
            },
          ]}
          labelField={"label"}
          valueField={"id"}
          rules={[
            {
              required: true,
              message: "Field cannot be empty",
            },
          ]}
        />
      )}
      {parent_element_id && parent_option_type === "options" && (
        <VForm.Select
          label={"Parent Element Options"}
          field={"parent_element_options"}
          isMulti
          options={parent_element_options}
          labelField={"en_label"}
          valueField={"id"}
          rules={[
            {
              required: true,
              message: "Field cannot be empty",
            },
          ]}
        />
      )}

      <VForm.Select
        label={"Type"}
        field={"type"}
        options={types}
        labelField={"label"}
        valueField={"value"}
        rules={[
          {
            required: true,
            message: "Field cannot be empty",
          },
        ]}
      />
      {type === "text" && (
        <VForm.TextBox
          label={"Value"}
          field={"value"}
          rules={[
            {
              required: true,
              message: "Field cannot be empty",
            },
          ]}
        />
      )}
      {type === "number" && (
        <VForm.Number
          label={"Number Value"}
          field={"number_value"}
          rules={[
            {
              required: true,
              message: "Field cannot be empty",
            },
          ]}
        />
      )}
      {type === "range" && (
        <VForm.Number
          label={"Range From"}
          field={"range_from_value"}
          rules={[
            {
              required: true,
              message: "Field cannot be empty",
            },
          ]}
        />
      )}
      {type === "range" && (
        <VForm.Number
          label={"Range To"}
          field={"range_to_value"}
          rules={[
            {
              required: true,
              message: "Field cannot be empty",
            },
          ]}
        />
      )}
      <VForm.Number label={"Sort Order"} field={"sort_order"} />
    </Form>
  );
};
export default ElementOptionForm;
