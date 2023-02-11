import React, { useEffect, useState } from "react";
import { Box, Center, HStack, Text, VStack } from "native-base";
import { useDynamicSelector } from "@services/redux";
import RoleItem from "./role_item";
const RoleList = (props) => {
  const { loading: roles_loading, items: roles } = useDynamicSelector("roles");
  return (
    <HStack>
      {roles &&
        roles.map((role, role_index) => (
          <RoleItem key={role_index} item={role} index={role_index} />
        ))}
    </HStack>
  );
};
export default RoleList;
