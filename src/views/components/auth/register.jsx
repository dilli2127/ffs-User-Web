import {
  Route,
  Link as ReactLink,
  BrowserRouter,
  Redirect,
} from "react-router-dom";
import logo from "@assets/icons/logo_1.png";

import React, { useState } from "react";
import {
  Button,
  HStack,
  VStack,
  Text,
  Link,
  Checkbox,
  Divider,
  Image,
  useColorModeValue,
  IconButton,
  Icon,
  Pressable,
  Center,
  Hidden,
  StatusBar,
  Stack,
  Box,
  Input,
  ScrollView,
} from "native-base";
import SM from "@assets/icons/hands.png";
import HEART from "@assets/icons/SM.png";
import Entypo from "react-native-vector-icons/dist/Entypo";

import { AiFillEye, AiOutlineEye } from "react-icons/ai";
import { navigate } from "@helpers/navigator";
import { ROUTES } from "@views/routes/my_routes";
import RegisterForm from "./register_form";
import OtpForm from "./otp_form";
import { useTranslation } from "react-i18next";

const Register = (props) => {
  const { t } = useTranslation();

  const [_showRegisterForm, setShowRegisterForm] = useState(false);
  const [_showOtpForm, setShowOtpForm] = useState(true);
  const [stateMobile, setStateMobile] = useState();
  const [stateEmail, setStateEmail] = useState();

  const showRegisterForm = (value1) => {
    setShowRegisterForm(value1);
  };
  const showOTPForm = (value2) => {
    setShowOtpForm(value2);
  };
  const stateValues = (mob, email) => {
    setStateMobile(mob);
    setStateEmail(email);
  };
  return (
    <>
      <Box
        safeAreaTop
        _light={{
          bg: "primary.900",
        }}
        _dark={{
          bg: "coolGray.900",
        }}
      />
      <Box w="100%" h="30px" bg="#fff" />
      <Center
        my="auto"
        _dark={{
          bg: "#fff",
        }}
        _light={{
          bg: "#fff",
        }}
        flex="1"
      >
        <Stack
          flexDirection={{
            base: "column",
            md: "row",
          }}
          w="100%"
          h="100%"
          maxW={{
            md: "1016px",
          }}
          flex={{
            base: "1",
            md: "none",
          }}
        >
          <Hidden from="md">
            <VStack px="4" mt="4" mb="5" space="9">
              <HStack space="2" justifyContent={"center"} alignItems="center">
                <Image
                  cursor={"pointer"}
                  px={2}
                  py={2}
                  size="200px"
                  alt="logo"
                  resizeMode={"contain"}
                  source={logo}
                />
                {/* <Text
                  color={"#712e5a"}
                  bold
                  fontSize={{ base: 25, xs: 20, sm: 20 }}
                  textAlign={"center"}
                  fontWeight="normal"
                >
                  {t("standard_matrimony")}
                </Text> */}
              </HStack>
            </VStack>
          </Hidden>
          <Hidden till="md">
            <Center
              flex="1"
              bg="#712e5a"
              borderTopLeftRadius={{
                base: "0",
                md: "xl",
              }}
              borderBottomLeftRadius={{
                base: "0",
                md: "xl",
              }}
            >
              <Image
                h="24"
                size="80"
                alt="NativeBase Startup+ "
                resizeMode={"contain"}
                source={SM}
                // source={
                //   "https://pereaclinic.com/wp-content/uploads/2019/12/270x270-male-avatar.png"
                // }
              />
              {/* <Text bold fontSize={30} color="white" py={5}>
                Standard Matrimony
              </Text> */}
            </Center>
          </Hidden>
          <VStack
            flex="1"
            px="6"
            py="9"
            _light={{
              bg: "#fef5fb",
            }}
            _dark={{
              bg: "#fef5fb",
            }}
            space="3"
            justifyContent="space-between"
            borderTopRightRadius={{
              base: "2xl",
              md: "xl",
            }}
            borderBottomRightRadius={{
              base: "0",
              md: "xl",
            }}
            borderTopLeftRadius={{
              base: "2xl",
              md: "0",
            }}
          >
            <Hidden till="md">
              <HStack justifyContent={"center"} alignItems={"center"}>
                {/* <Image
                  size="40"
                  alt="NativeBase Startup+ "
                  // resizeMode={"contain"}
                  source={HEART}
                /> */}
                <Image
                  cursor={"pointer"}
                  px={2}
                  py={2}
                  size="200px"
                  alt="logo"
                  resizeMode={"contain"}
                  source={logo}
                />
                {/* <Text
                  color={"#712e5a"}
                  bold
                  fontSize={30}
                  textAlign={"center"}
                  fontWeight="normal"
                >
                  {t("standard_matrimony")}
                </Text> */}
              </HStack>
            </Hidden>

            {_showRegisterForm && !_showOtpForm && (
              <RegisterForm
                showOTPForm={showOTPForm}
                showRegisterForm={showRegisterForm}
                _mob={stateMobile}
                _email={stateEmail}
              />
            )}
            {!_showRegisterForm && _showOtpForm && (
              <OtpForm
                showOTPForm={showOTPForm}
                showRegisterForm={showRegisterForm}
                stateValues={stateValues}
              />
            )}
          </VStack>
        </Stack>
      </Center>
      <Box w="100%" h="30px" bg="#fff" />
    </>
  );
};

export default Register;
