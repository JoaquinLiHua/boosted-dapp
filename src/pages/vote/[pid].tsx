import React, { useState } from "react";
import { useRouter } from "next/router";
import { Text, Stack, Heading, Flex, Button } from "@chakra-ui/core";
import { useSingleProposal } from "src/hooks/useSingleProposal";
import BN from "bignumber.js";
import { getFullDisplayBalance } from "src/utils/formatBalance";
import { useVoteAgainst } from "src/hooks/useVoteAgainst";
import { useVoteFor } from "src/hooks/useVoteFor";

const Proposal: React.FC = () => {
  const router = useRouter();
  const { pid } = router.query;
  const proposal = useSingleProposal(pid);
  const { onVoteFor } = useVoteFor(pid);
  const { onVoteAgainst } = useVoteAgainst(pid);
  const [requestedFor, setRequestedFor] = useState<boolean>(false);
  const [requestedAgainst, setRequestedAgainst] = useState<boolean>(false);

  const handleVoteFor = async () => {
    try {
      setRequestedFor(true);
      const txHash = await onVoteFor();
      if (!txHash) {
        throw "Transactions error";
      } else {
        setRequestedFor(false);
      }
    } catch (e) {
      console.log(e);
      setRequestedFor(false);
    }
  };

  const handleVoteAgainst = async () => {
    try {
      setRequestedAgainst(true);
      const txHash = await onVoteAgainst();
      if (!txHash) {
        throw "Transactions error";
      } else {
        setRequestedAgainst(false);
      }
    } catch (e) {
      console.log(e);
      setRequestedAgainst(false);
    }
  };

  if (proposal) {
    return (
      <Stack colorScheme="white" spacing={4} width="100%">
        <Heading>BFIP-0</Heading>
        <Text as="a" href={proposal.url} target="_blank">
          {proposal.url}
        </Text>
        <Flex>
          <Text fontWeight="bold" fontSize="sm">
            Requested Amount:&nbsp;
          </Text>
          <Text>
            {getFullDisplayBalance(new BN(proposal.withdrawAmount))} yCRV
          </Text>
        </Flex>
        <Flex>
          <Text fontWeight="bold" fontSize="sm">
            Withdrawal Address:&nbsp;
          </Text>
          <Text>{proposal.withdrawAddress}</Text>
        </Flex>

        <Flex w="100%">
          <Stack w="50%" spacing={2}>
            <Button
              isLoading={requestedFor}
              onClick={() => handleVoteFor()}
              colorScheme="green"
              mr={4}
            >
              Vote For
            </Button>
            <Text textAlign="center" mt={4}>
              {proposal.totalForVotes / 1e18} votes
            </Text>
          </Stack>
          <Stack w="50%" spacing={2}>
            <Button
              isLoading={requestedAgainst}
              onClick={() => handleVoteAgainst()}
              colorScheme="red"
              ml={4}
            >
              Vote Against
            </Button>
            <Text textAlign="center" mt={4}>
              {proposal.totalAgainstVotes / 1e18} votes
            </Text>
          </Stack>
        </Flex>
      </Stack>
    );
  } else {
    return <></>;
  }
};

export default Proposal;
