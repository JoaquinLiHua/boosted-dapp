import React, { useCallback } from "react";
import styled from "styled-components";
import { useModal } from "src/context/ModalContext";
import { WalletSelectModal } from "src/components/general/WalletSelectModal";
import { useWallet } from "use-wallet";
import { formatAddress } from "src/utils/formatAddress";

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

const ConnectWalletButton = styled.a`
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.darkBlue};
  font-family: ${(props) => props.theme.fonts.interSemiBold};
  text-decoration: none;
  padding: 14px 24px;
  font-size: 15px;
  border-radius: 4px;
  justify-content: center;
  outline: none;
  border: 0;
  box-shadow: 0 0 8px 0 #0C9EDA;
  margin-left: 24px;

  &:hover {
  }
`;


