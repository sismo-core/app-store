"use client";

import env from "@/src/environments";
import { SismoConnectButton } from "@sismo-core/sismo-connect-react";
import React from "react";
import { useMemo } from "react";
import { styled } from "styled-components";
import ReqList from "./ReqList";
import { GroupMetadata } from "@/src/libs/group-provider";
import { ZkFormAppType, ZkTelegramBotAppType } from "@/src/libs/spaces";

const Container = styled.div``;

const Eligibility = styled.div`
  margin-top: 22px;
  border-top: 1px solid #262e45;
  border-bottom: 1px solid #262e45;
  padding: 10px 0px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

type Props = {
  app: ZkFormAppType | ZkTelegramBotAppType;
  groupMetadataList: GroupMetadata[];
  onEligible: (response) => void;
  verifying?: boolean;
};

export default function ProveEligibility({
  app,
  groupMetadataList,
  onEligible,
  verifying
}: Props): JSX.Element {

  const config = useMemo(() => {
    const appId = app.appId;

    const config = {
      appId: appId,
      vault: env.isDemo ? {
        impersonate: [
          "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
          "github:vbuterin",
          "twitter:VitalikButerin:423423",
          "telegram:VitalkButerin:423423",
          "0x644177f8d79117c2b9c7596527642b3c2d05888e",
          "0xca55123aba844d347d0a18d91a958eda531447ff"
        ]
      } : null
    };

    if (app.impersonateAddresses) {
      config.vault.impersonate = app.impersonateAddresses
    }

    return config;
  }, [app]);

  return (
    <Container>
      <Eligibility style={{ marginBottom: 24 }}>
        <ReqList app={app} groupMetadataList={groupMetadataList} />
      </Eligibility>
      <ButtonContainer>
        {(app?.claimRequests || app?.authRequests) && (
          <SismoConnectButton
            config={config}
            claims={app?.claimRequests}
            auths={app?.authRequests}
            verifying={verifying}
            text={verifying ? "Verifying..." : "Sign in with Sismo"}
            callbackPath={window.location.pathname}
            onResponse={(response) => {
              response && onEligible(response);
            }}
          />
        )}
      </ButtonContainer>
    </Container>
  );
}
