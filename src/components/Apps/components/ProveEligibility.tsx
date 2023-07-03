import env from "@/src/environments";
import { SismoConnectButton } from "@sismo-core/sismo-connect-react";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { styled } from "styled-components";
import ReqList from "./ReqList";
import { GroupMetadata } from "@/src/libs/group-provider";
import { LockSimpleOpen } from "phosphor-react";
import { AppFront } from "@/src/utils/getSpaceConfigsFront";
import { getImpersonateAddresses } from "@/src/utils/getImpersonateAddresses";

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
  verifying?: boolean;
};

export default function ProveEligibility({
  app,
  groupMetadataList,
  verifying,
}: Props): JSX.Element {
  const [isMounted, setIsMounted] = useState(false);
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
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
            />
          )}
        </ButtonContainer>
      </Container>
    </>
  );
}
