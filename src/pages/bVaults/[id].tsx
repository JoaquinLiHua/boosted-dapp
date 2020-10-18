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
} from "@chakra-ui/core";
import { useVaultContext } from "src/context/VaultContext";

const Vault: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { vaults } = useVaultContext();

  const currentVault = vaults.filter((e) => e.id === id);

  if (id) {
    return (
      <Stack mt={4} width="100%" p={4} borderWidth={1} borderRadius={5}>
        <Flex alignItems="center">
          <Image src={currentVault[0].tokenIcon} width="10" height="10" />
          <Heading fontSize="lg" p={4}>
            {currentVault[0].title} Vault
          </Heading>
        </Flex>
        <Tabs>
          <TabList>
            <Tab>Convert</Tab>
            <Tab>Stake</Tab>
          </TabList>
        </Tabs>
      </Stack>
    );
  } else {
    return <></>;
  }
};

export default Vault;
