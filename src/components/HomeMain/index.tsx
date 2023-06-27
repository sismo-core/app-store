"use client";
import {
  AppFront,
  SpaceConfigFront,
  SpaceImportedImage,
} from "@/src/app/(home)/page";
import env from "@/src/environments";
import Link from "next/link";
import styled from "styled-components";
import AppCardLarge from "../AppCardLarge";

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
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;

  @media (max-width: 900px) {
    display: flex;
    gap: 24px;
    width: 100%;
    overflow-x: scroll;
    /* Create a scrollable area */
    scroll-snap-type: x inherit;
    scroll-behavior: smooth;
    scroll-snap-stop: always;
    white-space: nowrap;
  }

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Hide the scrollbar for WebKit browsers */
  }
`;

type Props = {
  configs: SpaceConfigFront[];
  apps: AppFront[];
};

export default function HomeMain({ configs, apps }: Props): JSX.Element {
  const filteredApps = apps.filter((app) => {
    if (env.isDemo) {
      return app.isFeatured?.includes("Demo");
    }
    if (!env.isDemo) {
      return app.isFeatured?.includes("Prod");
    }
  });

  return (
    <Container>
      <Section>
        <TitleLine>
          <Title>Featured apps</Title>
          <ExploreAll href="/popular">Explore all</ExploreAll>
        </TitleLine>
        <Grid>
          {filteredApps.length > 0 &&
            filteredApps.map((app) => (
              <AppCardLarge key={app.slug} app={app} />
            ))}
        </Grid>
      </Section>
      <Section>
        <TitleLine>
          <Title>New apps</Title>
          <ExploreAll href="/popular">Explore all</ExploreAll>
        </TitleLine>

        <Grid>
          <div>App 1</div>
          <div>App 2</div>
        </Grid>
      </Section>
      <Section>
        <TitleLine>
          <Title>Spaces</Title>
          <ExploreAll href="/popular">Explore all</ExploreAll>
        </TitleLine>
        <Grid>
          <div>App 1</div>
          <div>App 2</div>
        </Grid>
      </Section>
    </Container>
  );
}
