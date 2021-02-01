import React from "react";
import styled from "styled-components";
import NextLink from "next/link";
import { SettingsMenus } from "./SettingsMenu";
import { FlexDivRowCentered, MainColumn } from "src/styles/common";
import { Svg } from "react-optimized-image";
import SideNav from "./SideNav";
import { ExternalLink } from "./ExternalLink";

import Logo from "src/assets/svg/logo.svg";
import SolarSystem from "src/assets/svg/solar-system.svg";
import Stars from "src/assets/svg/stars.svg";
import Planet from "src/assets/svg/planet.svg";

type LayoutProps = {};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutWrapper>
      <BackgroundWrapper>  {/* Making the DOM little bit prettier */}
        <SolarSystemContainer>
          <Svg src={SolarSystem} />
        </SolarSystemContainer>
        {/* <PlanetContainer>
          <Svg src={Planet} />
        </PlanetContainer> */}
        <StarContainer>
          <Svg src={Stars} />
        </StarContainer>
      </BackgroundWrapper>

      {/* Top navigation */}
      <HeaderContainer>
        <NextLink href="/">
          <Svg src={Logo} />
        </NextLink>
        <TopRight>
          <StyledDiscordLink href="https://discord.gg/gp9bsaQ">Join our Discord!</StyledDiscordLink>
          <SettingsMenus />
        </TopRight>
      </HeaderContainer>

      {/* One more wrapper so we can use Flex put the divs side-by-side easily */}
      <SideMainWrapper>
        <SideNav />  {/* Side navigation */}
        <MainColumn>{children}</MainColumn> {/* Page content */}
      </SideMainWrapper>

    </LayoutWrapper>
  );
};
export default Layout;

const BackgroundWrapper = styled.div`
  z-index: 1;
  position: relative;
`;

const SolarSystemContainer = styled.div`
  position: absolute;
  top: -100;
  left: 25%;
`;

const StarContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

const PlanetContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 100;
`;

const HeaderContainer = styled.header`
  display: flex;
  z-index: 2;
  position: relative;
  justify-content: space-between;
  padding: 48px 48px 27px 48px;
`;

const StyledDiscordLink = styled(ExternalLink)`
  font-family: ${(props) => props.theme.fonts.interMedium};
  color: #CCC;
  margin-right: 8px;
  text-decoration: none;
  font-size: 15px;

  &:hover {
    color: white;
  }
`;

const SideMainWrapper = styled.div`
  z-index: 2;
  position: relative;
  display: flex;
  padding: 0 48px;
`;

const LayoutWrapper = styled.div`
  background: ${(props) => props.theme.colors.background};
  min-height: 100vh;
  position: relative;
`;

const TopRight = styled(FlexDivRowCentered)`
`;
