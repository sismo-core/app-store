"use client";

import { SpaceType } from "../../libs/spaces";
import { ImportedNextImage } from "@/src/utils/getImgSrcFromConfig";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const BannerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const BannerImage = styled(Image)`
  width: 100%;
  height: 360px;
  border-radius: 8px;
  object-fit: cover;

  @media (max-width: 900px) {
    height: 200px;
  }
`;
const ProfileImage = styled(Image)`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  border: 8px solid ${(props) => props.theme.colors.neutral12};
  background-color: ${(props) => props.theme.colors.neutral12};
  margin-left: 24px;
  margin-top: -108px;
  overflow: hidden;

  @media (max-width: 900px) {
    width: 140px;
    height: 140px;
    margin-left: 16px;
    margin-top: -88px;
  }
`;

const Title = styled.div`
  font-size: 32px;
  line-height: 38px;
  font-family: ${(props) => props.theme.fonts.semibold};
  margin-bottom: 8px;
`;

const SubTitle = styled.div`
  font-size: 16px;
  line-height: 22px;
  font-family: ${(props) => props.theme.fonts.regular};
`;

type Props = {
  config: SpaceType;
  coverImage: string | ImportedNextImage;
  profileImage: string | ImportedNextImage;
};

export default function SpaceProfile({
  config,
  coverImage,
  profileImage,
}: Props): JSX.Element {
  return (
    <Container>
      <BannerWrapper>
        {config?.coverImage && coverImage && (
          <BannerImage src={coverImage} alt={"Space cover image"} placeholder="blur" />
        )}

        {config?.profileImage && profileImage && (
          <ProfileImage src={profileImage} alt={"Space profile image"} placeholder="blur" />
        )}
      </BannerWrapper>

      {config?.name && <Title>{config?.name}</Title>}
      {config?.description && <SubTitle>{config.description}</SubTitle>}
    </Container>
  );
}
