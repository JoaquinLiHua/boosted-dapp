import React from "react";
import {
  Flex,
  Text,
  Tag,
  VStack,
  TagLeftIcon,
  TagLabel,
} from "@chakra-ui/react";
import { formatTimestamp } from "src/utils/formatTimestamp";
import { formatAddress } from "src/utils/formatAddress";
import { getFullDisplayBalance } from "src/utils/formatBalance";
import { AiOutlineClose, AiOutlineHourglass } from "react-icons/ai";
import BN from "bignumber.js";
import Link from "next/link";

interface ProposalRowProps {
  proposal: any;
  pid: number;
}

export const ProposalRow: React.FC<ProposalRowProps> = ({ proposal, pid }) => {
  return (
    <Link href="/gov/[pid]" as={`/gov/${pid}`}>
      <Flex borderBottomWidth={1} py={4} cursor="pointer" overflow="scroll">
        <VStack mx={4} px={4} whiteSpace="nowrap">
          <Text textAlign="center" fontWeight="bold">{`BFIP-${pid + 2}`}</Text>
        </VStack>
        <VStack mx={4}>
          {new Date(proposal.end * 1000) < new Date() ? (
            <Tag background="red.400" size="md">
              <TagLeftIcon color="white" boxSize="12px" as={AiOutlineClose} />
              <TagLabel color="white">Closed</TagLabel>
            </Tag>
          ) : (
            <Tag background="green.400" size="md">
              <TagLeftIcon
                color="white"
                boxSize="12px"
                as={AiOutlineHourglass}
              />
              <TagLabel color="white">Active</TagLabel>
            </Tag>
          )}
          <Text fontSize="sm">{formatAddress(proposal.proposer)}</Text>
        </VStack>
        <VStack mx={4} alignItems="flex-start">
          <Text>{proposal.url}</Text>
          <Flex>
            <Text>
              For {getFullDisplayBalance(new BN(proposal.withdrawAmount))} yCRV
            </Text>
          </Flex>
          <Flex>
            <Text mr={4} fontSize="sm" fontWeight="bold">
              start {formatTimestamp(proposal.start)}
            </Text>
            <Text fontSize="sm" fontWeight="bold">
              end {formatTimestamp(proposal.end)}
            </Text>
          </Flex>
        </VStack>
      </Flex>
    </Link>
  );
};
