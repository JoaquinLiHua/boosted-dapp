import React from "react";
import { Text, Stack } from "@chakra-ui/core";

export const NewsBlock = () => (
  <Stack my="4" spacing={2}>
    <Text fontSize="sm" textAlign="center">
      There have been no official third-party audits for Boosted Finance
      although core contributors have made extensive efforts to secure smart
      contracts including forking the codebases of notable and established
      projects.
    </Text>
    <Text fontSize="sm" textAlign="center">
      ⚠️ We urge all users who engage with staking contracts to self-audit and
      read through contracts before putting your LP tokens at stake. You will be
      using this BETA product at your own risk.
    </Text>
  </Stack>
);
