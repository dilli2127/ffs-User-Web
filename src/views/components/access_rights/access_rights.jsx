import React, { useEffect, useState } from "react";
import { Box, Center, HStack, Text, VStack } from "native-base";
import { Scrollbars } from "react-custom-scrollbars-2";
import ManageRole from "./role/manage_role";
import ManagePage from "./page/manage_page";
import AddEndpoint from "./endpoint/add_endpoint";
import RoleList from "./role/role_list";
import PageList from "./page/page_list";
const AccessRights = (props) => {
  return (
    <Box w="100%">
      <VStack>
        <HStack w="100%">
          <Center flex={1}>
            <Text
              w="95%"
              fontSize="16px"
              fontWeight="bold"
              textTransform="uppercase"
            >
              Access Rights
            </Text>
          </Center>
          <HStack w="340px" h="75px" space="10px" justifyContent="center">
            <Center w="100px">
              <ManageRole />
            </Center>
            <Center w="100px">
              <ManagePage />
            </Center>
            <Center w="100px">
              <AddEndpoint />
            </Center>
          </HStack>
        </HStack>
        <Box>
          <Scrollbars
            id="sbSuperAdminContent"
            style={{ width: "100%", height: "400px" }}
            renderView={(props) => (
              <div {...props} style={{ ...props.style, overflowX: "hidden" }} />
            )}
          >
            <HStack position="sticky" top="0px" zIndex="2">
              <Center
                position="sticky"
                left="0px"
                w="200px"
                h="75px"
                bg="red.300"
                borderTopWidth="1px"
                borderBottomWidth="1px"
                borderLeftWidth={"1px"}
                borderRightWidth={"1px"}
                borderTopColor="black"
                borderBottomColor="black"
                borderLeftColor="black"
                borderRightColor="black"
                zIndex="2"
              >
                <Text
                  fontSize="16px"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  Pages
                </Text>
              </Center>
              <RoleList />
            </HStack>
            <PageList />
            <HStack>
              <Center
                position="sticky"
                left="0px"
                w="200px"
                h="40px"
                bg="red.300"
                borderTopWidth="1px"
                borderBottomWidth="1px"
                borderLeftWidth={"1px"}
                borderRightWidth={"1px"}
                borderTopColor="black"
                borderBottomColor="black"
                borderLeftColor="black"
                borderRightColor="black"
                zIndex="2"
              >
                <Text w="180px" fontSize="14px">
                  Pages
                </Text>
              </Center>
            </HStack>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
            <p>
              Some great content that are even bigger to full length for this
              purpose only
            </p>
          </Scrollbars>
        </Box>
      </VStack>
    </Box>
  );
};
export default AccessRights;
