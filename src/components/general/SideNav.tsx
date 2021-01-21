import React from "react";
import NextLink from "next/link";
import styled from "styled-components";
import { FlexDivCol } from "src/styles/common";
import { ROUTES } from "src/constants/routes";
import { useRouter } from "next/router";

type SideNavProps = {};

const SideNav: React.FC<SideNavProps> = ({}) => {
  const { route } = useRouter();

  return (
    <Container>
      {ROUTES.map((element, key) => (
        <NextLink key={key} href={element.link}>
          <Item active={route === element.link}>{element.copy}</Item>
        </NextLink>
      ))}
    </Container>
  );
};

export default SideNav;

const Container = styled(FlexDivCol)`
  padding: 16px;
`;

const Item = styled.div<{ active: boolean }>`
  color: ${(props) =>
    props.active ? props.theme.colors.white : props.theme.colors.gray};
  font-family: ${(props) => props.theme.fonts.interBold};
  margin-bottom: 8px;
`;
