import {
  Route,
  Link as ReactLink,
  BrowserRouter,
  Redirect,
} from "react-router-dom";
import logo from "@assets/icons/logo_1.png";

import React, { useState } from "react";
import {
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
import {
  dynamicClear,
  dynamicRequest,
  requestForgotPasswordOTP,
  updateForgotPassword,
  useDynamicSelector,
} from "@services/redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { storeItem } from "@helpers/storage";
import { useDispatch } from "react-redux";

const ForgotPasswordForm = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { showForgotPasswordForm, showLoginForm } = props;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOTP] = useState("");
  const [showPass, setShowPass] = React.useState(false);

  const {
    status: forgot_password_otp_status,
    loading: forgot_password_otp_loading,
  } = useDynamicSelector("request_forgot_password_otp");
  const {
    status: update_forgot_password_status,
    loading: update_forgot_password_loading,
    error: update_forgot_password_error,
    token: update_forgot_password_token,
    profile_id,
    main_photo,
    name,
    user_id,
    gender,
  } = useDynamicSelector("update_forgot_password");

  useEffect(async () => {
    storeItem("token", update_forgot_password_token);
    storeItem("name", name);
    storeItem("profile_id", profile_id);
    storeItem("profile_photo", main_photo);
    storeItem("user_id", user_id);
    storeItem("gender", gender);
    if (update_forgot_password_error) {
      toast.error(update_forgot_password_error.message);
    }
    if (update_forgot_password_token) {
      navigate(ROUTES.USER_HOME);
    }
    dispatch(dynamicClear("update_forgot_password"));
  }, [
    update_forgot_password_token,
    update_forgot_password_error,
    name,
    profile_id,
    main_photo,
    gender,
    user_id,
  ]);
  const sendForgotPasswordOTP = () => {
    let forgot__password_otp_key = [
      { key: "request_forgot_password_otp", loading: true },
    ];
    let forgot__password_otp_query = requestForgotPasswordOTP;
    let forgot__password_otp_variables = { username: userName };
    dispatch(
      dynamicRequest(
        forgot__password_otp_key,
        forgot__password_otp_query,
        forgot__password_otp_variables
      )
    );
  };
  const updateNewPassword = () => {
    let update__password_otp_key = [
      { key: "update_forgot_password", loading: true },
    ];
    let update__password_otp_query = updateForgotPassword;
    let update__password_otp_variables = {
      username: userName,
      otp: otp,
      new_password: password,
    };
    dispatch(
      dynamicRequest(
        update__password_otp_key,
        update__password_otp_query,
        update__password_otp_variables
      )
    );
  };

  useEffect(() => {
    console.log("forgot_password_otp_status", forgot_password_otp_status);

    if (forgot_password_otp_status === "success") {
      toast.success(t("otp_sended"));
    }
    if (update_forgot_password_status === "success") {
      toast.success(t("password_updated"));
      dispatch(dynamicClear("update_forgot_password"));
    }
  }, [forgot_password_otp_status, update_forgot_password_status]);
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={{
        flex: 1,
      }}
    >
      <VStack
        flex="1"
        px="6"
        py="9"
        _light={{
          bg: "white",
        }}
        _dark={{
          bg: "coolGray.800",
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
        <VStack space="7">
          <Hidden till="md">
            <HStack justifyContent={"center"} alignItems="center">
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
                fontSize={{ base: 30, xs: 20, sm: 20, md: 25 }}
                textAlign={"center"}
                fontWeight="normal"
              >
                Standard Matrimony
              </Text> */}
            </HStack>
          </Hidden>
          <VStack>
            <VStack space="3">
              <Box mx={5}>
                {/* <Box alignItems={"center"}> */}
                <VStack>
                  <Text
                    pt={2}
                    color={"#64748B"}
                    fontWeight={"600"}
                    fontSize={15}
                  >
                    Mobile Number
                  </Text>

                  <Input
                    // variant="rounded"
                    placeholder="Mobile Number"
                    onChangeText={(text) => setUserName(text)}
                    value={userName}
                  />
                  {forgot_password_otp_status === "success" && (
                    <>
                      <Text
                        pt={2}
                        color={"#64748B"}
                        fontWeight={"600"}
                        fontSize={15}
                      >
                        Password
                      </Text>

                      <Input
                        w={{
                          base: "100%",
                        }}
                        type={showPass ? "" : "password"}
                        placeholder="Password"
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        InputRightElement={
                          <IconButton
                            variant="unstyled"
                            icon={showPass ? <AiOutlineEye /> : <AiFillEye />}
                            onPress={() => {
                              {
                                !showPass
                                  ? setShowPass(true)
                                  : setShowPass(false);
                              }
                            }}
                          />
                        }
                      />
                      <Text
                        pt={2}
                        color={"#64748B"}
                        fontWeight={"600"}
                        fontSize={15}
                      >
                        OTP
                      </Text>

                      <Input
                        // variant="rounded"
                        placeholder="OTP"
                        onChangeText={(text) => setOTP(text)}
                        value={otp}
                      />
                    </>
                  )}
                </VStack>
              </Box>
              {/* <Link
                ml="auto"
                _text={{
                  fontSize: "xs",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
                _light={{
                  _text: {
                    color: "#712e5a",
                  },
                }}
                _dark={{
                  _text: {
                    color: "#712e5a",
                  },
                }}
                onPress={() => {
                  showForgotPasswordForm(false);
                  showLoginForm(true);
                }}
              >
                Go to Login
              </Link> */}
              <Box my={5}>
                <Button
                  type="primary"
                  loading={
                    forgot_password_otp_loading ||
                    update_forgot_password_loading
                  }
                  onClick={() => {
                    forgot_password_otp_status === "success"
                      ? updateNewPassword()
                      : sendForgotPasswordOTP();
                  }}
                >
                  {forgot_password_otp_status === "success"
                    ? t("update_password")
                    : t("send_otp")}
                </Button>
              </Box>
            </VStack>
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default ForgotPasswordForm;
