import React, { useEffect, useState } from "react";
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
  Spinner,
} from "@chakra-ui/core";
import { ProposalRow } from "src/components/vote/ProposalRow";
import { useProposals } from "src/hooks/useProposals";
import { useModal } from "src/context/ModalContext";
import { ProposalFormModal } from "src/components/vote/ProposalFormModal";
import { useWallet } from "use-wallet";

export const Vote: React.FC = () => {
  const proposals = useProposals();
  const [onPresentProposalForm] = useModal(<ProposalFormModal />);
  // const [onPresentProposalForm] = useModal(<ProposalFormModal />);
  // const [onPresentProposalForm] = useModal(<ProposalFormModal />);
  const { account } = useWallet();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (proposals && account) {
      setLoading(false);
    }
  }, [proposals]);
  return (
    <Flex justifyContent="space-between" width="100%">
      <Stack spacing="1.5rem" mr="4" mt="4" flex={1} width="100%">
        <Heading size="md">PROPOSALS</Heading>
        {account && (
          <Stack direction={["column", "column", "row"]} spacing={4}>
            <Button onClick={() => onPresentProposalForm()} size="sm" w={125}>
              + PROPOSE
            </Button>
            <Button onClick={() => onPresentProposalForm()} size="sm" w={125}>
              STAKE
            </Button>
            <Button onClick={() => onPresentProposalForm()} size="sm" w={125}>
              WITHDRAW
            </Button>
          </Stack>
        )}
        {/* <Text
          fontSize="sm"
          as="a"
          href="https://github.com/Boosted-Finance/BFIPs"
          target="_blank"
        >
          Create a proposal template here
        </Text> */}
        <Tabs variant="enclosed">
          <TabList mb="1em">
            <Tab>Core</Tab>
            <Tab>Community</Tab>
          </TabList>
          <TabPanels>
            <TabPanel w="100%">
              {!account ? (
                <Flex justifyContent="center" alignItems="center" pt={4}>
                  <Text fontSize="sm">Please unlock your wallet</Text>
                </Flex>
              ) : loading ? (
                <Flex justifyContent="center" alignItems="center" pt={4}>
                  <Spinner color="grey.500" />
                </Flex>
              ) : (
                proposals &&
                proposals.map((e, i) => {
                  if (i === 0) {
                    return <ProposalRow key={i} pid={i} proposal={e} />;
                  } else {
                    return;
                  }
                })
              )}
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
