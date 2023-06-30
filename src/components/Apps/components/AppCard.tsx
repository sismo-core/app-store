"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { textShorten } from "@/src/utils/textShorten";
import { CaretDown } from "phosphor-react";
import colors from "@/src/themes/colors";
import ReqList from "./ReqList";
import { AppConfig, ZkFormAppConfig } from "@/space-config/types";
import { GroupMetadata } from "@/src/libs/group-provider";
import { ImportedNextImage } from "@/src/utils/getImgSrcFromConfig";
import { Clock } from "phosphor-react";
import { DateTime, Duration } from "luxon";
import TimerModal from "../TimerModal";
import useRemainingTime from "@/src/utils/useRemainingTime";
import AvailabilityProgressBar from "./AvailabilityProgressBar";
import { useModals } from "@/src/state/ModalState";
import { ZkAppType, ZkFormAppType } from "@/src/libs/spaces";

const Container = styled.div<{ isFolderHovered: boolean, disabled: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  // min-height: 588px;
  border: 1px solid ${(props) => props.theme.colors.neutral6};
  background-color: ${(props) => props.theme.colors.neutral11};
  border-radius: 16px;
  padding: 16px 20px 20px;
  transition: all 0.1s;

  ${props => !props.disabled && `
    cursor: pointer;
    &:hover {
      background-color: ${
        props.isFolderHovered
          ? props.theme.colors.neutral11
          : props.theme.colors.neutral10};
      border: 1px solid ${props.theme.colors.neutral4};
    }
  `}

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

const ExpiredTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0px 8px;

  height: 28px;
  background: rgba(28, 36, 58, 0.7);
  border-radius: 20px;

  font-size: 12px;
  color: ${props => props.theme.neutral1};
  font-family: ${(props) => props.theme.fonts.semibold};
`

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
  gap: 8px;
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
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledImage = styled(Image)<{ disabled: boolean }>`
  width: 100%;
  height: 240px;
  object-fit: cover;
  ${props => props.disabled && `
    opacity: 0.5;
  `}
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
  app: ZkAppType;
  cover: string | ImportedNextImage;
  groupMetadataList: GroupMetadata[];
  hasStarted: boolean;
  onCTAClick: () => void;
};

export default function AppCard({
  app,
  onCTAClick,
  hasStarted,
  cover,
  groupMetadataList,
}: Props): JSX.Element {
  const [timerModalIsOpen, setTimerModalIsOpen] = useState(false);
  const [isFolded, setIsFolded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { requirementsIsOpen } = useModals();


  const luxonUTCStartDate = app?.endDate && DateTime.fromJSDate(app?.endDate);
  const hasExpired = luxonUTCStartDate ? DateTime.now().toUTC() > luxonUTCStartDate : false;

  let remainingTime = useRemainingTime(app?.startDate);

  //Close the timer modal when the app starts
  useEffect(() => {
    if (!hasStarted) return;
    setTimerModalIsOpen(false);
  }, [hasStarted]);

  function getHumanReadableRemainingTimeTag(
    remainingTimeForStartDate: Duration
  ) {
    if (remainingTimeForStartDate?.days > 0) {
      return `Available in ${remainingTimeForStartDate.days} day${
        remainingTimeForStartDate.days > 1 ? "s" : ""
      }`;
    }
    if (remainingTimeForStartDate?.hours > 0) {
      return `Available in ${remainingTimeForStartDate.hours} hour${
        remainingTimeForStartDate.hours > 1 ? "s" : ""
      }`;
    }
    if (remainingTimeForStartDate?.minutes > 0) {
      return `Available in ${remainingTimeForStartDate.minutes} minute${
        remainingTimeForStartDate.minutes > 1 ? "s" : ""
      }`;
    }
    if (remainingTimeForStartDate?.seconds >= 0) {
      return `Available in ${remainingTimeForStartDate.seconds.toFixed(
        0
      )} second${remainingTimeForStartDate.seconds > 1 ? "s" : ""}`;
    }
  }

  return (
    <>
      <TimerModal
        isOpen={timerModalIsOpen}
        onClose={() => {
          setTimerModalIsOpen(false)
        }}
        app={app as ZkFormAppType}
      />
      <Container
        isFolderHovered={isHovered}
        onClick={() => {
          if (!requirementsIsOpen && !hasExpired)
            hasStarted ? onCTAClick() : setTimerModalIsOpen(true);
        }}
        disabled={hasExpired}
      >
        <Top>
          {app?.ctaText && <TopText>{app?.ctaText}</TopText>}
          <ImageWrapper>
            {cover && (
              <StyledImage src={cover} alt={app?.name} placeholder="blur" disabled={hasExpired}/>
            )}
            <TagWrapper>
              {app?.tags?.map((tag, index) => (
                <Tag key={app?.name + tag + index}>{tag}</Tag>
              ))}

              {
                hasExpired && 
                <ExpiredTag>
                  <Clock size="18" style={{ marginRight: 4 }}/>
                  Expired
                </ExpiredTag>
              }

              {app?.startDate &&
                !hasStarted &&
                getHumanReadableRemainingTimeTag(remainingTime) && (
                  <Tag>
                    <Clock size="18" />
                    {getHumanReadableRemainingTimeTag(remainingTime)}
                  </Tag>
                )}
            </TagWrapper>
               {
            (app?.type === "zk-form" || app?.type === "zkdrop") && app?.userSelection?.type === "Lottery" &&
            <AvailabilityProgressBar register={0} availableMax={app?.userSelection?.maxNumberOfEntries}/>
          }
          </ImageWrapper>
          {app?.name && <Title>{app.name}</Title>}
          {app?.description && <Description>{app.description}</Description>}
        </Top>
        <Bottom>
          <ReqTitle>Requirements</ReqTitle>
          {!isFolded && (
            <ReqList
              groupMetadataList={groupMetadataList}
              app={app}
              style={{ paddingTop: 8, paddingBottom: 16 }}
              fullWidth
            />
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
    </>
  );
}
