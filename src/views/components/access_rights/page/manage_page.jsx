import React, { useEffect, useState } from "react";
import {
  get_ui_modules_query,
  create_ui_module_mutation,
  dynamicClear,
  dynamicRequest,
  dynamicSet,
  useDynamicSelector,
  update_ui_module_mutation,
  delete_ui_module_mutation,
} from "@services/redux";
import { Button, Modal, Form, Input } from "antd";
import { Box, Text } from "native-base";
import { useDispatch } from "react-redux";
import { showNotification } from "@helpers/notify";
const ManagePage = () => {
  const dispatch = useDispatch();
  const { loading: create_page_loading, status: create_page_status } =
    useDynamicSelector("create_page");
  const { loading: update_page_loading, status: update_page_status } =
    useDynamicSelector("update_page");
  const { loading: delete_page_loading, status: delete_page_status } =
    useDynamicSelector("delete_page");
  const page_action = useDynamicSelector("page_action");
  const page_item = useDynamicSelector("page_item");
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    loadPages(true);
  }, []);

  useEffect(() => {
    if (page_action === "Add") {
      form.resetFields();
      setOpen(true);
    } else if (page_action === "Edit") {
      form.setFieldsValue(page_item);
      setOpen(true);
    } else if (page_action === "Delete") {
      setOpen(true);
    }
  }, [page_action]);

  useEffect(() => {
    if (create_page_status === "success") {
      showNotification({
        type: "success",
        message: `Page added successfully`,
      });
      loadPages(false);
      closeModal();
      dispatch(dynamicClear("create_page"));
    } else if (create_page_status === "failure") {
      showNotification({
        type: "error",
        message: `Page cannot be created`,
      });
      dispatch(dynamicClear("create_page"));
    }
  }, [create_page_status]);

  useEffect(() => {
    if (update_page_status === "success") {
      showNotification({
        type: "success",
        message: `Page updated successfully`,
      });
      loadPages(false);
      closeModal();
      dispatch(dynamicClear("update_page"));
    } else if (update_page_status === "failure") {
      showNotification({
        type: "error",
        message: `Page cannot be updated`,
      });
      dispatch(dynamicClear("update_page"));
    }
  }, [update_page_status]);

  useEffect(() => {
    if (delete_page_status === "success") {
      showNotification({
        type: "success",
        message: `Page deleted successfully`,
      });
      loadPages(false);
      closeModal();
      dispatch(dynamicClear("delete_page"));
    } else if (delete_page_status === "failure") {
      showNotification({
        type: "error",
        message: `Page cannot be deleted`,
      });
      dispatch(dynamicClear("delete_page"));
    }
  }, [delete_page_status]);

  const loadPages = (should_load) => {
    let keys = [{ key: "pages", loading: should_load }];
    let variables = {};
    dispatch(dynamicRequest(keys, get_ui_modules_query, variables));
  };

  const openAddPage = () => {
    dispatch(dynamicSet("page_action", "Add"));
  };

  const closeModal = () => {
    dispatch(dynamicSet("page_action", ""));
    setOpen(false);
  };

  const handleSubmit = (values) => {
    if (page_action === "Add") {
      let keys = [{ key: "create_page", loading: true }];
      let variables = {
        data: values,
      };
      dispatch(dynamicRequest(keys, create_ui_module_mutation, variables, "M"));
    } else if (page_action === "Edit") {
      let keys = [{ key: "update_page", loading: true }];
      let variables = {
        id: page_item.id,
        data: values,
      };
      dispatch(dynamicRequest(keys, update_ui_module_mutation, variables, "M"));
    }
  };

  const handleDelete = () => {
    let keys = [{ key: "delete_page", loading: true }];
    let variables = {
      id: page_item.id,
    };
    dispatch(dynamicRequest(keys, delete_ui_module_mutation, variables, "M"));
  };

  return (
    <>
      <Box w="100%">
        <Button type="primary" ghost onClick={openAddPage}>
          Add Page
        </Button>
      </Box>
      <Modal
        title={`${page_action} Page`}
        open={open}
        onOk={closeModal}
        onCancel={closeModal}
        footer={
          <>
            <Button key="cancel" danger onClick={closeModal}>
              Cancel
            </Button>
            {page_action === "Delete" && (
              <Button
                key="delete"
                type="primary"
                danger
                onClick={handleDelete}
                loading={delete_page_loading}
              >
                Delete
              </Button>
            )}
            {page_action !== "Delete" && (
              <Button
                key="submit"
                type="primary"
                form="manage_page"
                htmlType="submit"
                loading={
                  page_action === "Add"
                    ? create_page_loading
                    : update_page_loading
                }
              >
                {page_action === "Add" && "Add"}
                {page_action === "Edit" && "Update"}
              </Button>
            )}
          </>
        }
      >
        {page_action !== "Delete" && (
          <Form
            form={form}
            name={"manage_page"}
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
        {page_action === "Delete" && (
          <Text>
            Do you want to delete the page "
            <Text fontWeight="bold">{page_item.name}</Text>"?
          </Text>
        )}
      </Modal>
    </>
  );
};
export default ManagePage;
