import React from "react";
import {
  Box,
  Stat,
  StatNumber,
  StatLabel,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/core";
import { getDisplayBalance } from "src/utils/formatBalance";
import BigNumber from "bignumber.js";

interface StatBoxProps {
  title: string;
  tokenTicker: string;
  value?: BigNumber | number;
  showRelativePercentage?: boolean;
  relativePercentage?: number;
  bigNumber?: boolean;
}

export const StatBox: React.FC<StatBoxProps> = ({
  title,
  value,
  tokenTicker,
  showRelativePercentage,
  relativePercentage,
  bigNumber = false,
  ...rest
}) => {
  return (
    <Box p={5} boxShadow="md" borderWidth="1px" {...rest}>
      <Stat>
        <StatLabel>{title}</StatLabel>
        <StatNumber>
          {value
            ? bigNumber
              ? getDisplayBalance(value as BigNumber)
              : value
            : "-"}
        </StatNumber>
        {/* <StatNumber>{value ? getDisplayBalance(value) : "-"}</StatNumber> */}
        <StatHelpText>{tokenTicker}</StatHelpText>
        {showRelativePercentage && (
          <StatHelpText>
            <StatArrow type="increase" />
            {relativePercentage}%
          </StatHelpText>
        )}
      </Stat>
    </Box>
  );
};
