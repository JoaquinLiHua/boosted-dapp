import React from "react";
import {
  Box,
  Stat,
  StatNumber,
  StatLabel,
  StatHelpText,
} from "@chakra-ui/core";

interface StatBoxProps {
  title: string;
  tokenTicker: string;
  value: string;
}

export const StatBox: React.FC<StatBoxProps> = ({
  title,
  value,
  tokenTicker,
  ...rest
}) => {
  return (
    <Box p={5} boxShadow="md" borderWidth="1px" {...rest}>
      <Stat>
        <StatLabel>{title}</StatLabel>
        <StatNumber>{value}</StatNumber>
        <StatHelpText>{tokenTicker}</StatHelpText>
      </Stat>
    </Box>
  );
};
