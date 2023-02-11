import {
  Route,
  Link as ReactLink,
  BrowserRouter,
  Redirect,
} from "react-router-dom";
import React, { useState } from "react";
import logo from "@assets/icons/logo_1.png";

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
import Entypo from "react-native-vector-icons/dist/Entypo";

import { AiFillEye, AiOutlineEye } from "react-icons/ai";
import { navigate } from "@helpers/navigator";
import { ROUTES } from "@views/routes/my_routes";
import LoginForm from "./login_form";
import OtpForm from "./otp_form";
import RegisterForm from "./register_form";
import { useEffect } from "react";
import ForgotPassword from "./forgot_password_form";
import ForgotPasswordForm from "./forgot_password_form";
import { useTranslation } from "react-i18next";

const Login = (props) => {
  const { t } = useTranslation();

  const [_showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [_showLoginForm, setShowLoginForm] = useState(true);

  const showForgotPasswordForm = (value1) => {
    setShowForgotPasswordForm(value1);
  };
  // const showRegisterForm = (value2) => {
  //   setShowRegisterForm(value2);
  // };
  const showLoginForm = (value3) => {
    setShowLoginForm(value3);
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
      <Center
        my="auto"
        _dark={{
          bg: "#fef5fb",
        }}
        _light={{
          bg: "#fef5fb",
        }}
        flex="1"
      >
        <Stack
          flexDirection={{
            base: "column",
            md: "row",
          }}
          w="100%"
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
              <HStack alignItems="center">
                <Image
                  cursor={"pointer"}
                  px={2}
                  py={2}
                  size="80px"
                  alt="logo"
                  resizeMode={"contain"}
                  source={logo}
                />
              </HStack>
            </VStack>
          </Hidden>
          <Hidden till="md">
            <Center
              flex="1"
              bg="#d4f9ae"
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
                // source={SM}
              />
            </Center>
          </Hidden>
          {_showLoginForm && !_showForgotPasswordForm && (
            <LoginForm
              props={props}
              showForgotPasswordForm={showForgotPasswordForm}
              showLoginForm={showLoginForm}
            />
          )}
          {_showForgotPasswordForm && !_showLoginForm && (
            <ForgotPasswordForm
              showForgotPasswordForm={showForgotPasswordForm}
              showLoginForm={showLoginForm}
            />
          )}
        </Stack>
      </Center>
    </>
  );
};

export default Login;
