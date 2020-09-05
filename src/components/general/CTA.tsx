import React, { useCallback } from "react";
import { Button } from "@chakra-ui/core";
import { Container } from "./Container";
import { useWallet } from "use-wallet";
import { WalletSelectModal } from "./WalletSelectModal";
import { AccountModal } from "./AccountModal";
import { useModal } from "src/context/ModalContext";
import { formatAddress } from "src/utils/formatAddress";

export const CTA: React.FC = () => {
  const [onPresentWalletProviderModal] = useModal(
    <WalletSelectModal />,
    "provider"
  );
  const [onPresentAccountModal] = useModal(<AccountModal />);
  const { account } = useWallet();

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal();
  }, [onPresentWalletProviderModal]);

  return (
    <Container
      flexDirection="row"
      position="fixed"
      bottom="10"
      width="100%"
      maxWidth="48rem"
      py={2}
    >
      {account ? (
        <Button
          flexGrow={3}
          mx={2}
          onClick={() => onPresentAccountModal()}
          width="100%"
          variant="solid"
          colorScheme="green"
        >
          {formatAddress(account)}
        </Button>
      ) : (
        <Button
          onClick={() => handleUnlockClick()}
          flexGrow={3}
          mx={2}
          width="100%"
          variant="solid"
          colorScheme="green"
        >
          UNLOCK WALLET
        </Button>
      )}
    </Container>
  );
};
