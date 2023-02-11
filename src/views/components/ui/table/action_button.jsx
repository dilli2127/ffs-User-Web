import React from "react";
import { Button } from "native-base";

const ActionButton = (props) => {
  return <Button {...props}>{props.label}</Button>;
};
export default ActionButton;
