import React from "react";
import { Link as ReactLink } from "react-router-dom";
import {
  Box,
  Text,
  VStack,
  HStack,
  Center,
  Link,
  useTheme,
  useColorModeValue,
} from "native-base";
import { ImSad } from "react-icons/im";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <>
      <Center my="auto" bg={"#712e5a"} flex="1">
        <VStack space="4">
          <Center>
            <ImSad size="175" color={colors["primaryContent"]["300"]} />
          </Center>
          <Box alignItems="center">
            <Text
              fontSize={{
                base: "90",
                md: "80",
              }}
              fontWeight="bold"
              color={useColorModeValue(
                "primaryContent.300",
                "primaryContent.300"
              )}
            >
              {t("404")}
            </Text>
          </Box>
          <Center>
            <Text
              fontSize={{
                base: "20",
                md: "20",
              }}
              fontWeight="bold"
              color={useColorModeValue(
                "primaryContent.300",
                "primaryContent.300"
              )}
            >
              {t("page_not_exist")}
            </Text>
          </Center>
          <Center>
            <HStack>
              <Text
                fontSize="sm"
                fontWeight="bold"
                textDecoration="none"
                color={useColorModeValue(
                  "primaryContent.300",
                  "primaryContent.300"
                )}
              >
                {t("go_back_to")}
              </Text>
              <Text
                fontSize="sm"
                fontWeight="bold"
                textDecoration="none"
                color={useColorModeValue(
                  "primaryContent.300",
                  "primaryContent.300"
                )}
              >
                {" "}
              </Text>
              <ReactLink to="/">
                <Link
                  _text={{
                    fontSize: "sm",
                    fontWeight: "bold",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    color: useColorModeValue(
                      "primaryContent.300",
                      "primaryContent.300"
                    ),
                  }}
                  _hover={{
                    _text: {
                      color: useColorModeValue(
                        "primaryContent.400",
                        "primaryContent.400"
                      ),
                    },
                  }}
                >
                  {t("home")}
                </Link>
              </ReactLink>
            </HStack>
          </Center>
        </VStack>
      </Center>
    </>
  );
};
export default NotFound;
