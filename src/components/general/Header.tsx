import React from "react";
import {
  Flex,
  IconButton,
  Link,
  Spinner,
  Tooltip,
  useColorMode,
} from "@chakra-ui/core";
import NextLink from "next/link";
import { SettingsMenus } from "./SettingsMenu";
import { FaMoon, FaSun } from "react-icons/fa";

export const Header = ({ changingRoute }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const ROUTES = [
    {
      copy: "Dashboard",
      link: "/",
    },
    {
      copy: "bVaults",
      link: "/bVaults",
    },
    {
      copy: "Gov",
      link: "/gov",
    },
    {
      copy: "Farms",
      link: "/farms",
    },

    {
      copy: "Stake",
      link: "/stake",
    },
  ];

  return (
    <Flex
      my={8}
      position="relative"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <Flex alignItems="center">
        {changingRoute && <Spinner ml={4} color="grey.500" size="sm" />}
        {ROUTES.map((route) => (
          <NextLink href={route.link}>
            <Link fontSize={["sm", "lg"]} mx={4} fontWeight="600">
              {route.copy}
            </Link>
          </NextLink>
        ))}
      </Flex>
      <Flex>
        <SettingsMenus />
        <Tooltip label="Toggle dark mode">
          <IconButton
            size="sm"
            mx={4}
            onClick={() => toggleColorMode()}
            aria-label="toggle-dark-mode"
            isRound={true}
            variant="ghost"
            icon={isDark ? <FaSun /> : <FaMoon />}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};
