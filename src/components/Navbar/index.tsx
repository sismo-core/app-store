"use client";

//import Button3D from "@/src/ui/Button3D";
import Image from "next/image";
import Link from "next/link";
import { ArrowSquareOut } from "phosphor-react";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 16px 0px;
  display: flex;
  height: 92px !important;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 900px) {
    padding: 0 20px;
  }
`;

const NavLinkWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 32px;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.neutral1};
  line-height: 20px;
`;

export default function Navbar(): JSX.Element {
  return (
    <Container>
      <Link href={"/"}>
        <Image src={"/logo.svg"} width={36} height={60} alt="Spaces logo" />
      </Link>
      <NavLinkWrapper>
        <NavLink href={"/"}>Explore</NavLink>
        <NavLink href={"/about"}>
          Build with Sismo <ArrowSquareOut size={14} weight="bold" />
        </NavLink>
      </NavLinkWrapper>
    </Container>
  );
}
