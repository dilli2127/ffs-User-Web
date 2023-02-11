import React, { useRef } from "react";
import { Box as NativebaseBox } from "native-base";
import { useComponentSize } from "@helpers/dimension";

const Wrapper = (props) => {
  let parentRef = useRef(null);
  const { width: parentWidth } = useComponentSize(parentRef);
  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (parentWidth > 0) {
      if (React.isValidElement(child)) {
        let childWidth = child.props.w || child.props.width;
        if (!childWidth) {
          childWidth = "auto";
        } else if (childWidth.indexOf("calc") > -1) {
          let percentage = parseInt(
            childWidth.substring(
              childWidth.indexOf("(") + 1,
              childWidth.indexOf("%")
            )
          );
          let toSubtract = parseInt(
            childWidth
              .substring(childWidth.indexOf("-") + 1, childWidth.indexOf("px"))
              .trim()
          );
          let toAdd = parseInt(
            childWidth
              .substring(childWidth.indexOf("+") + 1, childWidth.indexOf("px"))
              .trim()
          );
          childWidth = (percentage / 100) * parentWidth;
          if (!isNaN(toSubtract)) {
            childWidth = childWidth - toSubtract;
          }
          if (!isNaN(toAdd)) {
            childWidth = childWidth + toAdd;
          }
        } else if (childWidth.indexOf("%") > -1) {
          let percentage = parseInt(childWidth.replace("%", ""));
          childWidth = (percentage / 100) * parentWidth;
        }
        return React.cloneElement(child, {
          ...child.props,
          width: childWidth,
        });
      }
      return child;
    } else {
      return <></>;
    }
  });

  return (
    <NativebaseBox ref={parentRef} {...props}>
      {childrenWithProps}
    </NativebaseBox>
  );
};
export default Wrapper;
