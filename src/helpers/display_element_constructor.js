import { Box, Card, Divider, HStack, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import * as Icons from "./icon";

const DisplayElementConstructor = ({ displayElements, elements }) => {
  const [groupedDisplayElements, setGroupedDisplayElements] = useState([]);
  useEffect(() => {
    if (displayElements?.length) {
      setDisplayElementTree();
    }
  }, [displayElements]);
  const setDisplayElementTree = async () => {
    let _parentDisplayElements = displayElements.filter(function (
      _display_element
    ) {
      return _display_element.parent_display_element_id === null;
    });
    let parentDisplayElements = [];
    for (let c = 0; c < _parentDisplayElements.length; c++) {
      let _parentDisplayElement = _parentDisplayElements[c];
      let parentDisplayElement = {
        ..._parentDisplayElement,
        parent_display_element_id: null,
        children: [],
      };
      parentDisplayElement.children = await setChildDisplayElements(
        parentDisplayElement
      );
      parentDisplayElements.push(parentDisplayElement);
    }
    setGroupedDisplayElements(parentDisplayElements);
    return parentDisplayElements;
  };

  const setChildDisplayElements = async (item) => {
    let _childDisplayElements = displayElements.filter(function (
      _display_element
    ) {
      return _display_element.parent_display_element_id === item.id;
    });
    let childDisplayElements = [];
    for (let c = 0; c < _childDisplayElements.length; c++) {
      let _childDisplayElement = _childDisplayElements[c];
      let childDisplayElement = {
        ..._childDisplayElement,
        parent_display_element_id: item.id,
        children: [],
      };
      childDisplayElement.children = await setChildDisplayElements(
        childDisplayElement
      );
      childDisplayElements.push(childDisplayElement);
    }
    return childDisplayElements;
  };
  const findElement = (element_id) => {
    let element = elements.find((z) => z.element_id == element_id);
    let element_value = " ";
    if (element)
      if (element?.element_option_id) {
        element_value = element.element_option?.element_option_contents?.find(
          (x) => x.locale === "en"
        ).option;
      } else {
        element_value = element?.user_element_detail_contents?.find(
          (x) => x.locale === "en"
        )?.content;
      }
    return element_value;
  };
  const renderDisplayElement = () => {
    return groupedDisplayElements.map((x, i) => {
      return (
        <Box
          key={i}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 8,
            shadowOffset: { width: 0, height: 1 },
            shadowColor: "#712e5a",
            elevation: 15,
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            borderBottomWidth: 3,
            borderBottomColor: "#712e5a",
            marginVertical: 10,
            marginHorizontal: 5,
            paddingHorizontal: 5,
            paddingVertical: 5,
          }}
        >
          <HStack alignItems={"center"}>
            <Box
              style={{
                paddingHorizontal: 5,
              }}
            >
              <AiFillStar size={30} color={"#712e5a"} />
            </Box>
            <Box>
              <Text fontSize={16} fontWeight={"bold"}>
                {
                  x?.display_element_contents?.find((y) => y.locale === "en")
                    .value_display_format
                }
              </Text>
            </Box>
          </HStack>
          <Divider my={2} />

          <>
            {x.children.map((y, index) => {
              let display_value = y.display_element_contents?.find(
                (x) => x.locale === "en"
              ).value_display_format;
              let element1_value = "";
              let element2_value = "";
              let element3_value = "";
              if (y.element1_id) element1_value = findElement(y.element1_id);
              if (y.element2_id) element2_value = findElement(y.element2_id);
              if (y.element3_id) element3_value = findElement(y.element3_id);

              return (
                <HStack
                  key={index}
                  alignItems={"center"}
                  paddingX={2}
                  paddingVertical={5}
                >
                  <Box
                    style={{
                      paddingHorizontal: 5,
                    }}
                  >
                    {React.createElement(Icons[y.icon], {
                      color: y.color_theme,
                      size: 18,
                    })}
                    {/* <FaHeart size={18} color={"#3399ff"} /> */}
                  </Box>

                  <Text py={1} color={"black"}>
                    {y.element1_id &&
                      y.element2_id &&
                      y.element3_id &&
                      display_value
                        .replace("element1", element1_value)
                        .replace("element2", element2_value)
                        .replace("element3", element3_value)}
                    {y.element1_id &&
                      y.element2_id &&
                      !y.element3_id &&
                      display_value
                        .replace("element1", element1_value)
                        .replace("element2", element2_value)}
                    {y.element1_id &&
                      !y.element2_id &&
                      !y.element3_id &&
                      display_value.replace("element1", element1_value)}
                  </Text>
                </HStack>
              );
            })}
          </>
        </Box>
      );
    });
  };
  return <>{renderDisplayElement()}</>;
};
export default DisplayElementConstructor;
