import React, { useEffect } from "react";
import VForm from "@views/components/ui/antd_form";
import { Form } from "antd";
import { useDispatch } from "react-redux";

import {
  create_element_mutation,
  update_element_mutation,
  dynamicRequest,
} from "@services/redux";

const ElementForm = (props) => {
  const { item, form_id } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(item);
  }, [item]);

  const handleSubmit = (values) => {
    if (item) {
      let variables = {
        id: item.id,
        data: values,
      };
      let keys = [{ key: "update_element", loading: true }];
      dispatch(dynamicRequest(keys, update_element_mutation, variables, "M"));
    } else {
      let variables = {
        data: values,
      };
      let keys = [{ key: "create_element", loading: true }];
      dispatch(dynamicRequest(keys, create_element_mutation, variables, "M"));
    }
  };

  return (
    <Form
      form={form}
      name={form_id}
      layout={"vertical"}
      onFinish={handleSubmit}
      // onValuesChange={handleOnValueChange}
    >
      <VForm.TextBox
        label={"Name"}
        field={"name"}
        rules={[
          {
            required: true,
            message: "Field cannot be empty",
          },
        ]}
      />
    </Form>
  );
};
export default ElementForm;
