"use client";

import { CustomAppConfig } from "@/space-configs/types";
import Button3D from "@/src/ui/Button3D";
import { useRouter } from "next/navigation";
import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-family: ${(props) => props.theme.fonts.semibold};
  color: ${(props) => props.theme.colors.neutral1};
  font-size: 32px;
  margin-top: 63px;
`;

const Subtitle = styled.div`
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.neutral3};
  font-size: 16px;
  margin-bottom: 63px;
  text-align: center;
`;

type Props = {
  app: CustomAppConfig;
};

export default function Congratulations({ app }: Props): JSX.Element {
  const router = useRouter();

  return (
    <Container>
      <Title style={{ marginBottom: 16 }}>
        {app?.templateConfig?.congratulationsMessage?.title}
      </Title>
      <Subtitle>{app?.templateConfig?.congratulationsMessage?.description}</Subtitle>
      <Button3D onClick={() => router.push("/synaps")} secondary>
        Back to the space
      </Button3D>
    </Container>
  );
}
