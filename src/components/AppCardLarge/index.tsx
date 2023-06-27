import { AppFront } from "@/src/app/(home)/page";
import Image from "next/image";
import styled from "styled-components";
import AppTag from "../AppTag";
import { textShorten } from "@/src/utils/textShorten";

const Container = styled.div`
  display: flex;
  padding: 20px;
  align-items: flex-start;
  gap: 16px;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.neutral7};

  @media (max-width: 900px) {
    flex-direction: column;
     width: 72.4vw;
   // width: 428px;
    padding: 16px;
    scroll-snap-align: start;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 240px;
  height: 240px;
  flex-shrink: 0;
  border-radius: 8px;

  @media (max-width: 900px) {
    width: calc(72.5vw - (2px + 32px));
    height: calc(72.5vw - ( 2px + 32px));
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  flex-grow: 1;
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
  color: ${({ theme }) => theme.colors.neutral1};
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 4px;
  ${textShorten(2)}
`;

const SpaceLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
`;

const SpaceImageContainer = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`;

const StyledSpaceImage = styled(Image)`
  object-fit: cover;
`;

const SpaceName = styled.div`
  color: ${({ theme }) => theme.colors.neutral5};
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.medium};
  line-height: 18px;
  ${textShorten(1)}
`;

const Description = styled.p`
color: ${({ theme }) => theme.colors.neutral4};
font-size: 14px;
font-family: ${({ theme }) => theme.fonts.regular};
line-height: 20px;
${textShorten(5)}
margin-top: 16px;
`;

type Props = {
  app: AppFront;
};

export default function AppCardLarge({ app }: Props): JSX.Element {
  if (app)
    return (
      <Container>
        <ImageContainer>
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
          {app.tags?.length > 0 && (
            <TagContainer>
              {app.tags.map((tag) => (
                <AppTag key={tag} label={tag} />
              ))}
            </TagContainer>
          )}
          <DescriptionContainer>
            {app.name && <AppTitle>{app.name}</AppTitle>}
            {app.configImage && app.space && (
              <SpaceLine>
                <SpaceImageContainer>
                  <StyledSpaceImage
                    src={app.configImage}
                    alt={app.space}
                    fill={true}
                    placeholder="blur"
                  />
                </SpaceImageContainer>
                <SpaceName>{app.space}</SpaceName>
              </SpaceLine>
            )}
           {app.description && <Description>{app.description}</Description>}
          </DescriptionContainer>
        </Content>
      </Container>
    );

  return null;
}
