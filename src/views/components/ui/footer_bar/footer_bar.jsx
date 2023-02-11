import React from "react";
import { Box, HStack, Center } from "native-base";

let defaultStyles = {
  height: "50px",
};

const FooterBar = (props) => {
  let height = props.height || props.h || defaultStyles.height;

  return (
    <Box h={height} w="100%" bg="#ffffff" position="relative">
      <Box
        h="90%"
        w="100%"
        bg="#ffffff"
        position="absolute"
        bottom="0px"
        style={{
          boxShadow: "rgb(229 218 255) 0px 0px 4px",
        }}
      >
        <HStack h="100%" justifyContent="flex-end">
          <Box h="100%" mr="10px">
            <Center h="100%">
              <HStack>{new Date().getFullYear()} © Standard Matrimony</HStack>
            </Center>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default FooterBar;
