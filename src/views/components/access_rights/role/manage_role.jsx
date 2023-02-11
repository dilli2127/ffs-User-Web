import React, { useEffect, useState } from "react";
import {
  get_roles_query,
  create_role_mutation,
  dynamicClear,
  dynamicRequest,
  dynamicSet,
  useDynamicSelector,
  update_role_mutation,
  delete_role_mutation,
} from "@services/redux";
import { Button, Modal, Form, Input } from "antd";
import { Box, Text } from "native-base";
import { useDispatch } from "react-redux";
import { showNotification } from "@helpers/notify";
const ManageRole = () => {
  const dispatch = useDispatch();
  const { loading: create_role_loading, status: create_role_status } =
    useDynamicSelector("create_role");
  const { loading: update_role_loading, status: update_role_status } =
    useDynamicSelector("update_role");
  const { loading: delete_role_loading, status: delete_role_status } =
    useDynamicSelector("delete_role");
  const role_action = useDynamicSelector("role_action");
  const role_item = useDynamicSelector("role_item");
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    loadRoles(true);
  }, []);
  useEffect(() => {
    if (role_action === "Add") {
      form.resetFields();
      setOpen(true);
    } else if (role_action === "Edit") {
      form.setFieldsValue(role_item);
      setOpen(true);
    } else if (role_action === "Delete") {
      setOpen(true);
    }
  }, [role_action]);

  useEffect(() => {
    if (create_role_status === "success") {
      showNotification({
        type: "success",
        message: `Role added successfully`,
      });
      loadRoles(false);
      closeModal();
      dispatch(dynamicClear("create_role"));
    } else if (create_role_status === "failure") {
      showNotification({
        type: "error",
        message: `Role cannot be created`,
      });
      dispatch(dynamicClear("create_role"));
    }
  }, [create_role_status]);

  useEffect(() => {
    if (update_role_status === "success") {
      showNotification({
        type: "success",
        message: `Role updated successfully`,
      });
      loadRoles(false);
      closeModal();
      dispatch(dynamicClear("update_role"));
    } else if (update_role_status === "failure") {
      showNotification({
        type: "error",
        message: `Role cannot be updated`,
      });
      dispatch(dynamicClear("update_role"));
    }
  }, [update_role_status]);

  useEffect(() => {
    if (delete_role_status === "success") {
      showNotification({
        type: "success",
        message: `Role deleted successfully`,
      });
      loadRoles(false);
      closeModal();
      dispatch(dynamicClear("delete_role"));
    } else if (delete_role_status === "failure") {
      showNotification({
        type: "error",
        message: `Role cannot be deleted`,
      });
      dispatch(dynamicClear("delete_role"));
    }
  }, [delete_role_status]);

  const loadRoles = (should_load) => {
    let keys = [{ key: "roles", loading: should_load }];
    let variables = {};
    dispatch(dynamicRequest(keys, get_roles_query, variables));
  };

  const openAddRole = () => {
    dispatch(dynamicSet("role_action", "Add"));
  };

  const closeModal = () => {
    dispatch(dynamicSet("role_action", ""));
    setOpen(false);
  };

  const handleSubmit = (values) => {
    if (role_action === "Add") {
      let keys = [{ key: "create_role", loading: true }];
      let variables = {
        data: values,
      };
      dispatch(dynamicRequest(keys, create_role_mutation, variables, "M"));
    } else if (role_action === "Edit") {
      let keys = [{ key: "update_role", loading: true }];
      let variables = {
        id: role_item.id,
        data: values,
      };
      dispatch(dynamicRequest(keys, update_role_mutation, variables, "M"));
    }
  };

  const handleDelete = () => {
    let keys = [{ key: "delete_role", loading: true }];
    let variables = {
      id: role_item.id,
    };
    dispatch(dynamicRequest(keys, delete_role_mutation, variables, "M"));
  };

  return (
    <>
      <Box w="100%">
        <Button type="primary" ghost onClick={openAddRole}>
          Add Role
        </Button>
      </Box>
      <Modal
        title={`${role_action} Role`}
        open={open}
        onOk={closeModal}
        onCancel={closeModal}
        footer={
          <>
            <Button key="cancel" danger onClick={closeModal}>
              Cancel
            </Button>
            {role_action === "Delete" && (
              <Button
                key="delete"
                type="primary"
                danger
                onClick={handleDelete}
                loading={delete_role_loading}
              >
                Delete
              </Button>
            )}
            {role_action !== "Delete" && (
              <Button
                key="submit"
                type="primary"
                form="manage_role"
                htmlType="submit"
                loading={
                  role_action === "Add"
                    ? create_role_loading
                    : update_role_loading
                }
              >
                {role_action === "Add" && "Add"}
                {role_action === "Edit" && "Update"}
              </Button>
            )}
          </>
        }
      >
        {role_action !== "Delete" && (
          <Form
            form={form}
            name={"manage_role"}
            className="access_rights_form"
            layout={"horizontal"}
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              style={{ color: "black" }}
              rules={[{ required: true, message: "Name is mandatory" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        )}
        {role_action === "Delete" && (
          <Text>
            Do you want to delete the role "
            <Text fontWeight="bold">{role_item.name}</Text>"?
          </Text>
        )}
      </Modal>
    </>
  );
};
export default ManageRole;
