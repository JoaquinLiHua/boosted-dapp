import React from "react";
import { Flex, Heading, Link, Spinner } from "@chakra-ui/core";
import { DarkModeSwitch } from "./DarkModeSwitch";
import NextLink from "next/link";
import { isMobile } from "react-device-detect";

export const Header = ({ changingRoute }) => (
  <Flex
    my="16px"
    position="relative"
    justifyContent="space-between"
    alignItems="center"
    width="100%"
  >
    <Flex flex="1" alignItems="center">
      <Heading fontSize={"lg"}>🚀 {!isMobile && "B00STED FINANCE"}</Heading>
      {changingRoute && <Spinner ml={4} color="grey.500" size="sm" />}
    </Flex>
    <Flex flex="2" justifyContent="center">
      <NextLink href="/">
        <Link fontSize={["sm", "lg"]} m="4" fontWeight="600">
          HOME
        </Link>
      </NextLink>
      <Link
        as="a"
        target="_blank"
        href="https://medium.com/@BoostedFinance/boosted-finance-its-not-rocket-science-it-s-alpha-81acf4af2887"
        fontSize={["sm", "lg"]}
        m="4"
        fontWeight="600"
      >
        ABOUT
      </Link>
      <NextLink href="/vote">
        <Link fontSize={["sm", "lg"]} m="4" fontWeight="600">
          VOTE
        </Link>
      </NextLink>
    </Flex>
    <Flex flex="1" display="flex" justifyContent="flex-end">
      <DarkModeSwitch />
    </Flex>
  </Flex>
);
