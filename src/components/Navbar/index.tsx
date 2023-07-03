"use client";

import useOnClickOutside from "@/src/utils/useClickOutside";
//import Button3D from "@/src/ui/Button3D";
import Image from "next/image";
import Link from "next/link";
import { ArrowSquareOut } from "phosphor-react";
import { useState, useRef } from "react";
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

  @media (max-width: 900px) {
    display: none;
  }
`;

const MobileNavLinkWrapper = styled.div`
  position: relative;
  display: none;

  @media (max-width: 900px) {
    display: block;
    cursor: pointer;
  }
`;

const MobileNavLinkDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0px;
  width: calc(100vw - 40px);
  display: flex;
  padding: 24px;

  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.neutral7};
  background: ${(props) => props.theme.colors.neutral11};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  z-index : 2;
`;

const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.medium};
  line-height: 24px;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.neutral1};
  line-height: 20px;

  transition: color ${(props) => props.theme.animations.transition};

  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.neutral3};
  }
`;

export default function Navbar(): JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsMobileMenuOpen(false));

  return (
    <Container>
      <Link href={"/"}>
        <Image src={"/logo.svg"} width={36} height={60} alt="Spaces logo" />
      </Link>
      <NavLinkWrapper>
        <NavLink href={"https://app-store-resources.sismo.io/"} target="_blank">
          Create your App
        </NavLink>
        <NavLink href={"https://docs.sismo.io/"} target="_blank">
          What is Sismo? <ArrowSquareOut size={14} weight="bold" />
        </NavLink>
      </NavLinkWrapper>
      <MobileNavLinkWrapper ref={ref} onClick={()=>setIsMobileMenuOpen(!isMobileMenuOpen)}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 16H27"
            stroke="#E9EBF6"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5 8H27"
            stroke="#E9EBF6"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5 24H27"
            stroke="#E9EBF6"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
       {isMobileMenuOpen && <MobileNavLinkDropdown >
          <MobileNavLink href={"https://app-store-resources.sismo.io/"} onClick={()=>setIsMobileMenuOpen(false)} target="_blank">
            Create your App
          </MobileNavLink>
          <MobileNavLink href={"https://docs.sismo.io/"} onClick={()=>setIsMobileMenuOpen(false)}  target="_blank">
            What is Sismo? <ArrowSquareOut size={18} />
          </MobileNavLink>
        </MobileNavLinkDropdown>}
      </MobileNavLinkWrapper>
    </Container>
  );
}
