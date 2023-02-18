import React from "react";
import { Card } from "antd";
import {
  Box,
  HStack,
  Text,
  VStack,
  ScrollView,
  Center,
  Button,
} from "native-base";
import { borderRadius } from "styled-system";

const { Meta } = Card;

const AntdCard = () => {
    const cars = ["Saab", "Volvo", "BMW"];
    const array1 = ["Cecilie", "Lone"];
const array2 = ["Emil", "Tobias", "Linus"];
const array3 = ["Robin", "Morgan"];

const myChildren = array1.concat(array2, array3); 
console.log("ffffff",myChildren)

  return (
    <Box backgroundColor="red.200" padding="20px">
      <Card
        hoverable
        style={{ width: 240, borderRadius:"10px" }}
        cover={
          <img
            alt="example"
            src="https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A2291-Edit.jpg"
            
          />
        }
      >
        <Meta title={cars} description="FRESHFOCUZSTUDIO" />
      </Card>
    </Box>
  );
};

export default AntdCard;
