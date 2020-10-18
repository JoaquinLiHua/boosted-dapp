import React from "react";
import { Heading, Stack } from "@chakra-ui/core";
import { VaultCard } from "src/components/bVaults/VaultCard";
import { useVaultContext } from "src/context/VaultContext";

const Index: React.FC = () => {
  const { vaults } = useVaultContext();
  return (
    <Stack spacing={4} mt={4} width="100%">
      <Heading>bVaults</Heading>
      <Stack>
        {vaults.map((vault, i) => (
          <VaultCard vault={vault} />
        ))}
      </Stack>
    </Stack>
  );
};

export default Index;
