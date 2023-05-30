"use client";

import { ZkSubAppConfig } from "@/space-config/types";
import { SismoConnectButton, SismoConnectConfig, Vault } from "@sismo-core/sismo-connect-react";
import React from "react";
import { styled } from "styled-components";
import ReqList from "../../components/ReqList";
import { GroupMetadata } from "@/src/libs/group-provider";
import env from "@/src/environments";

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
  app: ZkSubAppConfig;
  groupMetadataList: GroupMetadata[];
  onEligible: (response) => void;
};

export default function ProveEligibility({
  app,
  groupMetadataList,
  onEligible,
}: Props): JSX.Element {

  let appId = app?.appId;
  if (env.isDemo) appId = app?.demo.appId;
  if (env.isDev) appId = "0x4c40e70b081752680ce258ad321f9e58";

  const config: SismoConnectConfig = {
    appId,
    vault: env.isDemo ? Vault.Demo : Vault.Main
  };

  return (
    <Container>
      <Eligibility style={{ marginBottom: 24 }}>
        <ReqList app={app} groupMetadataList={groupMetadataList} />
      </Eligibility>
      <ButtonContainer>
        <SismoConnectButton
          config={config}
          claims={app.claimRequests}
          auths={app.authRequests}
          callbackPath={window.location.pathname}
          onResponse={(response) => {
            console.log("onResponse", response)
            response && onEligible(response);
          }}
        />
      </ButtonContainer>
    </Container>
  );
}
