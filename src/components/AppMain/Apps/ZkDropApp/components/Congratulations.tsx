"use client";

import useEthAccount from "@/src/hooks/useEthAccount";
import { Network, getErc721Explorer } from "@/src/libs/contracts/networks";
import { ZkDropAppType } from "@/src/services/spaces-service";
import Button3D from "@/src/ui/Button3D";
import { getMinimalEns, getMinimalIdentifier } from "@/src/utils/useMainMinified";
import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  height: 216px;
`;

const Title = styled.div`
  font-family: ${(props) => props.theme.fonts.semibold};
  color: ${(props) => props.theme.colors.neutral1};
  font-size: 32px;
  line-height: 38px;
  margin-top: 32px;
`;

const Subtitle = styled.div`
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.neutral4};
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 32px;
  text-align: center;
`;

type Props = {
  app: ZkDropAppType;
  destination: `0x${string}`;
  network: Network;
  tokenId?: string | null;
};

export default function Congratulations({
  app,
  destination,
  network,
  tokenId,
}: Props): JSX.Element {
  const ethAccount = useEthAccount(destination);

  return (
    <Container>
      <Title style={{ marginBottom: 12 }}>Congratulations</Title>
      <Subtitle>
        You have receive your NFT on{" "}
        {ethAccount.ens ? getMinimalEns(ethAccount.ens) : getMinimalIdentifier(ethAccount.address)}
      </Subtitle>
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
