"use client";

import React from "react";
import styled from "styled-components";
import { Discord, GithubRounded, Twitter } from "../SismoReactIcon";
import colors from "@/src/themes/colors";
import Link from "next/link";
import Image from "next/image";
import Art from "@/src/assets/footer-art.svg";

const Container = styled.div`
  height: 183px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    height: 303.99px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
  }
`;

const Separator = styled.div`
  background-color: ${(props) => props.theme.colors.neutral6};
  height: 1px;
  width: 100%;
  position: absolute;
  top: 0px;
`;

const SocialWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

    @media (max-width: 768px) {
        margin-bottom: 24px;
    }
`;

const StyledLink = styled(Link)`
  height: 20px;
`;

const ArtWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Text = styled.div`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.colors.neutral1};
`;

const Bold = styled.span`
  font-family: ${(props) => props.theme.fonts.bold};
`;

const DesktopImage = styled(Image)`
  width: 182.18px;
  height: 121.85px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileImage = styled(Image)`
  display: none;
  width: 201.82px;
  height: 134.99px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    display: block;
  }
`;

export default function Footer(): JSX.Element {
  return (
    <Container>
      <Separator />
      <MobileImage src={Art} alt="Sismo Art" />
      <SocialWrapper>
        <StyledLink href="https://twitter.com/sismo_eth" target="_blank">
          <Twitter size={20} color={colors.neutral1} />
        </StyledLink>
        <StyledLink href="https://discord.gg/sismo" target="_blank">
          <Discord size={20} color={colors.neutral1} />
        </StyledLink>
        <StyledLink href="https://github.com/sismo-core" target="_blank">
          <GithubRounded size={20} color={colors.neutral1} />
        </StyledLink>
      </SocialWrapper>
      <ArtWrapper>
        <DesktopImage src={Art} alt="Sismo Art" />
        <Text>
          Build by <Bold>Sismo</Bold>
        </Text>
      </ArtWrapper>
    </Container>
  );
}
