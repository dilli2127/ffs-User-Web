import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Button, Pressable, useBreakpointValue } from "native-base";
// import { Divide as Hamburger } from "hamburger-react";
import ScrollView from "@views/components/ui/scroll_view";

import lodash from "lodash";
import {
  ProSidebar,
  Menu,
  MenuItem as ProSidebarMenuItem,
  SubMenu as ProSidebarSubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useEffect } from "react";
import { FaGem, FaHeart } from "react-icons/fa";
import Scrollbars from "react-custom-scrollbars-2";

let defaultStyles = {
  burgerColor: "#7199ff",
  backColor: "#ff4a4a",
  headerHeight: "200px",
  footerHeight: "100px",
  titleColor: "#ffffff",
  titleHoverColor: "#ffffff",
  titleActiveColor: "#ffffff",
  iconShape: "square",
  iconBgColor: "#2b2b2b",
  iconColor: "#ff0000",
  iconSize: 15,
  iconActiveColor: "#ffffff",
};

const SideBar = (props) => {
  let sidebarToggle = localStorage.getItem("sidebarToggle");
  const [open, setOpen] = useState(sidebarToggle === "true" ? true : false);
  const isCollapsible = useBreakpointValue({
    base: false,
    xs: false,
    sm: false,
    md: false,
    lg: true,
    xl: true,
  });
  useEffect(() => {
    if (open !== undefined) {
      localStorage.setItem("sidebarToggle", `${open}`);
    }
  }, [open]);

  let burgerColor = props.burgerColor || defaultStyles.burgerColor;
  let backColor = props.backColor || defaultStyles.backColor;
  let headerHeight = props.headerHeight || defaultStyles.headerHeight;
  let footerHeight = props.footerHeight || defaultStyles.footerHeight;
  let titleColor = props.titleColor || defaultStyles.titleColor;
  let titleHoverColor = props.titleHoverColor || defaultStyles.titleHoverColor;
  let titleActiveColor =
    props.titleActiveColor || defaultStyles.titleActiveColor;
  let iconShape = props.iconShape || defaultStyles.iconShape;
  let iconBgColor = props.iconBgColor || defaultStyles.iconBgColor;
  let iconColor = props.iconColor || defaultStyles.iconColor;
  let iconSize = props.iconSize || defaultStyles.iconSize;
  document.documentElement.style.setProperty(
    "--sidebar-icon-bg-color",
    iconBgColor
  );
  document.documentElement.style.setProperty(
    "--sidebar-title-color",
    titleColor
  );
  document.documentElement.style.setProperty(
    "--sidebar-title-hover-color",
    titleHoverColor
  );
  document.documentElement.style.setProperty(
    "--sidebar-title-active-color",
    titleActiveColor
  );

  const Header = (itemProps) => {
    if (props.headerComponent) {
      const element = React.cloneElement(props.headerComponent, {
        ...itemProps,
      });
      return <>{element}</>;
    }
    return <></>;
  };

  const SubMenu = ({ item, index }) => {
    let _iconSize = item.iconSize || iconSize;
    let _iconColor = item.iconColor || iconColor;
    const Icon = () => {
      const element = React.cloneElement(item.icon, {
        color: _iconColor,
        size: _iconSize,
      });
      return <>{element}</>;
    };

    if (!item.subMenu) {
      return (
        <ProSidebarMenuItem index={index} title={item.title} icon={<Icon />}>
          <Link to={item.url}> {item.title}</Link>
        </ProSidebarMenuItem>
      );
    }
    if (item.subMenu) {
      return (
        <ProSidebarSubMenu index={index} title={item.title} icon={<Icon />}>
          {item.subMenu.map((subMenu, subMenuIndex) => (
            <SubMenu key={subMenuIndex} item={subMenu}></SubMenu>
          ))}
        </ProSidebarSubMenu>
      );
    }
  };

  const Footer = (itemProps) => {
    if (props.headerComponent) {
      const element = React.cloneElement(props.footerComponent, {
        ...itemProps,
      });
      return <>{element}</>;
    }
    return <></>;
  };
  // const { pathname } = useLocation();
  // let url = pathname.split("/");
  // if (url[1]) {
  //   let path = lodash.startCase(lodash.camelCase(url[1]));
  //   document.title = path + " | " + props.projectName;
  // } else document.title = props.projectName;
  let isToggled = isCollapsible ? !open : open;
  return (
    <>
      <ProSidebar
        // breakPoint="lg"
        // collapsedWidth="80px"
        image={props.image}
        // collapsed={isCollapsible ? open : false}
        // toggled={open}
        // onToggle={(val) => {
        //   setOpen(open ? false : true);
        // }}
      >
        <SidebarHeader>
          <Box w="100%" h={headerHeight}>
            <Header />
          </Box>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape={iconShape}>
            {props.menu.map((menuItem, index) => {
              if (!menuItem.subMenu) {
                let _iconSize = menuItem.iconSize || iconSize;
                let _iconColor = menuItem.iconColor || iconColor;
                const Icon = () => {
                  const element = React.cloneElement(menuItem.icon, {
                    color: _iconColor,
                    size: _iconSize,
                  });
                  return <>{element}</>;
                };
                return (
                  <ProSidebarMenuItem
                    key={index}
                    title={menuItem.title}
                    icon={<Icon />}
                  >
                    <Link to={menuItem.url}>
                      <span
                        style={{
                          fontWeight: "600",
                          color: "white",
                          overflow: "hidden",
                        }}
                      >
                        {menuItem.title}
                      </span>
                    </Link>
                  </ProSidebarMenuItem>
                );
              }
              if (menuItem.subMenu) {
                let _iconSize = menuItem.iconSize || iconSize;
                let _iconColor = menuItem.iconColor || iconColor;
                const Icon = () => {
                  const element = React.cloneElement(menuItem.icon, {
                    color: _iconColor,
                    size: _iconSize,
                  });
                  return <>{element}</>;
                };
                return (
                  <span
                    style={{
                      fontWeight: "600",
                      color: "white",
                      overflow: "hidden",
                    }}
                  >
                    <ProSidebarSubMenu
                      key={index}
                      title={menuItem.title}
                      icon={<Icon />}
                    >
                      {menuItem.subMenu.map((subMenu, subMenuIndex) => (
                        <SubMenu
                          key={subMenuIndex}
                          index={subMenuIndex}
                          item={subMenu}
                        ></SubMenu>
                      ))}
                    </ProSidebarSubMenu>
                  </span>
                );
              }
            })}
          </Menu>
        </SidebarContent>

        <SidebarFooter>
          <Box w="100%" h={footerHeight} overflow="hidden">
            <Footer />
          </Box>
        </SidebarFooter>
      </ProSidebar>
      <Box
        width="60px"
        height="60px"
        position="absolute"
        top="10px"
        left="9px"
        zIndex="10001"
      >
        <Pressable
          onPress={() => {
            setOpen(open ? false : true);
          }}
        >
          <div
            style={{
              cursor: "pointer",
              display: "inline-block",
            }}
          >
            {/* <div
              style={{
                display: "block",
                height: "3px",
                width: "40px",
                background: !isToggled ? burgerColor : backColor,
                margin: "8px auto",
                WebkitTransition: "all 0.5s ease",
                MozTransition: "all 0.5s ease",
                msTransition: "all 0.5s ease",
                OTransition: "all 0.5s ease",
                transition: "all 0.5s ease",
                transform: isToggled
                  ? "rotateZ(-45deg) translateY(0px) translateX(-9px)"
                  : "rotateZ(0deg) translateY(0px) translateX(0px)",
                width: isToggled ? "15px" : "35px",
              }}
            ></div>  <div
              style={{
                display: "block",
                height: "3px",
                background: !isToggled ? burgerColor : backColor,
                margin: "8px auto",
                WebkitTransition: "all 0.5s ease",
                MozTransition: "all 0.5s ease",
                msTransition: "all 0.5s ease",
                OTransition: "all 0.5s ease",
                transition: "all 0.5s ease",
                transform: isToggled ? "translateX(2px)" : "translateX(0px)",
                width: isToggled ? "25px" : "35px",
              }}
            ></div>
            <div
              style={{
                display: "block",
                height: "3px",
                width: "40px",
                background: !isToggled ? burgerColor : backColor,
                margin: "8px auto",
                WebkitTransition: "all 0.5s ease",
                MozTransition: "all 0.5s ease",
                msTransition: "all 0.5s ease",
                OTransition: "all 0.5s ease",
                transition: "all 0.5s ease",
                transform: isToggled
                  ? "rotateZ(45deg) translateY(0px) translateX(-9px)"
                  : "rotateZ(0deg) translateY(0px) translateX(0px)",
                width: isToggled ? "15px" : "35px",
              }}
            ></div>  */}
          </div>
        </Pressable>
        {/* <Hamburger
          toggled={isCollapsible ? !open : open}
          toggle={() => {
            setOpen(open ? false : true);
          }}
          color="#4FD1C5"
        /> */}
      </Box>
    </>
  );
};
export default SideBar;
