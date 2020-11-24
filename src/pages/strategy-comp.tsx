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
  const url = "https://upwrlifter12.typeform.com/to/bJhmMg7y";

  useEffect(() => {
    const el = document.getElementById("typeform-widget");
    typeformEmbed.makeWidget(el, url, { opacity: 0 });
  }, [url]);

  return (
    <Stack spacing={16} width="100%">
      <Stack spacing={8}>
        <Heading>bVaults Strategy Competition</Heading>
        <Text>
          Submit your best bVault strategy ideas to win from a prize pool of
          $3000 USDC and the chance to have it implemented on Boosted.Finance
          which will allow you to earn performance fees!
        </Text>
        <Flex>
          <ChakraLink isExternal href="https://discord.com/invite/gp9bsaQ">
            <Button w={200} mr={2} colorScheme="blue" variant="outline">
              Discord
            </Button>
          </ChakraLink>
          <ChakraLink
            isExternal
            href="https://boostedfinance.medium.com/boosted-finance-strategist-competition-kickoff-edbb76b2fa7f"
          >
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
