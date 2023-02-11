import React from "react";
import { Box } from "native-base";

const ActionTitle = (props) => {
  return (
    <Box flex="1" w="100%" flexDirection="row" style={{ cursor: "default" }}>
      <Box
        w="100%"
        alignItems="center"
        float="left"
        // textTransform="uppercase"
        _text={{ color: props.headerColor, fontWeight: "bold" }}
      >
        {props.title}
      </Box>
    </Box>
  );
};
export default ActionTitle;
