import env from "@/src/environments";
import { SismoConnectButton, SismoConnectResponse } from "@sismo-core/sismo-connect-react";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { styled } from "styled-components";
import ReqList from "./ReqList";
import { GroupMetadata } from "@/src/libs/group-provider";
import { LockSimpleOpen } from "phosphor-react";
import { AppFront } from "@/src/utils/getSpaceConfigsFront";

const Container = styled.div``;

const RequirementTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  color: ${(props) => props.theme.colors.neutral4};
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.medium};
  line-height: 20px;
  margin-top: 24px;
`;

const Eligibility = styled.div`
  margin-top: 7px;
  border-top: 1px solid ${(props) => props.theme.colors.neutral7};
  border-bottom: 1px solid ${(props) => props.theme.colors.neutral7};
  padding: 10px 0px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

type Props = {
  app: AppFront;
  groupMetadataList: GroupMetadata[];
  onEligible: (response: SismoConnectResponse) => void;
  verifying?: boolean;
};

export default function ProveEligibility({
  app,
  groupMetadataList,
  verifying,
  onEligible,
}: Props): JSX.Element {
  const [isMounted, setIsMounted] = useState(false);


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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if(!isMounted) return null;

  return (
    <Container>
      <RequirementTitle>
        <LockSimpleOpen size={16} />
        Requirements
      </RequirementTitle>
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
