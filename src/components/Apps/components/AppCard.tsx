"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { textShorten } from "@/src/utils/textShorten";
import { CaretDown } from "phosphor-react";
import colors from "@/src/themes/colors";
import ReqList from "./ReqList";
import { App } from "@/space-config/types";
import { GroupMetadata } from "@/src/libs/group-provider";

const Container = styled.div<{ isFolderHovered: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  // min-height: 588px;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.colors.neutral6};
  background-color: ${(props) => props.theme.colors.neutral11};
  border-radius: 16px;
  padding: 16px 20px 20px;
  transition: all 0.1s;

  &:hover {
    background-color: ${(props) =>
      props.isFolderHovered
        ? props.theme.colors.neutral11
        : props.theme.colors.neutral10};
    border: 1px solid ${(props) => props.theme.colors.neutral4};
  }
`;

const FolderButton = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 24px;
  border: 1px solid ${(props) => props.theme.colors.neutral6};
  background-color: ${(props) => props.theme.colors.neutral11};
  border-radius: 8px;
  transition: all 0.1s;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.neutral10};
    border: 1px solid ${(props) => props.theme.colors.neutral4};
  }

  /* &:hover ${Container} {
    border: 1px solid ${(props) => props.theme.colors.neutral6} !important;
    background-color: ${(props) => props.theme.colors.neutral11} !important;
  } */
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TopText = styled.div`
  font-size: 18px;
  line-height: 22px;
  font-family: ${(props) => props.theme.fonts.semibold};
  padding-top: 13px;
  margin-bottom: 29px;
  ${textShorten(1)}
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 8px;
  height: 240px;
  overflow: hidden;
  margin-bottom: 16px;
`;

const TagWrapper = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  height: 28px;
  border-radius: 20px;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  font-size: 14px;
  line-height: 20px;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.neutral11};
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 240px;
  object-fit: cover;
`;

const Title = styled.div`
  padding-top: 12px;
  font-size: 20px;
  line-height: 24px;
  font-family: ${(props) => props.theme.fonts.semibold};
  margin-bottom: 28px;
  ${textShorten(1)}
`;

const Description = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.neutral4};
  min-height: 100px;
  ${textShorten(5)}
`;

const ReqTitle = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.neutral4};
  margin-bottom: 8px;
`;


const CaretWrapper = styled.div<{ isFolded: boolean }>`
  display: flex;
  align-items: center;
  transform: ${(props) =>
    props.isFolded ? "rotateX(0deg)" : "rotateX(180deg)"};
`;

type Props = {
  app: App;
  cover: string;
  groupMetadataList: GroupMetadata[];
  onCTAClick: () => void;
};

export default function AppCard({ app, onCTAClick, cover, groupMetadataList }: Props): JSX.Element {
  const [isFolded, setIsFolded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container isFolderHovered={isHovered} onClick={onCTAClick}>
      <Top>
        {app?.CTAText && <TopText>{app?.CTAText}</TopText>}
        <ImageWrapper>
          {cover && (
            <StyledImage src={cover} alt={app?.name} />
          )}
          <TagWrapper>
            {app?.tags?.map((tag, index) => (
              <Tag key={app?.name + tag + index}>{tag}</Tag>
            ))}
          </TagWrapper>
        </ImageWrapper>
        {app?.name && <Title>{app.name}</Title>}
        {app?.description && <Description>{app.description}</Description>}
      </Top>
      <Bottom>
        <ReqTitle>Requirements</ReqTitle>
        {!isFolded && (
          <ReqList groupMetadataList={groupMetadataList} app={app} style={{ paddingTop: 8, paddingBottom: 16 }} fullWidth/>
        )}
        <FolderButton
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            setIsFolded(!isFolded);
          }}
        >
          <CaretWrapper isFolded={isFolded}>
            <CaretDown size={20} color={colors.neutral4} />
          </CaretWrapper>
        </FolderButton>
      </Bottom>
    </Container>
  );
}
