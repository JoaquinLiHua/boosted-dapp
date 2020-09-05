import React from "react";
import Marquee from "react-marquee-slider";
import times from "lodash/times";
import { Text } from "@chakra-ui/core";

export const MarqueeComponent = () => {
  return (
    <Marquee
      velocity={72}
      resetAfterTries={200}
      direction="rtl"
      onFinish={() => {}}
      scatterRandomly={false}
      onInit={() => {}}
    >
      {times(10, Number).map((id) => (
        <Text key={id} fontSize="3xl">
          GET B00STED &nbsp;
        </Text>
      ))}
    </Marquee>
  );
};
