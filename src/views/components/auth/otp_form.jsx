import {
  Route,
  Link as ReactLink,
  BrowserRouter,
  Redirect,
} from "react-router-dom";
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
  ScrollView,
} from "native-base";
import SM from "@assets/icons/hands.png";
import Entypo from "react-native-vector-icons/dist/Entypo";

import { AiFillEye, AiOutlineEye } from "react-icons/ai";
import { navigate } from "@helpers/navigator";
import { ROUTES } from "@views/routes/my_routes";
// import {
//   dynamicRequest,
//   getOTP,
//   useDynamicSelector,
//   userGetOTP,
//   verifyOtp,
// } from "@services/redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Input, Button } from "antd";
import {
  dynamicClear,
  dynamicRequest,
  registerOTPRequest,
  useDynamicSelector,
} from "@services/redux";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const OtpForm = (props) => {
  const { showOTPForm, showRegisterForm, stateValues } = props;

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [showPass, setShowPass] = React.useState(false);

  // const { status: getOtpStatus, loading: getOTPLoading } =
  //   useDynamicSelector("getOTP");

  const {
    status: verifyOtpStatus,
    loading: verifyOTPLoading,
    mobile_status,
  } = useDynamicSelector("register_opt_request");

  // const sendOTP = () => {
  //   let otp_keys = [{ key: "getOTP", loading: true }];
  //   let otp_query = userGetOTP;
  //   let otp_variables = { mobile: userName };
  //   dispatch(dynamicRequest(otp_keys, otp_query, otp_variables));
  // };
  const verifyOTP = () => {
    let otp_keys = [{ key: "register_opt_request", loading: true }];
    let otp_query = registerOTPRequest;
    let otp_variables = {
      mobile: userName,
      //  email: email
    };
    dispatch(dynamicRequest(otp_keys, otp_query, otp_variables));
  };

  useEffect(() => {
    if (mobile_status) {
      toast.error(mobile_status);
      dispatch(dynamicClear("register_opt_request"));
    }
    if (verifyOtpStatus === "success") {
      showRegisterForm(true);
      showOTPForm(false);
      dispatch(dynamicClear("register_opt_request"));
    }
  }, [verifyOtpStatus]);
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
          {/* <Hidden till="md">
            <Text
              color={"#712e5a"}
              bold
              fontSize={30}
              textAlign={"center"}
              fontWeight="normal"
            >
              Standard Matrimony
            </Text>
          </Hidden> */}
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
                    {t("mobile")}
                  </Text>

                  <Input
                    // variant="rounded"
                    placeholder="Mobile Number"
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    value={userName}
                  />
                  {/* <Text
                    pt={2}
                    color={"#64748B"}
                    fontWeight={"600"}
                    fontSize={15}
                  >
                    {t("email")}
                  </Text> */}

                  {/* <Input
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                  /> */}
                </VStack>
              </Box>
              <Box my={5}>
                <Button
                  loading={verifyOTPLoading}
                  type={"primary"}
                  onClick={() => {
                    stateValues(userName, email);
                    verifyOTP();
                    // showRegisterForm(true);
                    // showOTPForm(false);
                  }}
                >
                  {t("send_otp")}
                </Button>
              </Box>
            </VStack>
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default OtpForm;
