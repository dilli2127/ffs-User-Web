import React, { useEffect, useState } from "react";
import { Box, Center, HStack, Text, VStack } from "native-base";
import { useDynamicSelector } from "@services/redux";
import PageItem from "./page_item";
const PageList = (props) => {
  const { loading: pages_loading, items: pages } = useDynamicSelector("pages");
  return (
    <VStack>
      {pages &&
        pages.map((page, page_index) => (
          <PageItem key={page_index} item={page} index={page_index} />
        ))}
    </VStack>
  );
};
export default PageList;
