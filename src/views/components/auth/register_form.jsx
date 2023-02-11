import {
  Route,
  Link as ReactLink,
  BrowserRouter,
  Redirect,
} from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import React, { useState } from "react";
import Select from "react-select";
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
import { Scrollbars } from "react-custom-scrollbars-2";

import { AiFillEye, AiOutlineEye } from "react-icons/ai";
import { navigate } from "@helpers/navigator";
import { ROUTES } from "@views/routes/my_routes";
import { DatePicker, Button, Input } from "antd";
import toast from "react-hot-toast";
import {
  dynamicClear,
  dynamicRequest,
  registerUser,
  useDynamicSelector,
} from "@services/redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { storeItem } from "@helpers/storage";
import { useTranslation } from "react-i18next";
import { backgroundColor } from "styled-system";

const RegisterForm = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { _mob, _email } = props;
  const [email, setEmail] = useState(_email);
  const [email_otp, setEmailOTP] = useState();
  const [mobile, setMobile] = useState(_mob);
  const [mobile_otp, setMobileOTP] = useState("");
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [dob, setDob] = useState();

  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState();

  const [showPass, setShowPass] = React.useState(false);

  const {
    token: register_token,
    error,
    loading: registerLoading,
    status: registerStatus,
    name: registeredUserName,
    profile_id,
    is_preference_added,
    is_profile_added,
    gender: user_gender,
  } = useDynamicSelector("register_user");

  useEffect(() => {
    storeItem("token", register_token);
    storeItem("name", registeredUserName);
    storeItem("profile_id", profile_id);
    storeItem("gender", user_gender);

    if (error) {
      toast.error(error.message);
      dispatch(dynamicClear("register_user"));
    }
    if (register_token) {
      if (is_preference_added) {
        navigate(ROUTES.USER_HOME);
        toast.success(`Welcome ${registeredUserName}`);
      } else if (is_profile_added) {
        navigate(ROUTES.USER_MANAGE_PREFERENCE);
      } else {
        navigate(ROUTES.USER_MANAGE_PROFILE);
      }
      // navigate(ROUTES.USER_HOME);
    }
  }, [register_token, error, registeredUserName, profile_id]);

  useEffect(() => {
    if (registerStatus === "success") {
      toast.success(t("registered_successfully"));
      dispatch(dynamicClear("register_user"));
    }
  }, [registerStatus]);

  const Register = () => {
    let values = {
      // email: email,
      // email_otp: email_otp,
      mobile: mobile,
      mobile_otp: mobile_otp,
      name: name,
      gender: gender,
      dob: dob,
      password: password,
    };
    let user_register_key = [{ key: "register_user", loading: true }];
    let user_register_query = registerUser;
    let user_register_variables = { data: values };
    dispatch(
      dynamicRequest(
        user_register_key,
        user_register_query,
        user_register_variables,
        "M"
      )
    );
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      Register();
    }
  };
  return (
    <Scrollbars
      // contentContainerStyle={{
      //   flexGrow: 1,
      // }}
      style={{
        flex: 1,
      }}
      // h="400px"
    >
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
        <VStack space="7">
          <VStack space="3">
            <Box>
              <ScrollView>
                {/* <Box paddingTop={4} paddingBottom={2}>
                  <Text color={"#64748B"} fontWeight={"600"} fontSize={15}>
                    Email
                  </Text>
                </Box>

                <Input
                  _disabled={true}
                  //   variant="rounded"
                  placeholder="Email"
                  // onChangeText={(text) => setEmail(text)}
                  value={email}
                />
                <Box paddingTop={4} paddingBottom={2}>
                  <Text color={"#64748B"} fontWeight={"600"} fontSize={15}>
                    Email OTP
                  </Text>
                </Box>

                <Input
                  //   variant="rounded"
                  placeholder="Email OTP"
                  onChangeText={(text) => setEmailOTP(text)}
                  value={email_otp}
                /> */}
                <Box paddingTop={4} paddingBottom={2}>
                  <Text color={"#64748B"} fontWeight={"600"} fontSize={15}>
                    Mobile
                  </Text>
                </Box>

                <Input
                  disabled={true}
                  //   variant="rounded"
                  placeholder="Mobile"
                  // onChangeText={(text) => setEmail(text)}
                  value={mobile}
                />
                <Box paddingTop={4} paddingBottom={2}>
                  <Text color={"#64748B"} fontWeight={"600"} fontSize={15}>
                    Mobile OTP
                  </Text>
                </Box>

                <Input
                  //   variant="rounded"
                  placeholder="Mobile OTP"
                  onChange={(e) => setMobileOTP(e.target.value)}
                  value={mobile_otp}
                />
                <Box paddingTop={4} paddingBottom={2}>
                  <Text color={"#64748B"} fontWeight={"600"} fontSize={15}>
                    Name
                  </Text>
                </Box>

                <Input
                  //   variant="rounded"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />

                <Box paddingTop={4} paddingBottom={2}>
                  <Text color={"#64748B"} fontWeight={"600"} fontSize={15}>
                    Date of Birth
                  </Text>
                  <DatePicker
                    onChange={(e, date) => {
                      setDob(date);
                    }}
                  />
                </Box>

                <Box pt={"10px"} marginBottom={"10px"}>
                  <Text color={"#64748B"} fontWeight={"600"} fontSize={15}>
                    Gender
                  </Text>
                </Box>

                <Select
                  onChange={(e) => {
                    setGender(e.value);
                  }}
                  style={{
                    rounded: 25,
                  }}
                  // value={gender}
                  options={[
                    {
                      label: "Female",
                      value: "f",
                    },
                    {
                      label: "Male",
                      value: "m",
                    },
                  ]}
                />

                <Box pt={"10px"} marginBottom={"10px"}>
                  <Text color={"#64748B"} fontWeight={"600"} fontSize={15}>
                    Password
                  </Text>
                </Box>

                <Input.Password
                  //   variant="rounded"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                <Box pt={"10px"} marginBottom={"10px"}>
                  <Text color={"#64748B"} fontWeight={"600"} fontSize={15}>
                    Confirm Password
                  </Text>
                </Box>

                <Input.Password
                  onKeyPress={handleKeypress}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  //   variant="rounded"
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    setConfirmpassword(e.target.value);
                  }}
                  value={confirmpassword}
                />

                <Box pt={"10px"} paddingBottom={"10px"} flexDirection="row">
                  <Box>
                    <Checkbox px={2} value="one">
                      <Text px={2} color="#596372">
                        I have read and agree to the <b>Term of Services</b>
                      </Text>
                    </Checkbox>
                  </Box>
                </Box>
              </ScrollView>
            </Box>
            <Box my={5}>
              <Button
                loading={registerLoading}
                onClick={() => {
                  if (confirmpassword === password) {
                    Register();
                  } else if (confirmpassword !== password) {
                    toast.error("Password does not match");
                  }
                }}
                type={"primary"}
              >
                Register
              </Button>
            </Box>
          </VStack>
        </VStack>
        <HStack
          mb="4"
          space="1"
          safeAreaBottom
          alignItems="center"
          justifyContent="center"
          mt={{
            base: "auto",
            md: "8",
          }}
        >
          <Text
            _light={{
              color: "coolGray.800",
            }}
            _dark={{
              color: "coolGray.400",
            }}
          >
            Already have an account?
          </Text>
          <Link
            _text={{
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
              navigate(ROUTES.LOGIN);
            }}
            /* onPress function naviagteTo:"SignUp" */
          >
            Login
          </Link>
        </HStack>
      </VStack>
    </Scrollbars>
  );
};

export default RegisterForm;
