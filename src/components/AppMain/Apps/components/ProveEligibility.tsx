import env from "@/src/environments";
import { SismoConnectButton } from "@sismo-core/sismo-connect-react";
import { useMemo } from "react";
import { styled } from "styled-components";
import { getImpersonateAddresses } from "@/src/utils/getImpersonateAddresses";
import { usePathname } from "next/navigation";
import { ZkAppType } from "@/src/services/spaces-service";

const Container = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 53px;
`;

type Props = {
  app: ZkAppType;
  verifying?: boolean;
};

export default function ProveEligibility({
  app,
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
