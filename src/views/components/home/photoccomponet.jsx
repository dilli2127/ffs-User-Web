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
        <Box
          height={["auto", "auto", "500px"]}
          backgroundColor="#fb6d0cd9"
          width="100%"
        >
          <HStack flexDirection={{ base: "column", md: "row" }}>
            <Box
              marginTop="25px"
             
              width={["auto", "auto", "50%"]}
            >
              <div className="zoom2"
                style={{
                  backgroundImage:
                    'url("https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A9143.jpg")',
                  height: 450,
                  backgroundSize: "cover",
                 borderTopRightRadius:"30px",
                 borderBottomRightRadius:"30px"
                }}
              ></div>
            </Box>
            <VStack width={["100%","100%","50%"]} space={5}>
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
                <Box width={["100%","100%","80%"]}
                height={["350px","350px","670px"]}
                marginBottom={["35px"]}
                  style={{
                    backgroundImage:
                      'url("https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A7195.jpg")',
                    backgroundSize: "cover",
                    borderRadius: "20px",
                    zoom:"0.52"
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
