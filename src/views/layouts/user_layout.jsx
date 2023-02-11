import { page_count } from "@helpers/constants";
import { navigate } from "@helpers/navigator";
import { retrieveItem, storeItem } from "@helpers/storage";
import {
  dynamicClear,
  dynamicRequest,
  dynamicSet,
  useDynamicSelector,
} from "@services/redux";
import { ROUTES } from "@views/routes/my_routes";
import logo from "@assets/icons/logo_1.png";

import {
  Box,
  Center,
  Hidden,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { Drawer, Spin } from "antd";

import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { AiFillHome, AiFillSetting, AiOutlineHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { FiSettings, FiUsers } from "react-icons/fi";
import { MdOutlineNotifications, MdPersonSearch } from "react-icons/md";
import { RiMessage2Fill, RiMessage2Line } from "react-icons/ri";
import { TbUserSearch } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useCheckLogin } from "@helpers/auth";
const UserLayout = ({ children }) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const is_logged_in = useCheckLogin();
  const [open, setOpen] = useState(false);

  const [notify_count, setNotifyCount] = useState();
  const [notifications_data, setNotificationsData] = useState([]);

  const { reference_id, items, pagination } =
    useDynamicSelector("element_options");
  const { items: _element_option_items } = useDynamicSelector(
    "element_option_items"
  );
  const { my_notifications: notifications_list } =
    useDynamicSelector("notifications");

  const { status: shortlistMemberStatus } =
    useDynamicSelector("shortlistMember");

  const { status: unshortlistMemberStatus } =
    useDynamicSelector("unshortlistMember");

  const { status: blockMemberStatus } = useDynamicSelector("blockMember");
  const { status: ignoreMemberStatus } = useDynamicSelector("ignoreMember");
  useEffect(() => {
    if (is_logged_in === false) {
      navigate("/login");
    }
  }, [is_logged_in]);

  useEffect(() => {
    //storeItem("element_options_reference_id", "");
    let existing_reference_id = retrieveItem("element_options_reference_id");
    if (pagination && items?.length < pagination?.total_count) {
      getElementOptions(pagination?.page_number + 1);
    } else if (pagination) {
      if (existing_reference_id !== reference_id) {
        let _items = JSON.parse(JSON.stringify(items));
        _items = _items.filter((x) => x?.id);
        const key = "id";
        const unique = [
          ...new Map(_items?.map((item) => [item[key], item])).values(),
        ];
        storeItem("element_options_reference_id", reference_id);
        storeItem("element_options_data", unique);
        dispatch(dynamicSet("element_option_items", { items: unique }));
      }
    } else if (reference_id) {
      if (existing_reference_id === reference_id) {
        let element_option_items = retrieveItem("element_options_data");
        if (
          element_option_items &&
          element_option_items.length > 0 &&
          element_option_items[0] != null
        ) {
          let _items = JSON.parse(JSON.stringify(element_option_items));
          const key = "id";
          const unique = [
            ...new Map(_items.map((item) => [item[key], item])).values(),
          ];
          dispatch(dynamicSet("element_option_items", { items: unique }));
        } else {
          storeItem("element_options_reference_id", null);
          getElementOptions(1);
        }
      }
    }
  }, [pagination, reference_id]);

  useEffect(() => {
    if (notifications_list) {
      let _is_read_false_filter = notifications_list?.filter((x) => {
        return x.is_read === false;
      });
      setNotifyCount(_is_read_false_filter);

      setNotificationsData(notifications_list);
    }
  }, [notifications_list]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const getElementOptions = (page_number) => {
    let elements_option_key = [
      {
        key: "element_options",
        append_keys: ["items"],
        appending: true,
        loading: true,
      },
    ];
    let elements_option_query = get_element_options_query;
    let elements_option_variables = null;
    let existing_reference_id = retrieveItem("element_options_reference_id");
    elements_option_variables = {
      // element_id: "621d6c9e-d40f-4515-961a-54d222f55074",
      reference_id: existing_reference_id,
      page_number: page_number,
      page_limit: 200,
    };
    dispatch(
      dynamicRequest(
        elements_option_key,
        elements_option_query,
        elements_option_variables
      )
    );
  };
  const getMyMatches = () => {
    let get_my_matches_key = [{ key: "matches", loading: true }];
    let get_my_matches_query = getMatches;
    let get_my_matches_variables = {
      page_number: 1,
      page_limit: page_count,
    };
    dispatch(
      dynamicRequest(
        get_my_matches_key,
        get_my_matches_query,
        get_my_matches_variables
      )
    );
  };
  const getMySimilarMatches = () => {
    let key = [{ key: "similar_matches", loading: true }];
    let query = getMySimilarMembers;
    let variables = {};
    dispatch(dynamicRequest(key, query, variables));
  };
  const getMembersVisitedMe = () => {
    let get_visited_me_key = [{ key: "members_visited_me", loading: true }];
    let get_visited_me_key_query = getVisitedMeProfiles;
    let get_visited_me_key_variables = {
      page_number: 1,
      page_limit: page_count,
    };
    dispatch(
      dynamicRequest(
        get_visited_me_key,
        get_visited_me_key_query,
        get_visited_me_key_variables
      )
    );
  };
  const getNotificationsList = () => {
    let get_notification_key = [{ key: "notifications", loading: true }];
    let get_notification_query = getNotifications;
    let get_notification_variables = null;
    dispatch(
      dynamicRequest(
        get_notification_key,
        get_notification_query,
        get_notification_variables
      )
    );
  };

  const loadMyShortlists = () => {
    let keys = [
      {
        key: "my_shortlists",
        loading: false,
      },
    ];
    let query = getMyShortlistedMembers;
    let variables = null;
    dispatch(dynamicRequest(keys, query, variables));
  };
  useEffect(() => {
    if (shortlistMemberStatus === "success") {
      toast.success(t("profile_shortlisted"));
      loadMyShortlists();
      dispatch(dynamicClear("shortlistMember"));
    }
    if (unshortlistMemberStatus === "success") {
      toast.success(t("remove_shortlist"));
      loadMyShortlists();
      dispatch(dynamicClear("unshortlistMember"));
    }
  }, [shortlistMemberStatus, unshortlistMemberStatus]);
  useEffect(() => {
    if (blockMemberStatus === "success") {
      toast.success(t("profile_blocked"));
      dispatch(dynamicClear("blockMember"));
    }
    if (ignoreMemberStatus === "success") {
      toast.success(t("profile_ignored"));
      dispatch(dynamicClear("ignoreMember"));
    }
  }, [blockMemberStatus, ignoreMemberStatus]);
  useEffect(() => {
    getElementOptions(1);
    getMyMatches();
    getMembersVisitedMe();
    getNotificationsList();
    getMySimilarMatches();
  }, []);

  return (
    <Box flexDirection="row" flexGrow="1">
      <VStack flex={1}>
        <Hidden from="md">
          {pathname !== "/matches" &&
            pathname !== "/search" &&
            pathname !== "/requests" && (
              <Box
                // alignItems={"center"}
                justifyContent={"center"}
                bgImage={"linear-gradient(234deg,  #7d566f,#fff)"}
                // backgroundColor={"#712e5a"}
                height={30}
                paddingY={5}
              >
                <Pressable
                  width={"100px"}
                  onPress={() => {
                    navigate(ROUTES.USER_HOME);
                  }}
                  pl={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Image
                    cursor={"pointer"}
                    width={80}
                    height={80}
                    alt="logo"
                    resizeMode={"contain"}
                    source={logo}
                  />
                </Pressable>
                <Text fontSize={16} color={"#fff"}>
                  {pathname === "/matches"
                    ? t("matches")
                    : pathname === "/search"
                    ? t("search")
                    : pathname === "/requests"
                    ? t("requests")
                    : pathname === "/settings"
                    ? t("settings")
                    : pathname === "/subscription"
                    ? t("subscription")
                    : pathname === "/manage-profile" && t("manage_profile")}
                </Text>
              </Box>
            )}
        </Hidden>
      

        <Box flex={1}>{children}</Box>
        <Hidden from="md">
          <Box
            shadow={5}
            alignItems={"center"}
            justifyContent={"center"}
            width={"100%"}
            height={30}
            backgroundColor={"#fff"}
            position={"fixed"}
            bottom={0}
            paddingY={5}
          >
            <HStack space={8}>
              <Pressable
                onPress={() => {
                  navigate(ROUTES.USER_HOME);
                }}
              >
                {pathname === "/" ? (
                  <AiFillHome color="#712e5a" size={25} />
                ) : (
                  <AiOutlineHome color="#712e5a" size={25} />
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  navigate(ROUTES.USER_MATCHES);
                }}
              >
                {pathname === "/matches" ? (
                  <FaUserFriends color="#712e5a" size={25} />
                ) : (
                  <FiUsers color="#712e5a" size={25} />
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  navigate(ROUTES.USER_SEARCH);
                }}
              >
                {pathname === "/search" ? (
                  <MdPersonSearch color="#712e5a" size={25} />
                ) : (
                  <TbUserSearch color="#712e5a" size={25} />
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  dispatch(dynamicClear("user_requests"));
                  navigate(ROUTES.USER_REQUESTS);
                }}
              >
                {pathname === "/requests" ? (
                  <RiMessage2Fill color="#712e5a" size={25} />
                ) : (
                  <RiMessage2Line color="#712e5a" size={25} />
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  navigate(ROUTES.USER_SETTINGS);
                }}
              >
                {pathname === "/settings" ? (
                  <AiFillSetting color="#712e5a" size={25} />
                ) : (
                  <FiSettings color="#712e5a" size={25} />
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  showDrawer();
                }}
              >
                <Box>
                  <MdOutlineNotifications color="#712e5a" size={25} />
                </Box>
                {notify_count?.length > 0 && (
                  <Box
                    style={{
                      position: "absolute",
                      height: 20,
                      width: 20,
                      borderRadius: 15,
                      backgroundColor: "red",
                      right: -5,
                      bottom: 16,
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 2000,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                      }}
                    >
                      {notify_count?.length}
                    </Text>
                  </Box>
                )}
              </Pressable>
            </HStack>
          </Box>
        </Hidden>
      </VStack>
      <Drawer
        className="ant-drawer-title ant-drawer-close"
        headerStyle={{
          backgroundColor: "#712e5a",
          textDecorationColor: "#fff",
        }}
        bodyStyle={{ backgroundColor: "#fef5fb" }}
        title="Notifications"
        placement="right"
        onClose={onClose}
        open={open}
      >
       
       
      </Drawer>
    </Box>
  );
};
export default UserLayout;
