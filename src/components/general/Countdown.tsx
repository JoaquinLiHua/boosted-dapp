import { Stack, Text } from "@chakra-ui/core";
import React from "react";
import Countdown from "react-countdown";

interface HeaderCountdownProps {}

export const HeaderCountdown: React.FC<HeaderCountdownProps> = ({}) => {
  const Completionist = () => (
    <Stack mt={4}>
      <Text fontSize="lg" fontWeight="bold">
        🚀 WAVE 3 POOL LIVE 🚀
      </Text>
    </Stack>
  );

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <Stack mt={4}>
          <Text fontSize="lg" textAlign="center" fontWeight="bold">
            🚀 Wave 3 POOL 🚀
          </Text>
          <Text textAlign="center">
            {" "}
            {days}d:{hours}h:{minutes}m:{seconds}s
          </Text>
        </Stack>
      );
    }
  };

  return <Countdown date={new Date(1600174800 * 1000)} renderer={renderer} />;
};
