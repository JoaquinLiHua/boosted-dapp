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
import { useRouter } from "next/router";

export const Header = ({ changingRoute }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
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
      copy: "bVaults V2",
      link: "/bVaultsV2",
    },
    {
      copy: "Gov",
      link: "/gov",
    },
    {
      copy: "Pools",
      link: "/pools",
    },
  ];
  return (
    <Flex
      py={8}
      position="relative"
      justifyContent="space-between"
      alignItems="center"
      maxWidth="1200px"
      margin="auto"
      flexDirection={["column", "column", "row"]}
    >
      <Flex alignItems="center" my={[4, 4, 0]}>
        {ROUTES.map((route, i) => (
          <NextLink href={route.link} key={i}>
            <Link
              borderBottomColor={
                router.pathname === route.link ? "blue.300" : "transparent"
              }
              borderBottomWidth={1}
              fontSize={["sm", "lg"]}
              mr={8}
              fontWeight="600"
            >
              {route.copy}
            </Link>
          </NextLink>
        ))}
        {changingRoute && <Spinner mr={4} color="grey.500" size="sm" />}
      </Flex>
      <Flex>
        <SettingsMenus />
        <Tooltip label="Toggle dark mode">
          <IconButton
            size="sm"
            ml={4}
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
