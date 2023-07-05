"use client";

import { SpaceConfigFront } from "@/src/utils/getSpaceConfigsFront";
import { textShorten } from "@/src/utils/textShorten";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Container = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 228px;
  width: 212.8px;
  cursor: pointer;
  border: 1px solid #525c8f;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 20px;
  flex-shrink: 0;
  scroll-snap-align: center;

  transition: background-color ${(props) => props.theme.animations.transition}, border ${(props) => props.theme.animations.transition};

  &:hover {
    background-color: ${(props) => props.theme.colors.neutral10};
    border: 1px solid ${(props) => props.theme.colors.neutral4};
  }
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 98px !important;
  height: 98px !important;
  overflow: hidden;
  border-radius: 50%;
  object-fit: cover;
  flex-grow: 0;
  flex-shrink: 0;
  margin-bottom: 16px;
`;

const Name = styled.div`
  font-family: ${(props) => props.theme.fonts.semibold};
  color: ${(props) => props.theme.colors.neutral1};
  text-align: center;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 4px;
  ${textShorten(1)}
`;

const NumberOfApps = styled.div`
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: 16px;
  color: ${(props) => props.theme.colors.neutral5};
`;

type Props = {
  config: SpaceConfigFront;
  className?: string;
};

export default function SpaceCard({ config, className }: Props): JSX.Element {
  return (
    <Container href={`/${config.slug}`} className={className}>
      <ProfileImageContainer>
        <Image
          src={config.profileImage}
          alt={"Space profile image"}
          placeholder="blur"
          fill={true}
          sizes="40vw"
        />
      </ProfileImageContainer>
      <Name>{config.name}</Name>
      <NumberOfApps>
        {config.apps.length} app{config.apps.length > 1 && "s"}
      </NumberOfApps>
    </Container>
  );
}
