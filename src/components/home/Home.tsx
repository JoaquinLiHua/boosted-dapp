import React from "react";
import { Box, Flex } from "@chakra-ui/core";
import { PoolTable } from "./PoolTable";
import { Stats } from "./Stats";

export const Home: React.FC = () => {
  return (
    <Flex justifyContent="space-between" width="100%">
      <Box flex={1}>
        <Stats />
      </Box>
      <Box flex={4}>
        <PoolTable />
      </Box>
    </Flex>
  );
};
