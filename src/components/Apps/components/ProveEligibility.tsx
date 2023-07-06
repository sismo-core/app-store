import env from "@/src/environments";
import { SismoConnectButton } from "@sismo-core/sismo-connect-react";
import { useMemo } from "react";
import { styled } from "styled-components";
import ReqList from "./ReqList";
import { GroupSnapshotMetadata } from "@/src/libs/group-provider";
import { LockSimpleOpen } from "phosphor-react";
import { getImpersonateAddresses } from "@/src/utils/getImpersonateAddresses";
import { usePathname } from "next/navigation";
import { ZkAppType } from "@/src/services/spaces-service";

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
  height: 53px;
`;

type Props = {
  app: ZkAppType;
  groupSnapshotMetadataList: GroupSnapshotMetadata[];
  verifying?: boolean;
};

export default function ProveEligibility({
  app,
  groupSnapshotMetadataList,
  verifying,
}: Props): JSX.Element {
  const pathname = usePathname();
  const config = useMemo(() => {
    const config = {
      appId: app.appId,
      vaultBaseUrl: "http:localhost:3001",
      vault: env.isDemo
      ? {
        impersonate: getImpersonateAddresses(app),
      }
      : null,
    };
    return config;
  }, [app]);

  return (
    <>
      <Container>
        <RequirementTitle>
          <LockSimpleOpen size={16} />
          Requirements
        </RequirementTitle>
        <Eligibility style={{ marginBottom: 24 }}>
          <ReqList app={app} groupSnapshotMetadataList={groupSnapshotMetadataList} />
        </Eligibility>
        <ButtonContainer>
          {(app?.claimRequests || app?.authRequests) && (
            <SismoConnectButton
              config={config}
              claims={app?.claimRequests}
              auths={app?.authRequests}
              verifying={verifying}
              text={verifying ? "Verifying..." : "Sign in with Sismo"}
              callbackPath={pathname}
            />
          )}
        </ButtonContainer>
      </Container>
    </>
  );
}
