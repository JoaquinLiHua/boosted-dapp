import React from "react";
import styled from "styled-components";
import NextLink from "next/link";
import { SettingsMenus } from "./SettingsMenu";
import { useRouter } from "next/router";
import { FlexDiv } from "src/styles/common";

export const Header = ({ changingRoute }) => {
  const router = useRouter();
  const ROUTES = [
    {
      copy: "Dashboard",
      link: "/",
    },
    {
      copy: "bVaults",
      link: "/bVaults",
    },
    {
      copy: "Gov",
      link: "/gov",
    },
    {
      copy: "Pools",
      link: "/pools",
    },
  ];
  return (
    <HeaderContainer>
      <FlexDiv>
        <StyledDiscordLink>Join our Discord!</StyledDiscordLink>
        <SettingsMenus />
      </FlexDiv>
    </HeaderContainer>
  );
};

const HeaderContainer = styled(FlexDiv)``;

const StyledDiscordLink = styled.div`
  font-family: ${(props) => props.theme.fonts.regular};
`;
