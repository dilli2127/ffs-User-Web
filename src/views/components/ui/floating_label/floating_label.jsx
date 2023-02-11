import React, { Component } from "react";
import { Animated } from "react-native";
import { Box } from "native-base";
import { Platform } from "react-native";

export default class FloatingLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };

    this._animatedIsFocused = new Animated.Value(!this.props.hasValue ? 0 : 1);
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      duration: 200,
      useNativeDriver: false,
      toValue: this.state.isFocused || this.props.hasValue ? 1 : 0,
    }).start();
  }

  render() {
    const { label, ...props } = this.props;
    const lableContainerStyles = {
      position: "absolute",
      left: props.left,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [props.blurTop, props.focusTop],
      }),
      zIndex: 5,
      paddingLeft: 3,
      paddingRight: 3,
      backgroundColor: this.props.labelBGColor,
    };
    const AndroidlabelStyle = {
      fontWeight: "500",
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 14],
      }),
      color: this.props.labelColor,
      // textTransform: "uppercase",
    };
    const IOSlabelStyle = {
      fontWeight: "500",
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 14],
      }),

      marginTop: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [-3, 0],
      }),
      color: this.props.labelColor,
      // textTransform: "uppercase",
    };
    return (
      <Animated.View pointerEvents="none" style={lableContainerStyles}>
        <Animated.Text
          style={Platform.OS === "android" ? AndroidlabelStyle : IOSlabelStyle}
        >
          <Box
            _text={{
              color: this.props.labelColor,
              fontSize: this.props.fontSize,
            }}
          >
            {label}
          </Box>
          <Box _text={{ color: "#ff5500" }}>
            {this.props.isRequired ? " *" : ""}
          </Box>
        </Animated.Text>
      </Animated.View>
    );
  }
}
