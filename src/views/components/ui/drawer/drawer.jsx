import React from "react";
import lodash from "lodash";
import { Button, Drawer, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { dynamicRequest, dynamicRequestSelector } from "@services/redux";

const SideDrawer = (props) => {
  let {
    open,
    onClose,
    title,
    component,
    form_id,
    loading,
    reload_keys,
    reload_query,
    reload_variables,
  } = props;
  const dispatch = useDispatch();
  const { loading: reload_loading } = useSelector(dynamicRequestSelector);

  const onReload = () => {
    dispatch(dynamicRequest(reload_keys, reload_query, reload_variables));
  };
  return (
    <Drawer
      title={`${lodash.startCase(lodash.toLower(title))}`}
      width={720}
      style={{ top: "5%" }}
      onClose={onClose}
      open={open}
      drawerStyle={{ paddingBottom: 80, backgroundColor: "#2e2e2e" }}
      headerStyle={{
        backgroundColor: "#2e2e2e",
        borderBottom: "1px solid #564f4f",
      }}
      mask={false}
      extra={
        <Space>
          {reload_query && (
            <Button
              type="dashed"
              loading={reload_loading ? reload_loading : false}
              onClick={onReload}
            >
              Reload
            </Button>
          )}
          <Button
            type="primary"
            htmlType="submit"
            form={form_id}
            loading={loading ? loading : false}
          >
            Submit
          </Button>
        </Space>
      }
    >
      {open && component}
    </Drawer>
  );
};
export default SideDrawer;
