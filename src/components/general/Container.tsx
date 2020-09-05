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
      px={8}
      {...props}
    />
  );
};
