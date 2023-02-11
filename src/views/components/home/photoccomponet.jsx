import {
  Box,
  HStack,
  Text,
  VStack,
  ScrollView,
  Center,
  Button,
} from "native-base";
import React from "react";

const LandingPage = () => {
  return (
    <>
      <VStack>
        <Box height="500px" backgroundColor="#fb6d0cd9" width="100%">
          <HStack>
            <Box
              marginTop="25px"
              borderRightRadius="30px"
              style={{
                backgroundImage:
                  'url("https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A9143.jpg")',
                height: 450,
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
                objecetFit:"cover"
              }}
            ></Box>
          </HStack>
        </Box>
      </VStack>
    </>
  );
};

export default LandingPage;
