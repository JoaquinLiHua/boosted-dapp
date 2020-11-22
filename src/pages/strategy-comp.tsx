import React, { useEffect } from "react";
import {
  Button,
  Flex,
  Heading,
  Stack,
  Link as ChakraLink,
  Text,
  Box,
  Divider,
} from "@chakra-ui/react";
import * as typeformEmbed from "@typeform/embed";

const StrategyComp: React.FC = () => {
  const url = "https://joaquinlihua.typeform.com/to/o3Lq6EBb";

  useEffect(() => {
    const el = document.getElementById("typeform-widget");
    typeformEmbed.makeWidget(el, url);
  }, [url]);

  return (
    <Stack spacing={16} width="100%">
      <Stack spacing={8}>
        <Heading>bVaults Strategy Competition</Heading>
        <Text>Submit your best vault strategy ideas.</Text>
        <Text color="green.400" fontWeight="bold">
          Prize pool of 3,000 USD
        </Text>
        <Flex>
          <ChakraLink isExternal href="https://discord.com/invite/gp9bsaQ">
            <Button w={200} mr={2} colorScheme="blue" variant="outline">
              Discord
            </Button>
          </ChakraLink>
          <ChakraLink>
            <Button w={200} mr={2} colorScheme="blue">
              Blog
            </Button>
          </ChakraLink>
        </Flex>
      </Stack>
      <Divider />
      <Stack textAlign="center">
        <Heading>Submit your ideas here</Heading>
        <Text fontSize="sm">
          When you&apos;re ready to submit your idea, please complete the form
          below. Submissions are due before December 18th, 12:00AM UTC
        </Text>
        <Box id="typeform-widget" style={{ height: "100vh" }} py={8} />
      </Stack>
    </Stack>
  );
};

export default StrategyComp;
