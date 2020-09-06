import React from "react";
import { Box, Flex, Text } from "@chakra-ui/core";
import { PoolTable } from "./PoolTable";
import { Stats } from "./Stats";
import { isMobile } from "react-device-detect";

export const Home: React.FC = () => {
  return (
    <Flex
      justifyContent="space-between"
      width="100%"
      flexDirection={["column", "column", "row"]}
    >
      <Box flex={1}>
        {isMobile && (
          <Text my={4} fontSize="xs">
            Scroll for more ➡️
          </Text>
        )}
        <Stats />
      </Box>
      <Box flex={4}>
        <PoolTable />
      </Box>
    </Flex>
  );
};
