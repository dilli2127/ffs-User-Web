import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "native-base";

const ActionButton = (props) => {
  const dispatch = useDispatch();

  const onPress = () => {
    if (props.submit) {
      if (props?.source?.data) {
        dispatch(
          props.submit({ id: props?.source?.id, data: props?.source?.data })
        );
      } else {
        dispatch(props.submit({ id: props?.source?.id }));
      }
    } else {
      props.onPress();
    }
  };

  return (
    <Button {...props} onPress={onPress}>
      {props.label}
    </Button>
  );
};
export default ActionButton;
