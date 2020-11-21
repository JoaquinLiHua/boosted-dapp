import React from "react";
import {
  Box,
  Flex,
  Tabs,
  Text,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { OpenPoolTable } from "./OpenPoolTable";
import { ClosedPoolTable } from "./ClosedPoolTable";
import { isMobile } from "react-device-detect";
import { PoolProvider } from "src/context/PoolContext";

export const Pools: React.FC = () => {
  return (
    <PoolProvider>
      <Flex
        justifyContent="space-between"
        width="100%"
        flexDirection={["column", "column", "row"]}
      >
        {isMobile && (
          <Text my={4} fontSize="xs">
            Scroll for more ➡️
          </Text>
        )}
        <Box flex={4}>
          <Tabs>
            <TabList>
              <Tab>Open</Tab>
              <Tab>Closed</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p={0}>
                <OpenPoolTable />
              </TabPanel>
              <TabPanel p={0}>
                <ClosedPoolTable />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </PoolProvider>
  );
};
