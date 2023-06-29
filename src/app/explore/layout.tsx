"use client";

import styled from "styled-components";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";


const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  margin: 24px 0px 32px 0px;

  @media (max-width: 900px) {
    padding: 0 20px;
  }
`;
const Title = styled.h1`
  font-size: 32px;
  font-family: ${(props) => props.theme.fonts.semibold};
  line-height: 38px;
  margin-bottom: 24px;
`;


const Nav = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.neutral9};
  height: 38px;
  margin-bottom: 24px;

  @media (max-width: 900px) {
    margin-bottom: 16px;
  }
`;

const Item = styled(Link)<{ $isActive: boolean }>`
  color: ${(props) =>
    props.$isActive
      ? props.theme.colors.neutral1
      : props.theme.colors.neutral4};
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.semibold};
  line-height: 24px;
  padding-bottom: 11px;
  border-bottom: 2px solid
    ${(props) =>
      props.$isActive ? props.theme.colors.neutral1 : "transparent"};
`;

type Props = {
  children: React.ReactNode;
};

export default function ExploreLayout({ children }: Props) {
  const pathname = usePathname();

  return (
    <Container>
      <Title>Explore</Title>
      <Nav>
        <Item
          href={"/explore/apps"}
          $isActive={Boolean(pathname.includes("apps"))}
        >
          Apps
        </Item>
        <Item
          href={"/explore/spaces"}
          $isActive={Boolean(pathname.includes("spaces"))}
        >
          Spaces
        </Item>
      </Nav>
      {children}
    </Container>
  );
}
