"use client";

import React, { useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import Button3D from "@/src/ui/Button3D";
import { GroupSnapshotMetadata } from "@/src/libs/group-provider";
import Section from "../components/Section";
import { ZkBadgeAppType } from "@/src/services/spaces-service";
import { usePathname, useRouter } from "next/navigation";
import { AuthType, SismoConnectButton } from "@sismo-core/sismo-connect-react";
import { getImpersonateAddresses } from "@/src/utils/getImpersonateAddresses";
import env from "@/src/environments";
import SelectDestination from "./components/SelectDestination";
import Requirements from "./components/Requirements";
import { getProvider } from "@/src/libs/contracts/providers";
import { Network, getErc1155Explorer, getTxExplorer, networkChainIds } from "@/src/libs/contracts/networks";
import { getMessageSignature } from "./utils/getMessageSignature";
import Error from "@/src/ui/Error";
import Congratulations from "./components/Congratulations";
import { getMinimalHash } from "@/src/utils/getMinimalHash";
import { ArrowSquareOut } from "phosphor-react";
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useNetwork, useSwitchNetwork, useWaitForTransaction } from "wagmi";
import { ZK_BADGE_ADDRESSES } from "@/src/libs/contracts/zk-badge/constants";
import { ZK_BADGE_ABI } from "@/src/libs/contracts/zk-badge";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const Content = styled.div`
  width: 580px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
  position: relative;
  height: 46px;
  display: flex;
  align-items: center;
`;

const AlreadyRegistered = styled.div`
  color: ${(props) => props.theme.colors.neutral1};
  font-family: ${(props) => props.theme.fonts.regular};
  border: 1px solid ${(props) => props.theme.colors.blueRYB};
  font-size: 16px;
  background: rgba(18, 52, 245, 0.05);
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-top: 16px;
  cursor: pointer;
`;

const SismoButtonContainer = styled.div<{disabled: boolean}>`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  ${props => props.disabled && `
    opacity: 0.5;
  `}
`

const DisabledButton = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
  position: absolute;
`

const MintContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
`

const BackToAppStore = styled.div`
  font-size: 16px;
  font-family: ${props => props.theme.fonts.medium};
  cursor: pointer;
`

const TransactionLink = styled.div`
  font-size: 14px;
  margin-top: 20px;
  height: 30px;
  font-size: 16px;
  font-family: ${props => props.theme.fonts.medium};
`;

const Inline = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;

type Props = {
  groupSnapshotMetadataList: GroupSnapshotMetadata[];
  app: ZkBadgeAppType;
};

export default function ZkBadgeApp({ app, groupSnapshotMetadataList }: Props): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  
  const { openConnectModal, connectModalOpen } = useConnectModal();
  const { chain } = useNetwork();
  const { isConnected } = useAccount();

  const [error, setError] = useState(null);
  const [alreadyMinted, setAlreadyMinted] = useState(false);
  const [minted, setMinted] = useState(false);
  const [destination, setDestination] = useState<`0x${string}`>(null);
  const [responseBytes, setResponseBytes] = useState<string>(null);
  const [minting, setMinting] = useState(null);
  const [hash, setHash] = useState(null);
  const [vaultId, setVaultId] = useState(null);
  const hasResponse = Boolean(responseBytes);

  const chainApp = app.chains[0].name;
  const isRelayed = app.chains[0].relayerEnabled;

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
      window.localStorage.setItem("destination", destination);
    }
  }, [destination])

  useContractRead({
    address: ZK_BADGE_ADDRESSES[chainApp],
    abi: ZK_BADGE_ABI,
    functionName: 'balanceOfVaultId',
    args: [app.tokenId, vaultId],
    enabled: Boolean(vaultId) && Boolean(app.tokenId),
    chainId: networkChainIds[chainApp],
    account: null,
    onSuccess: (data: BigInt) => {
      if (typeof data === "bigint" && data > 0) {
        setAlreadyMinted(true);
      } 
    }
  });

  useContractRead({
    address: ZK_BADGE_ADDRESSES[chainApp],
    abi: ZK_BADGE_ABI,
    functionName: 'balanceOf',
    args: [destination, app.tokenId],
    enabled: Boolean(destination) && Boolean(app.tokenId),
    chainId: networkChainIds[chainApp],
    account: null,
    onSuccess: (data: BigInt) => {
      if (typeof data === "bigint" && data > 0) {
        setAlreadyMinted(true);
      } 
    }
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
      tokenId: app.tokenId,
      chain: chainApp
    };
    const res = await fetch("/api/zk-badge/relay-tx", {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      setMinting(false);
      return;
    }
    const data = await res.json();
    if (data.success) {
      try {
        setHash(data.txHash);
        const provider = await getProvider(Network.Mumbai);
        await provider.waitForTransaction(data.txHash);
        setMinted(true);
        setHash(null);
      } catch (e) {
        console.log(e);
        setError("Minting error. Please contact us or retry later.")
      }
    } else {
      if (data.code === "minting-error") {
        setError("Minting error. Please contact us or retry later.")
      }
    }
    setMinting(false);
  }

  /****************************************************************************/
  /****************************** NOT RELAYED *********************************/
  /****************************************************************************/

  const { switchNetwork, isLoading: isSwitchingNetwork } = useSwitchNetwork()

  const { config } = usePrepareContractWrite({
      address: ZK_BADGE_ADDRESSES[chainApp],
      abi: ZK_BADGE_ABI,
      functionName: "claimWithSismoConnect",
      args: [responseBytes, destination, app.tokenId],
      chainId: networkChainIds[chainApp],
      enabled: Boolean(responseBytes) && Boolean(destination) && Boolean(app.tokenId),
  })

  const { data, write, isLoading: isLoadingWriteContract } = useContractWrite(config);  

  const { isLoading: isLoadingTransaction } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      setMinted(true);
    },
    onError: () => {
      setError("Error while minting your ZK Badge");
    }
  })

  const mintNotRelayed = async () => {
    setError(null);
    setHash(null);
    if (!isRelayed && !isConnected) {
      openConnectModal();
      return;
    }
    if (!isRelayed && chain.id !== networkChainIds[chainApp]) {
      switchNetwork(networkChainIds[chainApp])
      return;
    }
    write();
  }

  return <Content>
      {minted ? (
        <Congratulations
          onBackToApps={() => {
            router.push("/");
          }}
          app={app}
          destination={destination}
          tokenId={app.tokenId}
          network={chainApp}
        />
      ) : (
        <>
          <Section
            number={1}
            isOpen={!hasResponse || !destination}
            title={app?.step1CtaText}
            style={{ marginBottom: 16 }}
            success={hasResponse && Boolean(destination)}
          >
            <Requirements app={app} groupSnapshotMetadataList={groupSnapshotMetadataList}/>
            <SelectDestination onDestinationSelected={(_destination: `0x${string}`) => setDestination(_destination)}/>
            <SismoButtonContainer disabled={!destination}>
              {
                !destination && <DisabledButton/>
              }
              <SismoConnectButton
                config={sismoConnectConfig}
                claims={app?.claimRequests}
                auths={app?.authRequests}
                signature={{ message: getMessageSignature({ destination, tokenId: app.tokenId }) }}
                text={"Sign in with Sismo"}
                callbackPath={pathname}
                onResponseBytes={(response) => {
                  setResponseBytes(response);
                  setDestination(window.localStorage.getItem("destination") as `0x${string}`);
                }}
                onResponse={(response) => {
                  const vaultId = response.proofs.find(proof => {
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
            success={alreadyMinted && hasResponse && Boolean(destination)}
          >
            { alreadyMinted ? 
              <AlreadyRegistered onClick={() => {
                const explorer = getErc1155Explorer({contractAddress: ZK_BADGE_ADDRESSES[chainApp],tokenId: app.tokenId,network: chainApp});
                window.open(explorer, "_blank");
              }}>
                Badge Already minted <ArrowSquareOut style={{ marginTop: -8, marginLeft: 4 }} size={18}/>
              </AlreadyRegistered>
              :
              <MintContainer>
                {
                  isRelayed ?
                    <Button3D
                      onClick={mintRelayed}
                      secondary
                      loading={minting}
                    >
                      {minting ? "Minting..." : "Mint Badge"}
                    </Button3D>
                    :
                    <Button3D
                      onClick={mintNotRelayed}
                      secondary
                      loading={isLoadingTransaction || connectModalOpen || isLoadingWriteContract || isSwitchingNetwork}
                    >
                      {
                        isConnected ?
                        <>  
                          {
                            chain.id !== networkChainIds[chainApp] ?
                              <>
                                {isSwitchingNetwork ? "Switching Network..." : "Switch Network"}
                              </>
                              :
                              <>
                                {isLoadingTransaction || isLoadingWriteContract ? "Minting..." : "Mint Badge"}
                              </>
                          }
                        </>
                        :
                        <>
                          {connectModalOpen ? "Connecting wallet..." : "Connect Wallet"}
                        </>
                      }
                    </Button3D>
                }
                <TransactionLink style={{marginTop: 20 }}>
                  {hash || data?.hash ? (
                    <Inline
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        window.open(getTxExplorer({ txHash:hash ?? data?.hash, network: chainApp}), "_blank");
                      }}
                    >
                      Transaction hash: {getMinimalHash(hash ?? data?.hash)}
                      <ArrowSquareOut style={{ marginTop: -8, marginLeft: 4 }} size={18}/>
                    </Inline>
                  )
                  :
                  <BackToAppStore onClick={() => router.push("/")}>
                    Back to App Store
                  </BackToAppStore>
                }
                </TransactionLink>
              </MintContainer>
            }
          </Section>
          {
            error && <Error style={{ marginTop: 24 }}>{error}</Error>
          }
          {hasResponse && alreadyMinted && (
            <Bottom>
              <Button3D
                onClick={() => {
                  router.push("/");
                }}
                secondary
              >
                Back to App Store
              </Button3D>
            </Bottom>
          )}
        </>
      )}
    </Content>;
}
