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
import Slider from "@views/components/home/slider";

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
                backgroundSize: "cover",
              }}
            > </Box>
            <VStack width="50%" space={5}>
              <Box marginTop="10px" marginLeft="10px">
                <Text fontSize={18}>WHAT DO WE ?</Text>
              </Box>
              <Box
                backgroundColor="#B8E5DB"
                borderLeftRadius="10px"
                padding="7px"
              >
                <Text fontSize="25px" marginLeft="10px">
                  We take our craft seriously
                </Text>
              </Box>
              <Center>
                <Box
                  style={{
                    backgroundImage:
                      'url("https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A7195.jpg")',
                    height: 350,
                    width: "80%",
                    backgroundSize: "cover",
                    borderRadius: "20px",
                  }}
                ></Box>
              </Center>
            </VStack>
          </HStack>
        </Box>
      </VStack>
    </>
  );
};

export default LandingPage;
