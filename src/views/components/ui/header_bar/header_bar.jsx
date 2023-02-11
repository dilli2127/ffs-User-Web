import React from "react";
import { Box, HStack, Menu, Pressable, Text } from "native-base";
import Avatar from "react-avatar";
import { clearLocalStorage, useStorageItem } from "@helpers/storage";
// import { setAuthorize } from "@services/redux";
import { useDispatch } from "react-redux";
import { ROUTES } from "@views/routes/my_routes";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

let defaultStyles = {
  height: "70px",
};

const HeaderBar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  let height = props.height || props.h || defaultStyles.height;
  const { Photo, roles, name } = useStorageItem("user");
  const [shouldOverlapWithTrigger] = React.useState(true);
  const [position, setPosition] = React.useState("left bottom ");
  const handleLogout = () => {
    clearLocalStorage();

    // dispatch(setAuthorize(false));
    history.push({
      pathname: `${ROUTES.ADMIN_LOGIN}`,
    });
  };
  const handleChangePassword = () => {
    // history.push({
    //   pathname: `${ROUTES.CHANGE_PASSWORD}`,
    // });
  };
  return (
    <Box h={height} w="100%" bg="#ffffff">
      <HStack
        h="90%"
        w="100%"
        bg="#ffffff"
        style={{
          boxShadow: "0px 0px 20px rgb(229 218 255)",
        }}
        space="2"
        justifyContent={"space-between"}
      >
        <Box flex={1} justifyContent="center" pl="4">
          <Text bold fontSize="lg" fontWeight="bold">
            {props.projectName}
          </Text>
        </Box>
        {"   "}

        <Box my={"auto"}>
          <HStack>
            <Box right="10px" ml="6">
              <Menu
                w="160"
                position="absolute"
                right="0px"
                top="20px"
                style={{
                  border: "1px solid #d7d7d7",
                  boxShadow: "-2px 2px #7a7a7a42",
                }}
                shouldOverlapWithTrigger={true}
                placement={"left bottom"}
                trigger={(triggerProps) => {
                  return (
                    <Pressable
                      alignSelf="center"
                      alignItems="center"
                      variant="solid"
                      {...triggerProps}
                    >
                      <HStack>
                        <Text bold fontSize="md" fontWeight="">
                          {name}
                        </Text>
                        <Box right="10px" ml="6">
                          <Avatar
                            round
                            size="25"
                            src={
                              Photo ||
                              "https://aim-assets.s3.ap-south-1.amazonaws.com/default-avatar.png"
                            }
                          />
                        </Box>
                      </HStack>
                    </Pressable>
                  );
                }}
              >
                <Menu.Item onPress={handleChangePassword}>
                  Change Password
                </Menu.Item>

                <Menu.Item onPress={handleLogout}>Logout</Menu.Item>
              </Menu>
            </Box>
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
};

export default HeaderBar;
