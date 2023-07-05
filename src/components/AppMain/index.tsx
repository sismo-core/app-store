"use client";

import { AppFront } from "@/src/utils/getSpaceConfigsFront";
import styled from "styled-components";
import ZkFormApp from "../Apps/ZkFormApp";
import { GroupMetadata } from "@/src/libs/group-provider";
import Image from "next/image";
import SpaceTag from "../SpaceTag";
import Default from "@/src/assets/default.svg";
import ZkBotApp from "@/src/components/Apps/ZkTelegramBotApp";
import useRemainingTime from "@/src/utils/useRemainingTime";
import { redirect } from "next/navigation";
import Timer from "../Apps/components/Timer";

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  margin-top: 24px;
  margin-bottom: 40px;

  @media (max-width: 900px) {
    padding: 0px 20px;
  }
`;

const Content = styled.div`
  width: 580px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Top = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 24px;
  flex-shrink: 0;
  border-radius: 16px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.colors.neutral1};

  @media (max-width: 900px) {
    gap: 16px;
    align-items: center;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 98px;
  height: 98px;
  flex-shrink: 0;
  border-radius: 8px;

  @media (max-width: 900px) {
    width: 88px;
    height: 88px;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const TitleAndDescription = styled.div`
  max-width: 600px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const AppTitle = styled.h1`
  color: inherit;
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: 24px;
  line-height: 30px;

  @media (max-width: 900px) {
    font-size: 20px;
    line-height: 24px;
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.neutral4};
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: 22px;

  @media (max-width: 900px) {
    display: none;
  }
`;

const DescriptionMobile = styled.p`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.neutral4};
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: 22px;

  @media (min-width: 900px) {
    display: none;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 40px 0px;

  @media (max-width: 900px) {
    padding-top: 32px 0px;
  }
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.neutral7};
  margin-top: 40px;

  @media (max-width: 900px) {
    margin-top: 32px;
  }
`;

type Props = {
  app: AppFront;
  groupMetadataList: GroupMetadata[];
};

export default function AppMain({ app, groupMetadataList }: Props) {
  const { hasEnded, hasStarted } = useRemainingTime({
    startDate: app?.startDate,
    endDate: app?.endDate,
  });


  if (hasEnded) {
    redirect("/");
  }

  return (
    <Container>
      <Top>
        <ImageContainer>
          {app.image && app.name && (
            <StyledImage
              src={app.image || Default}
              alt={app.name}
              fill={true}
              placeholder="blur"
              sizes="40vw"
            />
          )}
        </ImageContainer>

        <TitleAndDescription>
          {app.name && <AppTitle>{app.name}</AppTitle>}
          {app.configImage && app.space && <SpaceTag app={app} />}
          {app.description && <Description>{app.description}</Description>}
        </TitleAndDescription>
      </Top>
      {app.description && <DescriptionMobile>{app.description}</DescriptionMobile>}
      <Separator />
      <AppContainer>
        {!hasStarted ? (
          <Content>
            <Timer app={app} />
          </Content>
        ) : (
          <>
            {app?.type == "zkForm" && <ZkFormApp app={app} groupMetadataList={groupMetadataList} />}
            {app?.type == "zkTelegramBot" && (
              <ZkBotApp app={app} groupMetadataList={groupMetadataList} />
            )}
          </>
        )}
      </AppContainer>
    </Container>
  );
}
