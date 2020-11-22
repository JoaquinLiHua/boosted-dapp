import { Stack, Heading } from "@chakra-ui/react";
import React from "react";
import { Vote } from "src/components/gov/Vote";

const Gov: React.FC = () => {
  return (
    <Stack spacing={4} mt={4} width="100%">
      <Heading>Governance</Heading>
      <Vote />
    </Stack>
  );
};

export default Gov;
