"use client";

import Modal from "@/src/ui/Modal";
import React from "react";
import { styled } from "styled-components";
import Button3D from "@/src/ui/Button3D";
import { DateTime, Duration } from "luxon";
import useRemainingTime from "@/src/utils/useRemainingTime";
import { ZkFormAppType } from "@/src/libs/spaces";

const Content = styled.div`
  max-width: 580px;
  color: ${(props) => props.theme.colors.neutral1};
`;

const Title = styled.div`
  margin-bottom: 16px;
  font-family: ${(props) => props.theme.fonts.semibold};
  color: ${(props) => props.theme.colors.neutral1};
  font-size: 32px;
`;

const Description = styled.div`
  margin-bottom: 32px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.neutral3};
  font-size: 16px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
  position: relative;
  height: 46px;
  display: flex;
  align-items: center;
`;

const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;

const TimerTitle = styled.div`
  font-size: 24px;
  line-height: 30px;
  font-family: ${(props) => props.theme.fonts.semibold};
`;

const TimerClockWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  margin-bottom: 4px;
`;

const TimerClock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  width: 56px;
`;

const Number = styled.div`
  font-size: 32px;
  line-height: 38px;
  font-family: ${(props) => props.theme.fonts.semibold};
`;

const Unit = styled.div`
  font-size: 12px;
  line-height: 18px;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.neutral3};
`;

const Separator = styled(Number)`
  align-self: baseline;
  &:after {
    content: ":";
  }
`;

const FullDate = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.neutral3};
`;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  app: ZkFormAppType;
};

export default function TimerModal({
  isOpen,
  onClose,
  app,
}: Props): JSX.Element {
  const remainingTime = useRemainingTime(app?.startDate);

  function twoDigits(number: number) {
    return number < 10 ? `0${number}` : number;
  }

  const date = DateTime.fromJSDate(app?.startDate);
  const localDate = date.toLocal();
  const formattedDate = localDate.toFormat("EEE, dd LLL yyyy HH:mm");

  return (
    <Modal isOpen={isOpen} onClose={onClose} animated>
      <Content>
        <Title>{app?.name}</Title>
        <Description>{app?.description}</Description>
        <TimerWrapper>
          <TimerTitle>Available in</TimerTitle>
          <TimerClockWrapper>
            {remainingTime?.days > 0 && (
              <>
                <TimerClock>
                  <Number>{remainingTime?.days}</Number>
                  <Unit>day{remainingTime?.days > 1 ? "s" : ""}</Unit>
                </TimerClock>
                <Separator />
              </>
            )}
            {(remainingTime?.hours > 0 || remainingTime?.days > 0) && (
              <>
                <TimerClock>
                  <Number>{twoDigits(remainingTime?.hours)}</Number>
                  <Unit>hour{remainingTime?.hours > 1 ? "s" : ""}</Unit>
                </TimerClock>
                <Separator />
              </>
            )}
            {(remainingTime?.minutes > 0 ||
              remainingTime?.days > 0 ||
              remainingTime?.hours > 0) && (
              <>
                <TimerClock>
                  <Number>{twoDigits(remainingTime?.minutes)}</Number>
                  <Unit>minute{remainingTime?.minutes > 1 ? "s" : ""}</Unit>
                </TimerClock>
                <Separator />
              </>
            )}
            <TimerClock>
              <Number>{twoDigits(remainingTime?.seconds)}</Number>
              <Unit>second{remainingTime?.seconds > 1 ? "s" : ""}</Unit>
            </TimerClock>
          </TimerClockWrapper>

          <FullDate>{formattedDate}</FullDate>
        </TimerWrapper>
        <Bottom>
          <Button3D onClick={onClose} secondary>
            Back to the Space
          </Button3D>
        </Bottom>
      </Content>
    </Modal>
  );
}
