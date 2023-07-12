"use client";

import React, { useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import Button3D from "@/src/ui/Button3D";
import { GroupSnapshotMetadata } from "@/src/libs/group-provider";
import Section from "../components/Section";
import { ZkDropAppType } from "@/src/services/spaces-service";
import { usePathname } from "next/navigation";
import { AuthType, SismoConnectButton } from "@sismo-core/sismo-connect-react";
import { getImpersonateAddresses } from "@/src/utils/getImpersonateAddresses";
import env from "@/src/environments";
import SelectDestination from "./components/SelectDestination";
import Requirements from "./components/Requirements";
import { Network, getTxExplorer, networkChainIds } from "@/src/libs/contracts/networks";
import { getMessageSignature } from "./utils/getMessageSignature";
import Error from "@/src/ui/Error";
import Congratulations from "./components/Congratulations";
import { getMinimalHash } from "@/src/utils/getMinimalHash";
import { ArrowSquareOut } from "phosphor-react";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useNetwork,
  useSwitchNetwork,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ZK_DROP_ABI } from "@/src/libs/contracts/zk-drop";
import SelectChain from "./components/SelectChain";
import Default from "@/src/assets/default.svg";
import Image from "next/image";
import AlreadyMinted from "./components/AlreadyClaimed";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;

  @media (max-width: 1060px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Content = styled.div`
  width: 580px;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const SismoButtonContainer = styled.div<{ disabled: boolean }>`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  ${(props) =>
    props.disabled &&
    `
    opacity: 0.5;
  `}
`;

const DisabledButton = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const MintContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
  padding-bottom: 13px;
`;

const TransactionLink = styled.div`
  font-size: 14px;
  height: 20px;
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.medium};
`;

const Inline = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;

const Label = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
  font-family: ${(props) => props.theme.fonts.bold};
`;

const NFTVisual = styled.div`
  height: 100%;
  position: relative;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1060px) {
    margin-bottom: 30px;
    margin-right: 0px;
  }
`;

const NFTContainer = styled.div`
  width: 340px;
  height: 340px;
  border-radius: 4px;
  border: 0.805px solid var(--spaces-neutral-7, #3a4161);
  overflow: hidden;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const NFTLabel = styled.div`
  font-size: 20px;
  line-height: 24px;
  color: ${(props) => props.theme.colors.neutral4};
  font-family: ${(props) => props.theme.fonts.semibold};
  line-height: 24px;
  max-width: 100%;
  min-width: 100%;
  width: min-content;
  text-align: center;
`;

type Props = {
  groupSnapshotMetadataList: GroupSnapshotMetadata[];
  app: ZkDropAppType;
};

export default function ZkDropApp({ app, groupSnapshotMetadataList }: Props): JSX.Element {
  const pathname = usePathname();

  const { openConnectModal, connectModalOpen } = useConnectModal();
  const { chain } = useNetwork();
  const { isConnected } = useAccount();

  const [error, setError] = useState(null);
  const [alreadyMinted, setAlreadyMinted] = useState(true);
  const [minted, setMinted] = useState(true);
  const [destination, setDestination] = useState<`0x${string}`>(null);
  const [responseBytes, setResponseBytes] = useState<string>(null);
  const [minting, setMinting] = useState(null);
  const [hash, setHash] = useState(null);
  const hasResponse = Boolean(responseBytes);
  const [vaultId, setVaultId] = useState(null);

  const [chainApp, setChainApp] = useState<Network>(
    app?.chains?.length === 1 ? app?.chains[0]?.name : null
  );
  const [isRelayed, setIsRelayed] = useState<boolean>(
    app?.chains?.length === 1 ? app?.chains[0]?.relayerEnabled : null
  );

  const sismoConnectConfig = useMemo(() => {
    const config = {
      appId: app.appId,
      vault: env.isDemo
        ? {
            impersonate: getImpersonateAddresses(app),
          }
        : null,
    };
    return config;
  }, [app]);

  useEffect(() => {
    if (destination) {
      window.localStorage.setItem("destination_zk_drop", destination);
    }
  }, [destination]);

  useEffect(() => {
    if (!app.chains) return;
    if (chainApp && app.chains.find((chain) => chain.name === chainApp)) {
      setIsRelayed(app.chains.find((chain) => chain.name === chainApp)?.relayerEnabled);
      window.localStorage.setItem("chain_app_zk_drop", chainApp);
    }
  }, [chainApp, app.chains]);

  const contractAddress = app.chains.find((chain) => chain.name === chainApp)?.contractAddress;

  useContractRead({
    address: contractAddress,
    abi: ZK_DROP_ABI,
    functionName: "balanceOf",
    args: [destination],
    enabled: Boolean(destination) && Boolean(chainApp),
    chainId: networkChainIds[chainApp],
    account: null,
    onSuccess: (data: BigInt) => {
      if (typeof data === "bigint" && data > 0) {
        setAlreadyMinted(true);
      }
    },
  });

  useContractRead({
    address: contractAddress,
    abi: ZK_DROP_ABI,
    functionName: "ownerOf",
    args: [vaultId],
    enabled: Boolean(vaultId),
    chainId: networkChainIds[chainApp],
    account: null,
    onSuccess: () => {
      setAlreadyMinted(true);
    },
    onError: () => {},
  });

  /****************************************************************************/
  /******************************** RELAYED ***********************************/
  /****************************************************************************/

  const mintRelayed = async () => {
    setHash(null);
    setError(null);
    setMinting(true);
    const body = {
      responseBytes: responseBytes,
      destination: destination,
      chain: chainApp,
      spaceSlug: app.space.slug,
      appSlug: app.slug,
    };
    const res = await fetch("/api/zk-drop/relay-tx", {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      setMinting(false);
      return;
    }
    const data = await res.json();
    if (data.success) {
      setHash(data.txHash);
    } else {
      if (data.code === "minting-error") {
        setError("Claiming error. Please contact us or retry later.");
      }
    }
  };

  /****************************************************************************/
  /****************************** NOT RELAYED *********************************/
  /****************************************************************************/

  const { switchNetwork, isLoading: isSwitchingNetwork } = useSwitchNetwork();

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: ZK_DROP_ABI,
    functionName: "claimWithSismoConnect",
    args: [responseBytes, destination],
    chainId: networkChainIds[chainApp],
    enabled: Boolean(responseBytes) && Boolean(destination),
  });

  const { data, write, isLoading: isLoadingWriteContract } = useContractWrite(config);
  useEffect(() => {
    if (data && data.hash) {
      setHash(data.hash);
    }
  }, [data]);

  const { isLoading: isLoadingTransaction } = useWaitForTransaction({
    hash: hash,
    chainId: networkChainIds[chainApp],
    onSuccess: () => {
      setMinted(true);
      setMinting(false);
    },
    onError: () => {
      setError("Error while claiming your NFT");
    },
  });

  const mintNotRelayed = async () => {
    setError(null);
    setHash(null);
    if (!isRelayed && !isConnected) {
      openConnectModal();
      return;
    }
    if (!isRelayed && chain.id !== networkChainIds[chainApp]) {
      switchNetwork(networkChainIds[chainApp]);
      return;
    }
    write();
  };

  return (
    <Container>
      <NFTVisual>
        <NFTContainer>
          <Image
            src={app.image || Default}
            alt={app.name}
            placeholder="blur"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </NFTContainer>
        <NFTLabel>Claim {app.nftMetadata.name}</NFTLabel>
      </NFTVisual>
      <Content>
        <Section
          number={1}
          isOpen={!hasResponse || !destination}
          title={app?.step1CtaText}
          style={{ marginBottom: 16 }}
          success={hasResponse && Boolean(destination)}
          onClick={() => {
            window.location.href = window.location.origin + window.location.pathname;
          }}
        >
          <Requirements app={app} groupSnapshotMetadataList={groupSnapshotMetadataList} />
          <Label>NFT Recipient</Label>
          {app.chains.length > 1 && (
            <SelectChain
              style={{
                marginBottom: 8,
              }}
              onChainSelected={(_chain: Network) => setChainApp(_chain)}
              selectedChain={chainApp}
              chains={app.chains.map((chain) => chain.name)}
            />
          )}
          <SelectDestination
            onDestinationSelected={(_destination: `0x${string}`) => setDestination(_destination)}
          />
          <SismoButtonContainer disabled={!destination || !chainApp}>
            {(!destination || !chainApp) && <DisabledButton />}
            <SismoConnectButton
              config={sismoConnectConfig}
              claims={app?.claimRequests}
              auths={app?.authRequests}
              signature={{ message: getMessageSignature({ destination }) }}
              text={"Sign in with Sismo"}
              callbackPath={pathname}
              onResponseBytes={(response) => {
                setResponseBytes(response);
                setDestination(window.localStorage.getItem("destination_zk_drop") as `0x${string}`);
                const chainAppZkDrop = window.localStorage.getItem("chain_app_zk_drop") as Network;
                if (chainAppZkDrop && app.chains.find((chain) => chain.name === chainAppZkDrop)) {
                  setChainApp(chainAppZkDrop);
                }
              }}
              onResponse={(response) => {
                const vaultId = response.proofs.find((proof) => {
                  if (!proof.auths) return false;
                  if (proof.auths[0].authType === AuthType.VAULT) {
                    return true;
                  }
                })?.auths[0]?.userId;
                setVaultId(vaultId);
              }}
            />
          </SismoButtonContainer>
        </Section>
        <Section
          number={2}
          isOpen={hasResponse && Boolean(destination)}
          title={app?.step2CtaText}
          success={(alreadyMinted && hasResponse) || minted}
        >
          {minted ? (
            <Congratulations
              app={app}
              destination={destination}
              network={chainApp}
              tokenId={vaultId ? BigInt(vaultId)?.toString() : null}
            />
          ) : (
            <>
              {alreadyMinted && hasResponse ? (
                <AlreadyMinted
                  app={app}
                  network={chainApp}
                  tokenId={vaultId ? BigInt(vaultId)?.toString() : null}
                />
              ) : (
                <MintContainer>
                  {isRelayed ? (
                    <Button3D onClick={mintRelayed} secondary loading={minting}>
                      {minting ? "Claiming..." : `Claim NFT`}
                    </Button3D>
                  ) : (
                    <Button3D
                      onClick={mintNotRelayed}
                      secondary
                      loading={
                        isLoadingTransaction ||
                        connectModalOpen ||
                        isLoadingWriteContract ||
                        isSwitchingNetwork
                      }
                    >
                      {isConnected ? (
                        <>
                          {chain.id !== networkChainIds[chainApp] ? (
                            <>{isSwitchingNetwork ? "Switching Network..." : "Switch Network"}</>
                          ) : (
                            <>
                              {isLoadingTransaction || isLoadingWriteContract
                                ? "Claiming..."
                                : `Claim NFT`}
                            </>
                          )}
                        </>
                      ) : (
                        <>{connectModalOpen ? "Connecting wallet..." : "Connect Wallet"}</>
                      )}
                    </Button3D>
                  )}
                  {hash && (
                    <TransactionLink style={{ marginTop: 20 }}>
                      <Inline
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          window.open(getTxExplorer({ txHash: hash, network: chainApp }), "_blank");
                        }}
                      >
                        Transaction hash: {getMinimalHash(hash)}
                        <ArrowSquareOut style={{ marginTop: -8, marginLeft: 4 }} size={18} />
                      </Inline>
                    </TransactionLink>
                  )}
                </MintContainer>
              )}
            </>
          )}
        </Section>
        {error && <Error style={{ marginTop: 16 }}>{error}</Error>}
      </Content>
    </Container>
  );
}
