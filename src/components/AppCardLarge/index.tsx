import { AppFront } from "@/src/app/(home)/page";
import Image from "next/image";
import styled from "styled-components";
import AppTag from "../AppTag";
import { textShorten } from "@/src/utils/textShorten";
import useRemainingTime from "@/src/utils/useRemainingTime";
import { Clock } from "phosphor-react";
import { getHumanReadableRemainingTimeTag } from "@/src/utils/getHumanReadableTimeTag";
import SpaceTag from "../SpaceTag";

const Container = styled.div<{ $isDisabled: boolean }>`
  display: flex;
  padding: 20px;
  align-items: flex-start;
  gap: 16px;
  flex-shrink: 0;
  border-radius: 16px;
  background-color: transparent;
  color: ${({ theme, $isDisabled }) =>
    $isDisabled ? theme.colors.neutral5 : theme.colors.neutral1};
  border: 1px solid ${({ theme }) => theme.colors.neutral7};
  transition: background-color ${({ theme }) => theme.animations.transition},
    border ${({ theme }) => theme.animations.transition};
  cursor: ${({ $isDisabled }) => ($isDisabled ? "default" : "pointer")};

  &:hover {
    border: 1px solid
      ${({ theme, $isDisabled }) =>
        $isDisabled ? theme.colors.neutral7 : theme.colors.neutral5};
    background-color: ${({ theme, $isDisabled }) =>
      $isDisabled ? "transparent" : theme.colors.neutral10};
  }

  @media (max-width: 1150px) {
    flex-direction: column;
    width: 100%;
    padding: 16px;
    scroll-snap-align: center;
    gap: 8px;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    width: 72.4vw;
    padding: 16px;
    scroll-snap-align: center;
    gap: 8px;
  }
`;

const ImageContainer = styled.div<{ $isDisabled: boolean }>`
  position: relative;
  overflow: hidden;
  width: 240px;
  height: 240px;
  flex-shrink: 0;
  border-radius: 8px;
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};

  @media (max-width: 1150px) {
    width: calc(100%);
    height: 39.5vw;
  }

  @media (max-width: 900px) {
    width: calc(72.5vw - (2px + 32px));
    height: calc(72.5vw - (2px + 32px));
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const Top = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;

  @media (max-width: 1150px) {
    gap: 8px;
  }
`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  flex-shrink: 0;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppTitle = styled.h3`
  color: inherit;
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 4px;
  ${textShorten(2)}

  @media (max-width: 1150px) {
    margin-bottom: 8px;
  }
`;

const Description = styled.p<{ $isDisabled: boolean }>`
  color: ${({ theme, $isDisabled }) =>
    $isDisabled ? theme.colors.neutral5 : theme.colors.neutral4};
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: 20px;
  ${textShorten(3)}
  margin-top: 16px;

  @media (max-width: 1150px) {
    ${textShorten(2)}
    margin-top: 8px;
  }
`;

const BottomLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  flex-wrap: wrap;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.medium};
  line-height: 20px;
  column-gap: 8px;
  @media (max-width: 1150px) {
    display: none;
  }
`;

const BottomOverlay = styled.div`
  display: flex;
  align-self: stretch;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: flex-end;
  padding: 8px;
  position: absolute;
  bottom: 0;
  left: 0;
  column-gap: 8px;
  background: linear-gradient(
    180deg,
    rgba(10, 16, 31, 0) 0%,
    rgba(10, 16, 31, 0.9) 100%
  );
  width: 100%;
  height: calc(72.4vw * 58 / 240);
  color: inherit;
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.medium};
  line-height: 18px;

  @media (min-width: 1150px) {
    display: none;
  }
`;

const BottomItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: inherit;
  white-space: nowrap;
`;

type Props = {
  app: AppFront;
};

export default function AppCardLarge({ app }: Props): JSX.Element {
  const { remainingStartTime, remainingEndTime, hasStarted, hasEnded } =
    useRemainingTime({ startDate: app?.startDate, endDate: app?.endDate });

  const isDisabled = hasEnded;

  const maxNumberOfEntries =
    (app?.type == "zksub" || app?.type == "zkdrop") &&
    app?.userSelection?.type == "Lottery" &&
    app?.userSelection?.maxNumberOfEntries;

  if (app)
    return (
      <Container $isDisabled={isDisabled}>
        <ImageContainer $isDisabled={isDisabled}>
          {app.image && app.name && (
            <StyledImage
              src={app.image}
              alt={app.name}
              fill={true}
              placeholder="blur"
            />
          )}
          {((hasStarted && !hasEnded && remainingEndTime) ||
            (hasStarted && !hasEnded && remainingEndTime) ||
            (maxNumberOfEntries && !hasEnded)) && (
            <BottomOverlay>
              {!hasStarted && !hasEnded && remainingStartTime && (
                <BottomItem>
                  <Clock size="16" style={{ flexShrink: 0 }} />
                  {getHumanReadableRemainingTimeTag({
                    startDuration: remainingStartTime,
                  })}
                </BottomItem>
              )}
              {hasStarted && !hasEnded && remainingEndTime && (
                <BottomItem>
                  <Clock size="16" style={{ flexShrink: 0 }} />
                  {getHumanReadableRemainingTimeTag({
                    endDuration: remainingEndTime,
                  })}
                </BottomItem>
              )}
              {maxNumberOfEntries && !hasEnded && (
                <BottomItem>{maxNumberOfEntries} available</BottomItem>
              )}
            </BottomOverlay>
          )}
        </ImageContainer>
        <Content>
          <Top>
            {(hasEnded || app.tags?.length > 0) && (
              <TagContainer>
                {hasEnded && (
                  <AppTag>
                    {" "}
                    <Clock size="14" style={{ flexShrink: 0 }} /> Expired
                  </AppTag>
                )}
                {app.tags?.length > 0 &&
                  app.tags.map((tag) => <AppTag key={tag}>{tag}</AppTag>)}
              </TagContainer>
            )}
            <DescriptionContainer>
              {app.name && <AppTitle>{app.name}</AppTitle>}
              {app.configImage && app.space && (
                <SpaceTag app={app} isDisabled={isDisabled} />
              )}
              {app.description && (
                <Description $isDisabled={isDisabled}>
                  {app.description}
                </Description>
              )}
            </DescriptionContainer>
          </Top>

          <BottomLine>
            {hasStarted && !hasEnded && remainingEndTime && (
              <BottomItem>
                <Clock size="18" style={{ flexShrink: 0 }} />
                {getHumanReadableRemainingTimeTag({
                  endDuration: remainingEndTime,
                })}
              </BottomItem>
            )}
            {!hasStarted && !hasEnded && remainingStartTime && (
              <BottomItem>
                <Clock size="18" style={{ flexShrink: 0 }} />
                {getHumanReadableRemainingTimeTag({
                  startDuration: remainingStartTime,
                })}
              </BottomItem>
            )}
            {maxNumberOfEntries && !hasEnded && (
              <BottomItem>{maxNumberOfEntries} available</BottomItem>
            )}
          </BottomLine>
        </Content>
      </Container>
    );

  return null;
}
