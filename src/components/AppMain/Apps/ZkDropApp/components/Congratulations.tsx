"use client";

import useEthAccount from "@/src/hooks/useEthAccount";
import { Network, getErc721Explorer } from "@/src/libs/contracts/networks";
import { ZkDropAppType } from "@/src/services/spaces-service";
import Button3D from "@/src/ui/Button3D";
import { getMinimalEns, getMinimalIdentifier } from "@/src/utils/useMainMinified";
import { ArrowSquareOut } from "phosphor-react";
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
  cursor: pointer;
`;

type Props = {
  onBackToApps: () => void;
  app: ZkDropAppType;
  destination: `0x${string}`;
  network: Network;
  tokenId?: string | null;
};

export default function Congratulations({ onBackToApps, app, destination, network, tokenId }: Props): JSX.Element {
  const ethAccount = useEthAccount(destination);
  
  return (
    <Container>
      <Title style={{ marginBottom: 16 }}>Congratulations</Title>
      <Subtitle 
        onClick={() => {
          const explorer = getErc721Explorer({
            contractAddress: app.chains.find(chain => chain.name === network)?.contractAddress, 
            network: network,
            tokenId: tokenId
          });
          window.open(explorer, "_blank");
        }}
      >
        You have successfully minted the &quot;{app.nftMetadata.name}&quot; on {ethAccount.ens ? getMinimalEns(ethAccount.ens) : getMinimalIdentifier(ethAccount.address)}
        <ArrowSquareOut style={{ marginTop: -8, marginLeft: 4 }} size={18}/>
      </Subtitle>
      <Button3D onClick={onBackToApps} secondary>
        Back to the Apps
      </Button3D>
    </Container>
  );
}
