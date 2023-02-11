import { Box, HStack, Text } from "native-base";
import React from "react";

const Header = () => {
  return (
    <>
      <Box width="100%" height="40px" backgroundColor="#FA6715">
        <HStack>
          <Box width="40%">
            <Text
              fontSize={25}
              fontWeight="550"
              color="#ffffff"
              marginLeft="8rem"
            >
              FRESH FOCUZ{" "}
              <span
                style={{
                  fontWeight: "400",
                }}
              >
                STUDIO
              </span>
            </Text>
          </Box>
          <Box >
            <HStack mt={2.5} space={20}>
              <Text color="#ffffff">HOME</Text>
              <Text color="#ffffff">About</Text>
              <Text color="#ffffff">Services</Text>
              <Text color="#ffffff">Albums</Text>
              <Text color="#ffffff">Contact Us </Text>
            </HStack>
          </Box>
        </HStack>
      </Box>
    </>
  );
};

export default Header;
