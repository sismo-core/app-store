"use client";

import { Network, getErc721Explorer } from "@/src/libs/contracts/networks";
import { ZkDropAppType } from "@/src/services/spaces-service";
import Button3D from "@/src/ui/Button3D";
import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  height: 216px;
`;
const Subtitle = styled.div`
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.neutral1};
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 32px;
  text-align: center;
  line-height: 22px;
  margin-top: 48px;
`;

type Props = {
  app: ZkDropAppType;
  network: Network;
  tokenId?: string | null;
};

export default function AlreadyMinted({ app, network, tokenId }: Props): JSX.Element {
  return (
    <Container>
      <Subtitle onClick={() => {}}>You already claimed your NFT!</Subtitle>
      <Button3D
        secondary
        onClick={() => {
          const explorer = getErc721Explorer({
            contractAddress: app.chains.find((chain) => chain.name === network)?.contractAddress,
            network: network,
            tokenId: tokenId,
          });
          window.open(explorer, "_blank");
        }}
      >
        View NFT
      </Button3D>
    </Container>
  );
}
