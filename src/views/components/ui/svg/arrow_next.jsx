import React from "react";
import { useTheme } from "native-base";

const ArrowNext = ({ ...props }) => {
  const { colors } = useTheme();
  let enabledColor = colors["primary"]["700"];
  let disabledColor = colors["coolGray"]["400"];
  let color = null;
  if (props.disabled) {
    color = disabledColor;
  } else {
    color = enabledColor;
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="20"
      {...props}
    >
      <path
        d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"
        fill={color}
        stroke={color}
      />
    </svg>
  );
};

export default ArrowNext;
