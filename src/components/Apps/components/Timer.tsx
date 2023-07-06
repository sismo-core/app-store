"use client";

import React from "react";
import { styled } from "styled-components";
import useRemainingTime from "@/src/utils/useRemainingTime";
import { DateTime } from "luxon";
import { ZkAppType } from "@/src/libs/spaces";

const Content = styled.div`
  max-width: 580px;
  color: ${(props) => props.theme.colors.neutral1};
`;

const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TimerTitle = styled.div`
  font-size: 32px;
  line-height: 38px;
  font-family: ${(props) => props.theme.fonts.semibold};

  @media (max-width: 900px) {
    font-size: 24px;
    line-height: 30px;
  }
`;

const TimerClockWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0 12px 0;
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
  app: ZkAppType;
};

export default function Timer({ app }: Props): JSX.Element {
  const { remainingStartTime: remainingTime } = useRemainingTime({
    startDate: app?.startDate,
  });

  function twoDigits(number: number) {
    return number < 10 ? `0${number}` : number;
  }

  const date = DateTime.fromJSDate(app?.startDate);
  const localDate = date.toLocal();
  const formattedDate = localDate.toFormat("EEE, dd LLL yyyy HH:mm");

  return (
    <Content>
      <TimerWrapper>
        <TimerTitle>Available in:</TimerTitle>
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
    </Content>
  );
}
