import React from "react";
import { Box } from "native-base";

const Title = (props) => {
  return (
    <Box flex="1" w="100%" flexDirection="row" style={{ cursor: "default" }}>
      <Box
        w="calc(100% - 20px)"
        alignItems="flex-start"
        float="left"
        // textTransform="uppercase"
        _text={{ color: props.headerColor, fontWeight: "bold" }}
      >
        {props.title}
      </Box>
    </Box>
  );
};
export default Title;
