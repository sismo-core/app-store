"use client";

import styled from "styled-components";
import { SpaceConfigFront } from "@/src/utils/getSpaceConfigsFront";
import AppCardSmall from "../AppCardSmall";

const Container = styled.div`
  display: flex;
  gap: 46px;
  padding: 0 45px;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 24px;
    width: 100%;
    padding: 0;
  }
`;

const Left = styled.div`
  display: flex;
  padding: 32px 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  width: 344px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.neutral7};
  flex-shrink: 0;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
`;


const ImageContainer = styled.div<{ $isDisabled: boolean }>`
  position: relative;
  overflow: hidden;
  width: 160px;
  height: 160px;
  flex-shrink: 0;
  border-radius: 50%;

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

const ListTitle = styled.h2`
font-size: 20px;
font-family: ${({ theme }) => theme.fonts.medium};
line-height: 24px;
`

const AppList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  width: 100%;
`;

type Props = {
  config: SpaceConfigFront;
};

export default function SpacesMain({ config }: Props) {
  console.log(config);

  return (
    <Container>
      <Left>hello</Left>
      {config?.apps?.length > 0 && (
        <Right>
          <ListTitle>Applications</ListTitle>
          <AppList>
            {config.apps.map((app, index) => (
              <AppCardSmall key={app.slug + index} app={app} isSeparator={index !== config?.apps.length - 1} />
            ))}
          </AppList>
        </Right>
      )}
    </Container>
  );
}
