import React from "react";
import styled from "styled-components";
import NextLink from "next/link";
import { SettingsMenus } from "./SettingsMenu";
import { FlexDiv, FlexDivCol, FlexDivRowCentered } from "src/styles/common";
import { Svg } from "react-optimized-image";
import SideNav from "./SideNav";

import Logo from "src/assets/svg/logo.svg";
import SolarSystem from "src/assets/svg/solar-system.svg";
import Stars from "src/assets/svg/stars.svg";
import Planet from "src/assets/svg/planet.svg";

type LayoutProps = {};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <PageBackground>
      <SolarSystemContainer>
        <Svg src={SolarSystem} />
      </SolarSystemContainer>
      <PlanetContainer>
        <Svg src={Planet} />
      </PlanetContainer>
      <StarContainer>
        <Svg src={Stars} />
      </StarContainer>

      <HeaderContainer>
        <NextLink href="/">
          <Svg src={Logo} />
        </NextLink>
        <FlexDiv>
          <StyledDiscordLink>Join our Discord!</StyledDiscordLink>
          <SettingsMenus />
        </FlexDiv>
      </HeaderContainer>
      <Grid>
        <LeftColumn>
          <SideNav />
        </LeftColumn>
        <RightColumn></RightColumn>
      </Grid>
    </PageBackground>
  );
};
export default Layout;

const PageBackground = styled.div`
  background: ${(props) => props.theme.colors.background};
  min-height: 100vh;
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

const HeaderContainer = styled(FlexDivRowCentered)`
  justify-content: space-between;
  padding: 24px;
`;

const StyledDiscordLink = styled.div`
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.white};
  margin-right: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-gap: 10px;
`;

const RightColumn = styled.div``;

const LeftColumn = styled(FlexDivCol)`
  width: 800px;
  justify-content: center;
`;
