"use client";

import styled from "styled-components";
import { SpaceConfigFront } from "@/src/utils/getSpaceConfigsFront";
import AppCardSmall from "../AppCardSmall";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { textShorten } from "@/src/utils/textShorten";
import { CaretDown, Globe } from "phosphor-react";
import { Discord, GithubRounded, Twitter } from "../SismoReactIcon";
import colors from "@/src/themes/colors";
import Link from "next/link";
import { TelegramFilled } from "@/src/ui/SismoReactIcon";
import Default from "@/src/assets/default.svg";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 46px;
  padding: 0 45px;
  padding-top: 24px;
  padding-bottom: 48px;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 24px;
    width: 100%;
    padding: 0 20px 48px 20px;
  }
`;

const Left = styled.div`
  display: flex;
  padding: 32px 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 344px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.neutral7};
  flex-shrink: 0;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 160px;
  height: 160px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-bottom: 24px;

  @media (max-width: 900px) {
    width: 42.9vw;
    height: 42.9vw;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const SpaceTitle = styled.h1`
  text-align: center;
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.medium};
  line-height: 22px;
  margin-bottom: 16px;
`;

const SpaceDescription = styled.p<{ $isFolded: boolean }>`
  color: ${({ theme }) => theme.colors.neutral4};
  text-align: center;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: 22px;
  ${({ $isFolded }) => $isFolded && textShorten(2)}
`;

const ShowMore = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.medium};
  line-height: 20px;
  cursor: pointer;
`;

const StyledCaretDown = styled(CaretDown)<{ $isFolded: boolean }>`
  flex-shrink: 0;
  transform: ${({ $isFolded }) =>
    $isFolded ? "rotateX(0deg)" : "rotateX(180deg)"};
`;

const NumberOfApps = styled.div`
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: 16px;
  color: ${(props) => props.theme.colors.neutral4};
  line-height: 22px;
  margin-top: 24px;
`;

const SocialWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
`;

const ListTitle = styled.h2`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.medium};
  line-height: 24px;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

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
  const TWO_LINES = 62;

  const [twoLines, setTwoLines] = useState(TWO_LINES);
  const isShortened = Boolean(config?.description?.length > twoLines);
  const [isFolded, setIsFolded] = useState(isShortened);
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const _ref = ref?.current;
    if (!_ref?.clientWidth) return;

    setTwoLines((_ref.clientWidth * TWO_LINES) / 262);

    window.addEventListener("resize", () => {
      setTwoLines((_ref?.clientWidth * TWO_LINES) / 262);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setTwoLines((_ref?.clientWidth * TWO_LINES) / 262);
      });
    };
  }, [ref?.current?.clientWidth]);

  return (
    <Container>
      <Left>
        <ImageContainer>
          <StyledImage
            src={config?.profileImage || Default}
            fill={true}
            placeholder="blur"
            alt={config?.name}
            sizes="40vw"
          />
        </ImageContainer>
        <SpaceTitle>{config?.name}</SpaceTitle>
        <SpaceDescription $isFolded={isFolded} ref={ref}>
          {config?.description}
        </SpaceDescription>
        {isShortened && (
          <ShowMore onClick={() => setIsFolded(!isFolded)}>
            {isFolded ? "Show more" : "Show less"}
            <StyledCaretDown size={16} $isFolded={isFolded} />
          </ShowMore>
        )}
        <NumberOfApps>
          {config?.apps?.length} app{config?.apps?.length > 1 && "s"}
        </NumberOfApps>
        {config?.socialLinks?.length > 0 && (
          <SocialWrapper>
            {config.socialLinks.map((socialLink, index) => {
              switch (socialLink?.type) {
                case "twitter":
                  return (
                    <StyledLink
                      href={socialLink?.link}
                      key={"twitter" + index}
                      target="_blank"
                    >
                      <Twitter size={20} color={colors.blue0} />
                    </StyledLink>
                  );
                case "discord":
                  return (
                    <StyledLink
                      href={socialLink?.link}
                      key={"discord" + index}
                      target="_blank"
                    >
                      <Discord
                        size={20}
                        key={"discord" + index}
                        color={colors.blue0}
                      />
                    </StyledLink>
                  );
                case "github":
                  return (
                    <StyledLink
                      href={socialLink?.link}
                      key={"github" + index}
                      target="_blank"
                    >
                      <GithubRounded
                        size={20}
                        key={"github" + index}
                        color={colors.blue0}
                      />
                    </StyledLink>
                  );
                case "telegram":
                  return (
                    <StyledLink
                      href={socialLink?.link}
                      key={"telegram" + index}
                      target="_blank"
                    >
                      <TelegramFilled
                        size={20}
                        key={"telegram" + index}
                        color={colors.blue0}
                      />
                    </StyledLink>
                  );
                case "link":
                  return (
                    <StyledLink
                      href={socialLink?.link}
                      key={"globe" + index}
                      target="_blank"
                    >
                      <Globe size={24} key={index} color={colors.blue0} />
                    </StyledLink>
                  );
                default:
                  return null;
              }
            })}
          </SocialWrapper>
        )}
      </Left>
      {config?.apps?.length > 0 && (
        <Right>
          <ListTitle>Applications</ListTitle>
          <AppList>
            {config.apps.map((app, index) => (
              <AppCardSmall
                key={app.slug + index}
                app={app}
                isSeparator={index !== config?.apps.length - 1}
              />
            ))}
          </AppList>
        </Right>
      )}
    </Container>
  );
}
