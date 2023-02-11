import React from "react";
import { Box, HStack, Text } from "native-base";

const SidebarFooter = (props) => {
  return (
    <Box w={"100%"} h={"100%"} justifyContent="center" alignItems="center">
      <HStack>
        <Text color="#ffffff" fontSize={12}>
          Powered By{" "}
        </Text>

        <a href="https://vertace.com/" target="blank">
          <img
            height="20"
            alt="vertace"
            src="https://nrtdata-assets.s3.ap-south-1.amazonaws.com/vertace_logo.png"
          />
        </a>
      </HStack>
    </Box>
  );
};

export default SidebarFooter;
