import React from "react";
import { IconButton, Tooltip, useTheme } from "native-base";

const ActionIconButton = (props) => {
  const { colors } = useTheme();
  let iconColor = colors["primary"]["700"];
  if (props.iconColor) {
    if (props.iconColor.indexOf(".") > -1) {
      iconColor =
        colors[props.iconColor.split(".")[0]][props.iconColor.split(".")[1]];
    } else {
      iconColor = props.iconColor;
    }
  }

  const Icon = () => {
    const element = React.cloneElement(props.icon, {
      color: iconColor,
      size: props.iconSize || 20,
    });
    return <>{element}</>;
  };
  return (
    <Tooltip
      display={props.title ? "block" : "none"}
      label={props.title}
      _dark={{
        bg: "primary.400",
      }}
      _light={{
        bg: "primary.400",
      }}
      _text={{
        color: "#fff",
      }}
      _text={{
        color: "#fff",
      }}
    >
      <IconButton
        variant="unstyled"
        icon={<Icon />}
        onPress={() => {
          props.onPress(props.record);
        }}
      />
    </Tooltip>
  );
};
export default ActionIconButton;
