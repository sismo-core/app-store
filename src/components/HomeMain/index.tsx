"use client";
import Link from "next/link";
import styled from "styled-components";
import AppCardLarge from "../AppCardLarge";
import SpaceCard from "../SpaceCard";
import AppCardSmall from "../AppCardSmall";
import AppListGrid from "../Layouts/AppListGrid";
import { SpaceType, ZkAppType } from "@/src/services/spaces-service";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 64px;
  margin: 48px 0px;
`;

const Section = styled.section`
  position: relative;
  color: ${({ theme }) => theme.colors.neutral1};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 100%;
`;

const TitleLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  @media (max-width: 900px) {
    padding: 0 20px;
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.neutral1};
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.semibold};
  line-height: 30px;
`;

const ExploreAll = styled(Link)`
  text-align: center;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.medium};
  line-height: 20px;
  transition: color ${({ theme }) => theme.animations.transition};

  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.neutral3};
  }
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
`;

const SlideGrid = styled(Grid)`
  @media (max-width: 900px) {
    display: flex;
    gap: 24px;
    width: 100%;
    overflow-x: scroll;
    /* Create a scrollable area */
    scroll-snap-type: x mandatory;
    scroll-snap-stop: always;
    scroll-behavior: smooth;
    white-space: nowrap;
    padding: 0 20px;
  }

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Hide the scrollbar for WebKit browsers */
  }
`;

const SpaceFlex = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  gap: 24px;

  @media (max-width: 900px) {
    display: flex;
    gap: 24px;
    width: 100%;
    overflow-x: scroll;
    /* Create a scrollable area */
    scroll-snap-type: x mandatory;
    scroll-snap-stop: always;
    scroll-behavior: smooth;
    white-space: nowrap;
    padding: 0 20px;
  }

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Hide the scrollbar for WebKit browsers */
  }
`;

const StyledAppListGrid = styled(AppListGrid)`
  @media (max-width: 900px) {
    padding: 0 20px !important;
  }
`;

type Props = {
  spaces: SpaceType[];
  apps: ZkAppType[];
};

export default function HomeMain({ spaces, apps }: Props): JSX.Element {
  const featuredApps = apps.filter((app) => {
      return app.isFeatured;
  });
  const newApps = apps.slice(0, 6);
  const firstFiver = spaces.slice(0, 5);

  return (
    <Container>
      <Section>
        <TitleLine>
          <Title>Featured apps</Title>
          <ExploreAll href="/explore">Explore all</ExploreAll>
        </TitleLine>
        <SlideGrid>
          {featuredApps.length > 0 &&
            featuredApps.map((app) => (
              <AppCardLarge key={"featured/" + app.appId + "/" + app.slug} app={app} />
            ))}
        </SlideGrid>
      </Section>
      <Section>
        <TitleLine>
          <Title>New apps</Title>
          <ExploreAll href="/explore/apps">Explore all</ExploreAll>
        </TitleLine>

        <StyledAppListGrid>
          {newApps.length > 0 &&
            newApps.map((app, index) => (
              <AppCardSmall
                app={app}
                key={app.space.slug + "/" + app.slug + "/" + index}
                isSeparator={
                  newApps.length % 2 === 0
                    ? index !== newApps.length - 1 &&
                      index !== newApps.length - 2
                    : index !== newApps.length - 1
                }
              />
            ))}
        </StyledAppListGrid>
      </Section>
      <Section>
        <TitleLine>
          <Title>Spaces</Title>
          <ExploreAll href="/explore/spaces">Explore all</ExploreAll>
        </TitleLine>
        <SpaceFlex>
          {firstFiver.map((space) => (
            <SpaceCard key={"space/" + space.slug} space={space} />
          ))}
        </SpaceFlex>
      </Section>
    </Container>
  );
}
