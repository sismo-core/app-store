"use client";

import Button3D from "@/src/ui/Button3D";
import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import Toggle, { ToggleOption } from "../../ui/Toggle";
import { useRouter, usePathname } from "next/navigation";
import env from "@/src/environments";

const Container = styled.header`
  height: 409px;
  color: white;
  position: relative;

  @media (max-width: 900px) {
    padding: 0 20px;
  }

  @media (max-width: 700px) {
    height: 664px;
  }
`;

const Separator = styled.div`
  background-color: #525c8f;
  height: 1px;
  width: 100%;
  position: absolute;
  left: 0px;
  bottom: 0px;
`;

const Title = styled.div`
  font-size: 36px;
  max-width: 550px;
  font-family: Sarabun-Bold;
  font-size: 36px;
  line-height: 46px;
  margin-top: 24px;
  @media (max-width: 700px) {
    max-width: 335px;
  }
`;

const Subtitle = styled.div`
  font-size: 18px;
  max-width: 336px;
  line-height: 30px;
  font-family: ${(props) => props.theme.fonts.regular};
  margin-bottom: 32px;
  @media (max-width: 700px) {
    max-width: 335px;
  }
`;

const TextContainer = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 60px;

  @media (max-width: 700px) {
    padding-top: 100px;
  }
`;

const Letter = styled.span<{ bold?: boolean }>`
  ${(props) =>
    props.bold &&
    `
        font-family: ${props.theme.fonts.semibold};
    `}
`;

const LetterPurple = styled(Letter)`
  color: ${(props) => props.theme.colors.purple2};
`;
const LetterRed = styled(Letter)`
  color: ${(props) => props.theme.colors.red};
`;
const LetterOrange = styled(Letter)`
  color: ${(props) => props.theme.colors.orange2};
`;
const LetterGreen = styled(Letter)`
  color: ${(props) => props.theme.colors.green2};
`;
const LetterBlue = styled(Letter)`
  color: ${(props) => props.theme.colors.blueRYB};
`;
const LetterBrown = styled(Letter)`
  color: #9e7647;
`;

const ImageTopLeft = styled(Image)`
  top: -5px;
  left: 30px;
  position: absolute;
  @media (max-width: 900px) {
    left: -80px;
  }
  @media (max-width: 700px) {
    left: -240px;
    top: 0px;
  }
`;
const ImageTopRight = styled(Image)`
  top: -5px;
  right: 190px;
  position: absolute;

  @media (max-width: 1150px) {
    right: 150px;
  }
  @media (max-width: 1050px) {
    right: 100px;
  }
  @media (max-width: 950px) {
    right: 50px;
  }
  @media (max-width: 870px) {
    right: 0px;
  }
  @media (max-width: 700px) {
    right: -63px;
  }
`;
const ImageBottomLeft = styled(Image)`
  bottom: 26px;
  left: 53px;
  position: absolute;
  @media (max-width: 1000px) {
    left: -60px;
  }
  @media (max-width: 700px) {
    left: -74px;
    bottom: 70px;
  }
`;
const ImageBottomRight = styled(Image)`
  bottom: 45px;
  right: -20px;
  position: absolute;
  @media (max-width: 1000px) {
    right: -60px;
  }
  @media (max-width: 870px) {
    right: -110px;
  }
  @media (max-width: 400px) {
    right: -90px;
  }
`;

const ImageHeart = styled(Image)`
  bottom: 190px;
  left: 240px;
  position: absolute;
  @media (max-width: 1150px) {
    display: none;
  }
  @media (max-width: 700px) {
    display: unset;
    left: 60%;
  }
`;

const ImageBadgeTopLeft = styled(Image)`
  left: 308px;
  top: 25px;
  position: absolute;
  @media (max-width: 900px) {
    left: 170px;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;

const ImageBadgeTop = styled(Image)`
  top: -12px;
  left: 54%;
  position: absolute;
  @media (max-width: 700px) {
    left: 40%;
  }
`;
const ImageBadgeBottom = styled(Image)`
  bottom: 146px;
  left: 370px;
  position: absolute;
  @media (max-width: 1200px) {
    display: none;
  }
`;

const options : ToggleOption[] = [
  { label: "Live", value: "live" },
  { label: "Demo", value: "demo" },
];

export default function Hero(): JSX.Element {
  const router = useRouter();
  const [selected, setSelected] = useState<string>(env.isDemo ? "demo" : "live");
  function onToggleChange(value: string) {
    setSelected(options.find((option) => option.value === value).value);
    if(value === "demo"){
      router.push("https://demo.apps.sismo.io");
    }
    if(value === "live"){
      router.push("https://apps.sismo.io");
    }
  }


  return (
    <Container>
      <Separator />
      <ImageTopLeft
        src={"./HomeHero/background-top-left.svg"}
        alt="Background Ziki"
        width={359}
        height={192}
      />
      <ImageTopRight
        src={"./HomeHero/background-top-right.svg"}
        alt="Background Ziki"
        width={222}
        height={174}
      />
      <ImageBottomRight
        src={"./HomeHero/background-bottom-right.svg"}
        alt="Background Ziki"
        width={348}
        height={206}
      />
      <ImageBottomLeft
        src={"./HomeHero/background-bottom-left.svg"}
        alt="Background Ziki"
        width={292}
        height={223}
      />
      <ImageHeart
        src={"./HomeHero/hearts.svg"}
        alt="Background Ziki"
        width={33}
        height={45}
      />
      <ImageBadgeTopLeft
        src={"./HomeHero/badge-top-left.svg"}
        alt="Background Ziki"
        width={38}
        height={38}
      />
      <ImageBadgeTop
        src={"./HomeHero/badge-top.svg"}
        alt="Background Ziki"
        width={38}
        height={38}
      />
      <ImageBadgeBottom
        src={"./HomeHero/badge-bottom.svg"}
        alt="Background Ziki"
        width={33}
        height={36}
      />
      <TextContainer>
        <Toggle
          selected={selected}
          options={options}
          onChange={onToggleChange}
        />
        <Title style={{ marginBottom: 29 }}>Sismo App Store</Title>
        <Subtitle>
        Explore Sismo Connect Apps built by<br/>the community
        </Subtitle>
        <Button3D
          onClick={() =>
            window.open(
              "https://app.deform.cc/form/5d8438a7-75a9-4b02-bf0d-b42b63cd2b85/",
              "_blank"
            )
          }
        >
          Create your app
        </Button3D>
      </TextContainer>
    </Container>
  );
}
