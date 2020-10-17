import React from "react";
import { Flex } from "@chakra-ui/core";

export const Container = (props) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      maxWidth="1200px"
      margin="auto"
      minHeight="100vh"
      {...props}
      my={[4]}
      p={[4, 4, 0]}
    />
  );
};
