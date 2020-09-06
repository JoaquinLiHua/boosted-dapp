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
    <Box
      p={5}
      boxShadow="md"
      borderWidth="1px"
      {...rest}
      minWidth={[200, 200, "100%"]}
    >
      <Stat>
        <StatLabel fontSize={["xs", "xs", "s"]} mb={[4, 4, 2]}>
          {title}
        </StatLabel>
        <StatNumber fontSize={["xs", "xs", "lg"]}>{value}</StatNumber>
        <StatHelpText>{tokenTicker}</StatHelpText>
      </Stat>
    </Box>
  );
};
