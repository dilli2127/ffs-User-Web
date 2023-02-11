import React, { useEffect, useState } from "react";
import { Box, Center, HStack, Text, VStack } from "native-base";
import { useDispatch } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { dynamicSet } from "@services/redux";
const PageItem = (props) => {
  const dispatch = useDispatch();
  const [on_hover, setOnHover] = useState(false);
  const { item, index } = props;
  const on_open_edit = () => {
    dispatch(dynamicSet("page_item", item));
    dispatch(dynamicSet("page_action", "Edit"));
  };

  const on_open_delete = () => {
    dispatch(dynamicSet("page_item", item));
    dispatch(dynamicSet("page_action", "Delete"));
  };

  return (
    <Center
      key={index}
      position="sticky"
      left="0px"
      w="200px"
      h="40px"
      bg="red.200"
      borderBottomWidth="1px"
      borderLeftWidth="1px"
      borderRightWidth={"1px"}
      borderBottomColor="black"
      borderLeftColor="black"
      borderRightColor="black"
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <Text w="180px" color="black">
        {item.name}
      </Text>
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
export default PageItem;
