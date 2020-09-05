import React, { useEffect } from "react";
import {
  Button,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Stack,
  Flex,
} from "@chakra-ui/core";
import { useWallet } from "use-wallet";
import { ModalProps } from "src/context/ModalContext";

type AccountModalProps = ModalProps;

export const AccountModal: React.FC<AccountModalProps> = ({ onDismiss }) => {
  const { account, reset } = useWallet();

  useEffect(() => {
    if (!account && onDismiss) {
      onDismiss();
    }
  }, [onDismiss, account]);

  return (
    <ModalContent>
      <ModalHeader>Wallet Details</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack>
          <Flex
            justifyContent="space-between"
            my={4}
            borderWidth={1}
            borderRadius={5}
            p={8}
          >
            <Text>Wallet Address</Text>
            <Text>{address}</Text>
          </Flex>
          <Button onClick={() => reset()}>Sign out</Button>
        </Stack>
      </ModalBody>
    </ModalContent>
  );
};
