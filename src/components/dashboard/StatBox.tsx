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

  useEffect(() => {
    updateStart(end);
    updateEnd(parseFloat(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            decimals={end < 1 ? 4 : 2}
            duration={1}
            separator={","}
          />
        </StatNumber>
        <StatHelpText>{tokenTicker}</StatHelpText>
      </Stat>
    </Box>
  );
};
