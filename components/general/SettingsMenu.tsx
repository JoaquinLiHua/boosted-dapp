import React, { useCallback } from "react";
import styled from "styled-components";
import { useModal } from "src/context/ModalContext";
import { WalletSelectModal } from "src/components/general/WalletSelectModal";
import { useWallet } from "use-wallet";
import { formatAddress } from "src/utils/formatAddress";

import { PrimaryButton } from "src/styles/common";

export const SettingsMenus = () => {
  const { account, reset } = useWallet();

  const [onPresentWalletProviderModal] = useModal(
    <WalletSelectModal />,
    "provider"
  );

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal();
  }, [onPresentWalletProviderModal]);

  return (
    <>
      {account ? (
        <></>
      ) : (
        <ConnectWalletButton href="#">Connect Wallet</ConnectWalletButton>
      )}
    </>
  );
};

const ConnectWalletButton = styled(PrimaryButton)`
  margin-left: 24px;
`;
