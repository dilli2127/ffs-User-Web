import React from "react";
import { Box, Image } from "native-base";
import logo from "@assets/icons/SM.png";
const SidebarHeader = (props) => {
  return (
    <Box
      w={"100%"}
      h={"100%"}
      justifyContent="center"
      alignItems="center"
      // bgColor={"white"}
    >
      <img width="500px" alt="logo" resizeMode={"contain"} src={logo} />
    </Box>
  );
};

export default SidebarHeader;
