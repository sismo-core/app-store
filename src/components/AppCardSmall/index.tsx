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
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  border-radius: 16px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme, $isDisabled }) =>
    $isDisabled ? theme.colors.neutral5 : theme.colors.neutral1};
  transition: background-color ${({ theme }) => theme.animations.transition};
  cursor: ${({ $isDisabled }) => ($isDisabled ? "default" : "pointer")};

  @media (max-width: 900px) {
    gap: 12px;
  }
`;

const ImageContainer = styled.div<{ $isDisabled: boolean }>`
  position: relative;
  overflow: hidden;
  width: 88px;
  height: 88px;
  flex-shrink: 0;
  border-radius: 8px;
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};

  @media (max-width: 900px) {
    width: 80px;
    height: 80px;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  justify-content: stretch;
  gap: 4px;
`;

const Left = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: stretch;
  gap: 4px;
  flex-shrink: 1;

  @media (max-width: 900px) {
    flex-grow: 1;
  }
`;

const TitleAndDescription = styled.div`
  display: flex;
  flex-grow: 1;
  max-width: 276px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  flex-shrink: 0;

  @media (min-width: 900px) {
    display: none;
  }
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`;

const AppTitle = styled.h3`
  color: inherit;
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 4px;
  ${textShorten(2)}
`;

const Description = styled.p<{ $isDisabled: boolean }>`
  color: ${({ theme, $isDisabled }) =>
    $isDisabled ? theme.colors.neutral5 : theme.colors.neutral4};
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: 20px;
  ${textShorten(2)}
  margin-top: 8px;

  @media (max-width: 900px) {
    display: none;
  }
`;

const BottomLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  flex-wrap: wrap;
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.medium};
  line-height: 18px;
  gap: 8px;
  @media (min-width: 900px) {
    display: none;
  }
`;
const BottomRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.medium};
  line-height: 20px;
  gap: 4px;
  @media (max-width: 900px) {
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

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  align-items: stretch;
  justify-content: space-between;
  flex-shrink: 1;
  flex-grow: 1;

  @media (max-width: 900px) {
    display: none;
  }
`;

const TagRightContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  width: 10vw;
  gap: 4px;
  flex-wrap: wrap;
  flex-shrink: 1;
  flex-grow: 1;

  @media (max-width: 900px) {
    display: none;
  }
`;

type Props = {
  app: AppFront;
  className?: string;
};

export default function AppCardLarge({ app, className }: Props): JSX.Element {
  const { remainingStartTime, remainingEndTime, hasStarted, hasEnded } =
    useRemainingTime({ startDate: app?.startDate, endDate: app?.endDate });

  const isDisabled = hasEnded;

  const maxNumberOfEntries =
    (app?.type == "zksub" || app?.type == "zkdrop") &&
    app?.userSelection?.type == "Lottery" &&
    app?.userSelection?.maxNumberOfEntries;

  if (app)
    return (
      <Container $isDisabled={isDisabled} className={className}>
        <ImageContainer $isDisabled={isDisabled}>
          {app.image && app.name && (
            <StyledImage
              src={app.image}
              alt={app.name}
              fill={true}
              placeholder="blur"
            />
          )}
        </ImageContainer>
        <Content>
          <Left>
            <TitleAndDescription>
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
            </TitleAndDescription>

            {(maxNumberOfEntries ||
              (hasStarted && !hasEnded && remainingEndTime) ||
              (!hasStarted && !hasEnded && remainingStartTime)) && (
              <BottomLine>
                {maxNumberOfEntries && (
                  <BottomItem>{maxNumberOfEntries} available</BottomItem>
                )}
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
              </BottomLine>
            )}
          </Left>
          <Right>
            {(hasEnded || app.tags?.length > 0) && (
              <TagRightContainer>
                {hasEnded && (
                  <AppTag>
                    {" "}
                    <Clock size="14" style={{ flexShrink: 0 }} /> Expired
                  </AppTag>
                )}
                {app.tags?.length > 0 &&
                  app.tags.map((tag) => <AppTag key={tag}>{tag}</AppTag>)}
              </TagRightContainer>
            )}
            {(maxNumberOfEntries ||
              (hasStarted && !hasEnded && remainingEndTime) ||
              (!hasStarted && !hasEnded && remainingStartTime)) && (
              <BottomRight>
                {maxNumberOfEntries && (
                  <BottomItem>{maxNumberOfEntries} available</BottomItem>
                )}
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
              </BottomRight>
            )}
          </Right>
        </Content>
      </Container>
    );

  return null;
}
