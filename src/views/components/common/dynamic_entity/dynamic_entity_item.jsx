import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Box, Center, Divider, HStack } from "native-base";
import { Dropdown, Menu, Popconfirm } from "antd";
import { WarningOutlined } from "@ant-design/icons";
const DynamicEntityItem = (props) => {
  const {
    item,
    raw_values,
    display_field,
    index,
    handleAction,
    checkIsValid,
    menu_items,
    type,
    selected_item,
    has_children,
    delete_entity_loading,
    delete_entity_status,
  } = props;
  const is_deleting_ref = useRef("");
  const is_active = selected_item?.id === item?.id && has_children;
  const [is_hovered, setIsHovered] = useState(false);
  const [delete_popup_open, setDeletePopupOpen] = useState(false);
  const [is_valid, setIsValid] = useState(true);
  const [is_deleting, setIsDeleting] = useState(false);
  const [drawer_open, setDrawerOpen] = useState(false);
  const handleOpenChange = (new_open) => {
    setDrawerOpen(!new_open);
  };
  useEffect(() => {
    is_deleting_ref.current = is_deleting;
  }, [is_deleting]);

  useEffect(() => {
    if (checkIsValid) {
      let _is_valid = checkIsValid(item, raw_values);
      setIsValid(_is_valid);
    }
  }, [checkIsValid, item, raw_values]);

  useEffect(() => {
    if (delete_entity_status === "success") {
      setIsDeleting(false);
      setDeletePopupOpen(false);
    }
  }, [delete_entity_status]);

  const menu_content = (
    <Menu
      items={
        menu_items
          ? menu_items.map((menu_item, index) => {
              return {
                key: `${index}`,
                label: menu_item.label,
                onClick: () => {
                  if (menu_item.action !== "Delete") {
                    handleAction(menu_item.action, type, item);
                  } else {
                    handleAction("clear_children", type, item);
                    setDeletePopupOpen(true);
                  }
                },
              };
            })
          : []
      }
    />
  );
  return (
    <>
      <Popconfirm
        title={`Delete ${type}`}
        open={delete_popup_open}
        placement="right"
        onConfirm={() => {
          setIsDeleting(true);
          handleAction("Delete", type, item);
        }}
        okButtonProps={{
          loading: delete_entity_loading ?? false,
        }}
        onCancel={() => setDeletePopupOpen(false)}
        maskClosable={true}
        onOpenChange={() => {
          setTimeout(() => {
            if (!is_deleting_ref.current && delete_popup_open) {
              setDeletePopupOpen(false);
            } else {
              setIsDeleting(false);
            }
          }, 200);
        }}
        okText="Delete"
        cancelText="Cancel"
      >
        <Box
          width="100%"
          key={index}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          cursor={has_children ? "pointer" : ""}
          style={{
            justifyContent: "center",
            alignItems: "center",
            minHeight: "5%",
            background: is_active ? "#343434" : undefined,
            boxShadow: is_active
              ? "rgb(149 157 165 / 2%) 0px 8px 24px"
              : undefined,
          }}
        >
          <HStack width="100%">
            <Box
              px={5}
              width={menu_items && menu_items.length > 0 ? "90%" : "100%"}
              onClick={() => {
                if (has_children) {
                  handleAction("get_children", type, item);
                }
              }}
            >
              <Box w="100%" _text={{ color: "white" }}>
                {item[display_field]}
              </Box>
              {!is_valid && (
                <Box position={"absolute"} h={"100%"} right={"2px"}>
                  <Center h={"100%"}>
                    <WarningOutlined style={{ color: "red" }} />
                  </Center>
                </Box>
              )}
            </Box>
            {menu_items && menu_items.length > 0 && (
              <Box width="10%" onClick={() => handleOpenChange(drawer_open)}>
                <Center h="100%">
                  <Dropdown
                    drawer_open={drawer_open}
                    overlay={menu_content}
                    placement="bottomRight"
                    trigger={"click"}
                    onOpenChange={(new_open) => handleOpenChange(!new_open)}
                  >
                    <BsThreeDotsVertical
                      style={{
                        display: is_hovered || drawer_open ? "block" : "none",
                        cursor: "pointer",
                      }}
                    />
                  </Dropdown>
                </Center>
              </Box>
            )}
          </HStack>
        </Box>
      </Popconfirm>
      <Divider bg={"#2e2e2e"} width={"94%"} ml="3%" />
    </>
  );
};
export default DynamicEntityItem;
