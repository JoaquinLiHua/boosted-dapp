import React from "react";
import { Flex, Text, Tag, VStack } from "@chakra-ui/core";

interface ProposalRowProps {
  proposal: any;
}

export const ProposalRow: React.FC<ProposalRowProps> = ({ proposal }) => {
  return (
    <Flex borderBottomWidth={1} py={4}>
      <VStack mx={4}>
        <Tag size="sm">{proposal.status}</Tag>
        <Text fontSize="sm">{proposal.author}</Text>
      </VStack>
      <VStack mx={4} alignItems="flex-start">
        <Text>{proposal.title}</Text>
        <Flex>
          <Text fontSize="sm">{proposal.startDate} -</Text>
          <Text fontSize="sm">&nbsp;{proposal.endDate}</Text>
        </Flex>
      </VStack>
    </Flex>
  );
};
