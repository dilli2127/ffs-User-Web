import {
  Route,
  Link as ReactLink,
  BrowserRouter,
  Redirect,
} from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

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
import logo from "@assets/icons/logo_1.png";

import SM from "@assets/icons/hands.png";
import Entypo from "react-native-vector-icons/dist/Entypo";
import { Input, Button } from "antd";
import { AiFillEye, AiOutlineEye } from "react-icons/ai";
import { navigate } from "@helpers/navigator";
import { ROUTES } from "@views/routes/my_routes";
import { useTranslation } from "react-i18next";
import {
  dynamicClear,
  dynamicRequest,
  useDynamicSelector,
  userLogin,
} from "@services/redux";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearLocalStorage, retrieveItem, storeItem } from "@helpers/storage";

const LoginForm = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { showForgotPasswordForm, showLoginForm } = props;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = React.useState(false);

  const {
    status,
    error,
    token,
    profile_id,
    user_id,
    main_photo,
    name,
    gender,
    loading: loginLoading,
    is_profile_added,
    is_preference_added,
  } = useDynamicSelector("user_login");

  useEffect(() => {
    if (status === "success") {
      if (error) {
        toast.error(error.message);
        dispatch(dynamicClear("user_login"));
      } else {
        storeItem("token", token);
        storeItem("name", name);
        storeItem("profile_id", profile_id);
        storeItem("profile_photo", main_photo);
        storeItem("user_id", user_id);
        storeItem("gender", gender);
        if (token) {
          if (is_profile_added && is_preference_added) {
            navigate(ROUTES.USER_HOME);
            toast.success(`Welcome ${name}`);
          } else if (!is_profile_added) {
            navigate(ROUTES.USER_MANAGE_PROFILE);
          } else if (!is_preference_added) {
            navigate(ROUTES.USER_MANAGE_PREFERENCE);
          }
        }
      }
      dispatch(dynamicClear("user_login"));
    }
  }, [status]);

  const Login = () => {
    let user_login_key = [{ key: "user_login", loading: true }];
    let user_login_query = userLogin;
    let user_login_variables = { username: userName, password: password };
    dispatch(
      dynamicRequest(user_login_key, user_login_query, user_login_variables)
    );
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      Login();
    }
  };
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
                // size="180px"
                width={40}
                height={40}
                alt="logo"
                resizeMode={"contain"}
                // source={logo}
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
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    value={userName}
                  />
                  {/* </VStack>
                  </Box>
                  <Box alignItems={"center"}>
                    <VStack width={"50%"}> */}
                  <Text
                    pt={2}
                    color={"#64748B"}
                    fontWeight={"600"}
                    fontSize={15}
                  >
                    Password
                  </Text>

                  <Input.Password
                    w={{
                      base: "100%",
                      // xs: "100%",
                      // sm: "100%",
                      // md: "100%",
                      // lg: "100%",
                      // xl: "50%",
                    }}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    // type={showPass ? "" : "password"}
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                    onPressEnter={handleKeypress}
                    // InputRightElement={
                    //   <IconButton
                    //     variant="unstyled"
                    //     icon={showPass ? <AiOutlineEye /> : <AiFillEye />}
                    //     onPress={() => {
                    //       {
                    //         !showPass ? setShowPass(true) : setShowPass(false);
                    //       }
                    //     }}
                    //   />
                    // }
                  />
                </VStack>
                {/* </Box> */}
              </Box>
              <Link
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
                  showForgotPasswordForm(true);
                  showLoginForm(false);
                  dispatch(dynamicClear("request_forgot_password_otp"));

                  // navigate(ROUTES.FORGOT_PASSWORD);
                }}
              >
                Forgot password?
              </Link>

              <Button
                loading={loginLoading}
                type="primary"
                onClick={() => {
                  if (userName.length === 10 && password.length) {
                    Login();
                  } else if (userName.length < 10 || userName.length > 10) {
                    toast.error("Please enter valid mobile number");
                  } else if (!password.length) {
                    toast.error("Please enter valid password");
                  }
                }}
              >
                SIGN IN
              </Button>
            </VStack>
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
            {t("dont_have_acc")}
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
              dispatch(dynamicClear("user_login"));
              clearLocalStorage();
              navigate(ROUTES.REGISTER);
              // showForgotPasswordForm(true);
              // showLoginForm(false);
            }}
            /* onPress function naviagteTo:"SignUp" */
          >
            {t("sign_up")}
          </Link>
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default LoginForm;
