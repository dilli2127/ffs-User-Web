import React, { useRef, useState } from "react";
import {
  Input,
  Box,
  IconButton,
  useColorModeValue,
  useTheme,
} from "native-base";

import FloatingLabel from "../floating_label";
import { IoMdCloseCircle } from "react-icons/io";

let timeout = null;
const SearchBox = (props) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState("");
  let labelRef = useRef("");

  const onChangeText = (txt) => {
    setText(txt);
    if (props.onSearch) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        props.onSearch(txt);
      }, 200);
    }
  };
  let boxColor = "inputBorder.300";
  if (isFocused) {
    boxColor = "primary.400";
  }
  return (
    <Box w={props.width} position="relative" h="50px">
      <FloatingLabel
        {...props}
        value={text}
        isFocused={isFocused}
        ref={labelRef}
        labelColor="#6e6e6e"
        labelBGColor={useColorModeValue("#fff", "#1f2937")}
        blurTop={17}
        focusTop={-9}
        left={10}
      />
      <Box
        position="absolute"
        left="0px"
        top="0px"
        width="100%"
        height="50px"
        bg="#ffffff"
        borderRadius="6"
        _dark={{
          borderWidth: "1px",
          borderColor: isFocused ? "primary.400" : boxColor,
        }}
        _light={{
          borderWidth: "1px",
          borderColor: isFocused ? "primary.400" : boxColor,
        }}
        style={{
          transition: "all .5s ease",
          WebkitTransition: "all .5s ease",
          MozTransition: "all .5s ease",
        }}
      >
        <Input
          {...props}
          type={"text"}
          isRequired={false}
          value={text}
          onFocus={() => {
            setIsFocused(true);
            labelRef.current.handleFocus();
          }}
          onBlur={() => {
            setIsFocused(false);
            labelRef.current.handleBlur();
          }}
          onChangeText={(val) => {
            onChangeText(val);
          }}
          _hover={{ bg: props.labelBGColor }}
          fontSize={"16px"}
          fontWeight={"medium"}
          height="50px"
          borderColor="transparent"
          _focus={{
            borderColor: "transparent",
          }}
          autoComplete="chrome-off"
        />
      </Box>
      {text && (
        <IconButton
          position="absolute"
          right="0px"
          top="8px"
          variant="unstyled"
          icon={<IoMdCloseCircle size={20} color={colors["primary"]["700"]} />}
          onPress={() => {
            onChangeText("");
          }}
        />
      )}
    </Box>
  );
};

export default SearchBox;
