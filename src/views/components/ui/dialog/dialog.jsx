import React from "react";
import { AlertDialog, HStack, Box } from "native-base";
import ActionButton from "./action_button";
import { useWindowSize } from "@helpers/dimension";

const Dialog = (props) => {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const cancelRef = React.useRef(null);
  const styles = {
    top: {
      marginBottom: "auto",
      marginTop: 20,
    },
    bottom: {
      marginBottom: 20,
      marginTop: "auto",
    },
    left: {
      marginLeft: 0,
      marginRight: "auto",
    },
    right: {
      marginLeft: "auto",
      marginRight: 0,
    },
    center: {},
  };

  return (
    <AlertDialog
      isOpen={props.isOpen}
      onClose={props.onClose}
      size={props.size || "md"}
    >
      <AlertDialog.Content
        maxH={windowHeight}
        {...styles[props.placement || "top"]}
      >
        <AlertDialog.CloseButton />
        {props.header && (
          <AlertDialog.Header>{props.header}</AlertDialog.Header>
        )}
        <AlertDialog.Body>{props.content}</AlertDialog.Body>
        {props.actions && props.actions.length > 0 && (
          <AlertDialog.Footer>
            <HStack space={2} justifyContent="flex-end">
              {props.actions.map((action, index) => (
                <Box key={`action-${index}`}>
                  <ActionButton
                    {...action}
                    group={props.group}
                    source={props.source}
                  />
                </Box>
              ))}
            </HStack>
          </AlertDialog.Footer>
        )}
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default Dialog;
