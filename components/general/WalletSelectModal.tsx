import React, { useEffect, useState } from "react";
import {
  Button,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Stack,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useWallet } from "use-wallet";
import { ModalProps } from "../../context/ModalContext";

type WalletSelectModalProps = ModalProps;

export const WalletSelectModal: React.FC<WalletSelectModalProps> = ({
  onDismiss,
}) => {
  const { account, connect } = useWallet();
  const [attempts, setAttempts] = useState<number>(0);
  const toast = useToast();
  const providers = [
    {
      img: "/images/metamask-icon.svg",
      copy: "Metamask",
      connectMethod: () => {
        connect("injected"), setAttempts((prevState) => prevState + 1);
      },
    },
    {
      img: "/images/walletconnect-icon.svg",
      copy: "Wallet Connect",
      connectMethod: () => {
        connect("walletconnect"), setAttempts((prevState) => prevState + 1);
      },
    },
  ];

  useEffect(() => {
    if (account && onDismiss) {
      setAttempts(0);
      onDismiss();
      return;
    }
    if (!account && attempts > 2) {
      toast({
        title: "Check your network.",
        description:
          "BOOSTING is only available on main-net, please check your network.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [onDismiss, account, attempts, toast]);

  const returnProviderButton = () =>
    providers.map((e, i) => (
      <Button
        key={i}
        my={4}
        borderWidth={1}
        borderRadius={5}
        display="flex"
        height={75}
        justifyContent="center"
        alignItems="center"
        onClick={() => e.connectMethod()}
      >
        <Text width={150} mr={8} fontSize={["xs", "xs", "md"]}>
          {e.copy}
        </Text>
        <Image src={e.img} width={25} />
      </Button>
    ));

  return (
    <ModalContent>
      <ModalHeader>Select your wallet</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack>{returnProviderButton()}</Stack>
      </ModalBody>
    </ModalContent>
  );
};
