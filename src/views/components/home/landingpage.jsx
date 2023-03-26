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
import { ImageBackground, StyleSheet, Image } from "react-native";
import Posterbanner from "@assets/images/gallerybaner.jpg";
import Landing from "@assets/images/landing.JPG";
import AboutImg from "@assets/images/about.jpg";

const LandingPage = () => {
  const styles = StyleSheet.create({
    text: {
      fontSize: 38,
      lineHeight: 70,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#290a0a82",
    },
    text1: {
      fontSize: 30,
      lineHeight: 100,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#290a0a82",
    },
  });
  return (
    <>
      <VStack>
        <HStack flexDirection={{ base: "column", md: "row" }}>
          <Box
            width={["100%", "100%", "40%"]}
            height={["500", "500", "1000"]}
            style={{
              backgroundImage:
                'url("https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/gallerybaner.jpg")',
              backgroundSize: "cover",
            }}
          >
            <Box marginTop={["10px","10px","80px"]}>
              <Text style={styles.text}>
                <span className="fresh">FRESH</span>
                <span className="focuz"> FOCUZ</span>
                <span className="studio">STUDIO</span>
              </Text>
            </Box>
          </Box>
          <Box width={["100%", "100%", "60%"]}>
            <div
              className="zoom1"
              style={{
                backgroundImage:
                  'url("https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG")',
                height: 600,
                width: "100%",
                backgroundSize: "cover",
              }}
            ></div>
            <Box backgroundColor="#0ad4e094" height={["auto", "auto", "400"]}>
              <Box padding="20px">
                <Center>
                  <Text fontSize="30px" bold>
                    Candid wedding photography
                  </Text>
                  <Text fontSize="16px" textAlign="justify">
                    We are the best wedding photographers in Chennai,
                    documenting true love with all of its imperfections not with
                    the idea of boring perfection. We have increased our
                    creativity by thinking differently and accepting diversity,
                    thus our wedding photographers are always expanding their
                    imagination, not only in capturing those pricelessmoments
                    but also in their approach to any part of your big day.
                    That's how we rock and roll. Snoop around our
                  </Text>
                </Center>
                <Box alignItems="flex-end" marginBottom="10px">
                  <Button width="150px" alignItems="flex-end">
                    Browse photography
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </HStack>
        <HStack flexDirection={{ base: "column", md: "row" }}>
          <Box
            width={["100%", "100%", "50%"]}
            height="auto"
            backgroundColor="blue.200"
            padding="20px"
          >
            <Text>HELLO, WE ARE GLAD YOU FOUND US!</Text>
            <Text fontSize="25px" bold>
              Welcome to <span className="fresh">FRESH</span>
              <span className="focuz"> FOCUZ</span>
              <span className="studio">STUDIO</span> !
            </Text>
            <Box>
              <Text fontSize="16px" textAlign="justify" color="block">
                We are a Candid Wedding Photography Studio Located in Chennai
                that is rapidly expanding through out India. Our team of wedding
                photographers is here to help you give a significant, no-stress,
                and genuine experience while recording your love in a
                one-of-a-kind way. We want to be there for you throughout the
                day and planning process.
              </Text>
            </Box>
          </Box>
          <Box
            width={["100%", "100%", "50%"]}
            height="auto"
            backgroundColor="blue.200"
            style={{
              backgroundImage:
                'url("https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/DSC_0319.jpg")',
              backgroundSize: "cover",
            }}
          >
            <Text style={styles.text1}>
              <span className="fresh">Your Wedding</span> +
              <span className="focuz"> Our Visualization</span>
              <br />= <span className="studio"> Best Love Stories, Ever</span>!
            </Text>
          </Box>
        </HStack>
      </VStack>
    </>
  );
};

export default LandingPage;
