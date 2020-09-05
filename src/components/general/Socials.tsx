import React from "react";
import { Flex, Box } from "@chakra-ui/core";
import { FaDiscord, FaMedium, FaGithub, FaTwitter } from "react-icons/fa";

export const Socials = () => (
  <Flex py="2">
    <a
      href="https://twitter.com/BoostedFinance"
      target="_blank"
      rel="noreferrer"
    >
      <Box as={FaTwitter} boxSize="24px" mx="4px" />
    </a>
    <a
      href="https://github.com/Boosted-Finance"
      target="_blank"
      rel="noreferrer"
    >
      <Box as={FaGithub} boxSize="24px" mx="4px" />
    </a>
    <a
      href="https://medium.com/@BoostedFinance/"
      target="_blank"
      rel="noreferrer"
    >
      <Box as={FaMedium} boxSize="24px" mx="4px" />
    </a>
    <a href="https://discord.gg/gp9bsaQ" target="_blank" rel="noreferrer">
      <Box as={FaDiscord} boxSize="24px" mx="4px" />
    </a>
  </Flex>
);
