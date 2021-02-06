import React, { useCallback } from "react";
import styled from "styled-components";
import { useModal } from "src/context/ModalContext";
import { WalletSelectModal } from "src/components/general/WalletSelectModal";
import { useWallet } from "use-wallet";
import { formatAddress } from "src/utils/formatAddress";
import { FlexDiv, FlexDivCentered } from "src/styles/common";

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
    <div>
      {account ? (
        <></>
      ) : (
        <ConnectWalletButton>Connect Wallet</ConnectWalletButton>
      )}
    </div>
  );
};

const ConnectWalletButton = styled(FlexDivCentered)`
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.darkBlue};
  padding: 4px 8px;

  justify-content: center;
`;
