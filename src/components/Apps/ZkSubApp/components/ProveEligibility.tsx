"use client";

import { ZkSubAppConfig } from "@/space-config/types";
import env from "@/src/environments";
import { ClaimType, SismoConnectButton } from "@sismo-core/sismo-connect-react";
import React from "react";
import { styled } from "styled-components";
import ReqList from "../../components/ReqList";
import { GroupMetadata } from "@/src/libs/group-provider";

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
  const appId = env.isDemo
  ? app?.demo.appId
  : env.isDev
  ? "0x4c40e70b081752680ce258ad321f9e58"
  : app?.appId;

  const config = {
    appId: appId,
    vaultAppBaseUrl: env.isDemo ? "https://demo.vault-beta.sismo.io" : null,
    devMode: {
      enabled: env.isDemo || env.isDev,
      devGroups:
        (env.isDemo || env.isDev) && app?.claimRequests?.length > 0
          ? app.claimRequests.map((claim) => {
              let value = 1;
              console.log("config claim", claim);
              if (claim.value) {
                console.log("config if")
                console.log("config claim.claimType", claim.claimType);
                switch(claim.claimType) {
                  case ClaimType.EQ:
                    value = claim.value;
                    break;
                  case ClaimType.GT:
                    value = claim.value + 1;
                    break;
                  case ClaimType.GTE:
                    value = claim.value + 1;
                    break;
                  case ClaimType.LT:
                    value = claim.value - 1;
                    break;
                  case ClaimType.LTE:
                    value = claim.value - 1;
                    break;
                }
              }

              return {
                groupId: claim.groupId,
                data: {
                  "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045":  value,
                  "0xb01ee322C4f028B8A6BFcD2a5d48107dc5bC99EC": 1,
                },
              };
            })
          : null,
    },
  };

  console.log("config", config);

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
            callbackPath={window.location.pathname}
            onResponse={(response) => {
              console.log("onResponse", response);
              response && onEligible(response);
            }}
          />
        )}
      </ButtonContainer>
    </Container>
  );
}
