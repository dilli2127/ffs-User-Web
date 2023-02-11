import React, { useState } from "react";
import { Box, VStack } from "native-base";
import ScrollView from "@views/components/ui/scroll_view";
import Header from "@views/components/layout/header";
const Layout1 = ({ children }) => {
  console.log(children);
  return (
    <Box flexDirection="row" flexGrow="1" overflow={"hidden"}>
      <VStack flex={1}>
        <ScrollView>
          <Header/>
          <Box flex={1}>{children}</Box>
          {/* <FooterPage /> */}
        </ScrollView>
      </VStack>
    </Box>
  );
};
export default Layout1;
