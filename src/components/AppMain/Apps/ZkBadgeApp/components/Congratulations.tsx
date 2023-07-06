"use client";

import { ZkBadgeAppType } from "@/src/services/spaces-service/types";
import Button3D from "@/src/ui/Button3D";
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
  line-height: 38px;
  margin-bottom: 16px;
`;

const Subtitle = styled.div`
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.neutral4};
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 24px;
  text-align: center;
`;

type Props = {
  onBackToApps: () => void;
  app: ZkBadgeAppType;
  destination: string
};

export default function Congratulations({ onBackToApps, app, destination }: Props): JSX.Element {
  return (
    <Container>
      <Title style={{ marginBottom: 16 }}>Congratulations</Title>
      <Subtitle>You have successfully minted the &quot;{app.badgeMetadata.name}&quot; on {destination}</Subtitle>
      <Button3D onClick={onBackToApps} secondary>
        Back to the Apps
      </Button3D>
    </Container>
  );
}
