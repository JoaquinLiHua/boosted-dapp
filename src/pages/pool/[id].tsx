import React from "react";
import { useRouter } from "next/router";
import {
  Stack,
  Heading,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Flex,
  Image,
} from "@chakra-ui/core";
import { usePoolContext } from "src/context/PoolContext";
import { StakingPanel } from "src/components/pools/StakingPanel";
import { BoostPanel } from "src/components/pools/BoostPanel";

const Pool: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { openPools } = usePoolContext();

  const currentPool = openPools.filter((e) => e.code === id);

  if (id && openPools && currentPool.length > 0) {
    return (
      <Stack mt={4} width="100%" p={4} borderWidth={1} borderRadius={5}>
        <Flex alignItems="center">
          <Image src={currentPool[0].icon} width="10" height="10" />
          <Heading fontSize="lg" p={4}>
            {currentPool[0].name} Pool
          </Heading>
        </Flex>
        <Tabs>
          <TabList>
            <Tab>Staking</Tab>
            <Tab>Boosting</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <StakingPanel pool={currentPool[0]} />
            </TabPanel>
            <TabPanel>
              <BoostPanel pool={currentPool[0]} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    );
  } else {
    return <></>;
  }
};

export default Pool;
