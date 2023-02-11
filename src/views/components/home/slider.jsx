import React from "react";
import { Carousel } from "antd";
import {
  Box,
  Center,
  Heading,
  Hidden,
  HStack,
  Pressable,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from "native-base";

const contentStyle = {
  height: "360px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
 
};

const Slider = () => (
  <Box >
    <Carousel autoplay style={{
 borderRadius:"10px"
    }}>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  </Box>
);

export default Slider;
