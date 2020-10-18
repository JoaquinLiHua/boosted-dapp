import React from "react";
import { useRouter } from "next/router";
import {
  Stack,
  Heading,
  Tabs,
  Tab,
  TabList,
  Flex,
  Image,
  Box,
  TabPanel,
  TabPanels,
} from "@chakra-ui/core";
import { useVaultContext } from "src/context/VaultContext";
import { DepositPanel } from "src/components/bVaults/DepositPanel";
import { StakePanel } from "src/components/bVaults/StakePanel";
import { BoostPanel } from "src/components/bVaults/BoostPanel";
import { HarvestPanel } from "src/components/bVaults/HarvestPanel";

const Vault: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { vaults } = useVaultContext();

  const currentVault = vaults.filter((e) => e.id === id)[0];

  if (id) {
    return (
      <Stack mt={4} width="100%" p={4} borderWidth={1} borderRadius={5}>
        <Flex alignItems="center">
          <Image src={currentVault.tokenIcon} width="10" height="10" />
          <Heading fontSize="lg" p={4}>
            {currentVault.title} Vault
          </Heading>
        </Flex>
        <Box
          color="gray.400"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
        >
          {currentVault.wantTokenTicker} &bull; {currentVault.vaultTokenTicker}
          &bull; {currentVault.strategyName}
        </Box>
        <Tabs>
          <TabList>
            <Tab>Convert</Tab>
            <Tab>Stake</Tab>
            <Tab>Boost</Tab>
            <Tab>Harvest</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DepositPanel vault={currentVault} />
            </TabPanel>
            <TabPanel>
              <StakePanel vault={currentVault} />
            </TabPanel>
            <TabPanel>
              <BoostPanel vault={currentVault} />
            </TabPanel>
            <TabPanel>
              <HarvestPanel vault={currentVault} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    );
  } else {
    return <></>;
  }
};

export default Vault;
