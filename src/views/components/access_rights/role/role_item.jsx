import React, { useEffect, useState } from "react";
import { Box, Center, HStack, Text, VStack } from "native-base";
import { useDispatch } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { dynamicSet } from "@services/redux";
const RoleItem = (props) => {
  const dispatch = useDispatch();
  const [on_hover, setOnHover] = useState(false);
  const { item, index } = props;

  const on_open_edit = () => {
    dispatch(dynamicSet("role_item", item));
    dispatch(dynamicSet("role_action", "Edit"));
  };

  const on_open_delete = () => {
    dispatch(dynamicSet("role_item", item));
    dispatch(dynamicSet("role_action", "Delete"));
  };

  return (
    <Center
      key={index}
      position="relative"
      w="150px"
      h="75px"
      bg="red.200"
      borderTopWidth="1px"
      borderBottomWidth="1px"
      borderRightWidth={"1px"}
      borderTopColor="black"
      borderBottomColor="black"
      borderRightColor="black"
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <Text color="black">{item.name}</Text>
      {on_hover && (
        <HStack space={3} position="absolute" top="3px" right="3px">
          <EditOutlined
            style={{ cursor: "pointer", color: "blue" }}
            onClick={on_open_edit}
          />
          <DeleteOutlined
            style={{ cursor: "pointer", color: "Red" }}
            onClick={on_open_delete}
          />
        </HStack>
      )}
    </Center>
  );
};
export default RoleItem;
