import React from "react";
import { Carousel } from "antd";
import {
  Box,
} from "native-base";
import Image1 from "@assets/images/landing.JPG"

const contentStyle = {
  height: "720px",
  width: "100%",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const Slider = () => (
  <Box >
    <Carousel dotPosition="right" effect="scrollx" autoplay style={{
      borderRadius: "10px"
    }}>
      <div>
        <img src={Image1} alt="image1" style={contentStyle} />
      </div>
      <div>
        <img src={Image1} alt="image1" style={contentStyle} />
      </div>
      <div>
        <img src={Image1} alt="image1" style={contentStyle} />
      </div>
      <div>
        <img src={Image1} alt="image1" style={contentStyle} />
      </div>
    </Carousel>
  </Box>
);

export default Slider;
