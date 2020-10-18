import { Heading, Image, Stack, Text } from "@chakra-ui/core";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <Stack spacing={6} alignItems="center">
      <Image
        src="/images/404-astronaut.jpg"
        w={100}
        h={100}
        borderRadius="full"
      />
      <Heading textAlign="center">404 - Not Found</Heading>
      <Text fontWeight="bold">It looks like you're lost in space.</Text>
    </Stack>
  );
};

export default NotFound;
