"use client";

import React, { useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import Button3D from "@/src/ui/Button3D";
import { GroupSnapshotMetadata } from "@/src/libs/group-provider";
import Section from "../components/Section";
import { ZkBadgeAppType, ZkFormAppType } from "@/src/services/spaces-service";
import { usePathname, useRouter } from "next/navigation";
import { SismoConnectButton, useSismoConnect } from "@sismo-core/sismo-connect-react";
import { getImpersonateAddresses } from "@/src/utils/getImpersonateAddresses";
import env from "@/src/environments";
import SelectDestination from "./components/SelectDestination";
import Requirements from "./components/Requirements";
import { getProvider } from "@/src/libs/contracts/providers";
import { Network } from "@/src/libs/contracts/networks";
import { getMessageSignature } from "./utils/getMessageSignature";
import Error from "@/src/ui/Error";
import Congratulations from "./components/Congratulations";
import { getMinimalHash } from "@/src/utils/getMinimalHash";
import { ArrowSquareOut } from "phosphor-react";

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

  const [error, setError] = useState(null);
  const [alreadyMinted, setAlreadyMinted] = useState(false);
  const [minted, setMinted] = useState(false);
  const [destination, setDestination] = useState(null);
  const [responseBytes, setResponseBytes] = useState(null);
  const [minting, setMinting] = useState(null);
  const [hash, setHash] = useState(null);

  const chain = app.chains[0].name;

  const config = useMemo(() => {
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
  const { response } = useSismoConnect({ config });
  const hasResponse = Boolean(response);

  useEffect(() => {
    if (destination) {
      window.localStorage.setItem("destination", destination);
    }
  }, [destination])

  const mint = async () => {
    const body = {
      responseBytes: responseBytes,
      destination: destination,
      tokenId: app.tokenId
    };
    setHash(null);
    setError(null);
    setMinting(true);
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
  };

  return <Content>
      {minted ? (
        <Congratulations
          onBackToApps={() => {
            router.push("/");
          }}
          app={app}
          destination={destination}
        />
      ) : (
        <>
          <Section
            number={1}
            isOpen={!hasResponse || !destination}
            title={app?.step1CtaText}
            style={{ marginBottom: 16 }}
            success={hasResponse && destination}
          >
            <Requirements app={app} groupSnapshotMetadataList={groupSnapshotMetadataList}/>
            <SelectDestination onDestinationSelected={(_destination: string) => setDestination(_destination)}/>
            <SismoButtonContainer disabled={!destination}>
              {
                !destination && <DisabledButton/>
              }
              <SismoConnectButton
                config={config}
                claims={app?.claimRequests}
                auths={app?.authRequests}
                signature={{ message: getMessageSignature({ destination, tokenId: app.tokenId }) }}
                text={"Sign in with Sismo"}
                callbackPath={pathname}
                onResponseBytes={(response) => {
                  setResponseBytes(response);
                  setDestination(window.localStorage.getItem("destination"));
                }}
              />
            </SismoButtonContainer>
          </Section>
          <Section
            number={2}
            isOpen={Boolean(response) && Boolean(destination)}
            title={app?.step2CtaText}
            success={alreadyMinted}
          >
            { alreadyMinted ? 
              <AlreadyRegistered>
                Badge Already minted
              </AlreadyRegistered>
              :
              <MintContainer>
                <Button3D
                  onClick={mint}
                  secondary
                  loading={minting}
                >
                  {minting ? "Minting..." : "Mint Badge"}
                </Button3D>
                <TransactionLink style={{marginTop: 20 }}>
                  {hash ? (
                    <Inline
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (chain === Network.Mumbai) {
                          window.open(`https://mumbai.polygonscan.com/tx/${hash}`, "_blank");
                        }
                        if (chain === Network.Gnosis) {
                          window.open(
                            `https://gnosisscan.io/tx/${hash}`,
                            "_blank"
                          );
                        }
                      }}
                    >
                      Transaction hash: {getMinimalHash(hash)}
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
