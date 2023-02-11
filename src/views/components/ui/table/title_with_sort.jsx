import React from "react";
import { Box } from "native-base";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

const TitleWithSort = (props) => {
  let selectedColor = "#dbdbdb";
  let unselectedColor = "#8a8a8a";

  let upColor = unselectedColor;
  let downColor = unselectedColor;
  if (props.isActive) {
    if (props.sortOrder === "asc") {
      upColor = selectedColor;
      downColor = unselectedColor;
    } else {
      upColor = unselectedColor;
      downColor = selectedColor;
    }
  }
  return (
    <Box flex="1" w="100%" flexDirection="row" style={{ cursor: "pointer" }}>
      <Box
        w="calc(100% - 20px)"
        alignItems="flex-start"
        float="left"
        // textTransform="uppercase"
        _text={{ color: props.headerColor, fontWeight: "bold" }}
      >
        {props.title}
      </Box>
      <Box width="20px" float="left" position="relative">
        <Box position="absolute" top="-4px">
          <IoMdArrowDropup size="20" color={upColor} />
        </Box>
        <Box position="absolute" top="4px">
          <IoMdArrowDropdown size="20" color={downColor} />
        </Box>
      </Box>
    </Box>
  );
};
export default TitleWithSort;
