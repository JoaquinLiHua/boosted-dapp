import React from "react";
import {
  Flex,
  Stack,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Heading,
} from "@chakra-ui/core";
import { ProposalRow } from "src/components/vote/ProposalRow";
import { useProposals } from "src/hooks/useProposals";
import { useModal } from "src/context/ModalContext";
import { ProposalFormModal } from "src/components/vote/ProposalFormModal";
import { useWallet } from "use-wallet";

export const Vote: React.FC = () => {
  const proposals = useProposals();
  const [onPresentProposalForm] = useModal(<ProposalFormModal />);
  const { account } = useWallet();
  return (
    <Flex justifyContent="space-between" width="100%">
      <Stack spacing="1.5rem" mr="4" mt="4" flex={1} width="100%">
        <Flex justifyContent="space-between">
          <Heading size="md">PROPOSALS</Heading>
          {account && (
            <Button onClick={() => onPresentProposalForm()} size="sm">
              Start a proposal
            </Button>
          )}
        </Flex>
        <Flex>
          <Text
            fontSize="sm"
            as="a"
            href="https://github.com/Boosted-Finance/BFIPs"
            target="_blank"
          >
            Create a proposal template here
          </Text>
        </Flex>
        <Tabs variant="enclosed">
          <TabList mb="1em">
            <Tab>Core</Tab>
            <Tab>Community</Tab>
          </TabList>
          <TabPanels>
            <TabPanel w="100%">
              {proposals &&
                proposals.map((e, i) => {
                  if (i === 0) {
                    return <ProposalRow key={i} pid={i} proposal={e} />;
                  } else {
                    return;
                  }
                })}
            </TabPanel>
            <TabPanel w="100%">
              {proposals &&
                proposals.map((e, i) => {
                  if (i > 0) {
                    return <ProposalRow key={i} pid={i} proposal={e} />;
                  } else {
                    return;
                  }
                })}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Flex>
  );
};
