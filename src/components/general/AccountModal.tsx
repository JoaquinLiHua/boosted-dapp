import React, { useEffect } from "react";
import {
  Button,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
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
      <ModalHeader>Wallet Settings</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack>
          <Button my={4} onClick={() => reset()}>
            Sign out
          </Button>
        </Stack>
      </ModalBody>
    </ModalContent>
  );
};
