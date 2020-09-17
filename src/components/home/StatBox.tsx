import React, { useEffect, useState } from "react";
import {
  Box,
  Stat,
  StatNumber,
  StatLabel,
  StatHelpText,
} from "@chakra-ui/core";
import CountUp from "react-countup";

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
  const [start, updateStart] = useState(0);
  const [end, updateEnd] = useState(0);

  console.log(value);
  useEffect(() => {
    updateStart(end);
    updateEnd(parseInt(value));
  }, [value]);

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
        <StatNumber fontSize={["xs", "xs", "lg"]}>
          <CountUp
            start={start}
            end={end}
            decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
            duration={1}
          />
        </StatNumber>
        <StatHelpText>{tokenTicker}</StatHelpText>
      </Stat>
    </Box>
  );
};
