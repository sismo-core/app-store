"use client";

import React, { useMemo, useState } from "react";
import { styled } from "styled-components";
import Button3D from "@/src/ui/Button3D";
import Register, { FieldValue } from "./components/Register";
import Congratulations from "./components/Congratulations";
import { GroupSnapshotMetadata } from "@/src/libs/group-provider";
import { AppFront } from "@/src/utils/getSpaceConfigsFront";
import Section from "../components/Section";
import ProveEligibility from "../components/ProveEligibility";
import { ZkFormAppType } from "@/src/libs/spaces";
import { useRouter } from "next/navigation";
import { useSismoConnect } from "@sismo-core/sismo-connect-react";
import { getImpersonateAddresses } from "@/src/utils/getImpersonateAddresses";
import env from "@/src/environments";
import Error from "@/src/ui/Error";

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

const ErrorMsg = styled.div`
  color: ${(props) => props.theme.colors.error};
  font-family: ${(props) => props.theme.fonts.regular};
  position: absolute;
  bottom: -25px;
  font-size: 12px;
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
`;

type Props = {
  groupSnapshotMetadataList: GroupSnapshotMetadata[];
  app: AppFront;
};

export default function ZkFormApp({ app, groupSnapshotMetadataList }: Props): JSX.Element {
  const [error, setError] = useState(null);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [verifying, setVerifying] = useState<boolean>(false);
  const [fields, setFields] = useState<FieldValue[]>(null);

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
  const router = useRouter();

  const submit = async () => {
    const body = {
      fields,
      response: response,
      appSlug: app.slug,
      spaceSlug: app.spaceSlug,
    };
    setError(null);
    setVerifying(true);
    const res = await fetch("/api/zk-form/verify", {
      method: "POST",
      body: JSON.stringify(body),
    });
    setVerifying(false);
    if (!res.ok || res.status !== 200) {
      setError("Server error");
      return;
    }

    const data = await res.json();
    if (data.status === "subscribed") {
      setSubscribed(true);
    }
    if (data.status === "already-subscribed") {
      setAlreadySubscribed(true);
    }
  };

  const hasResponse = Boolean(response);

  return (
    <Content>
      {subscribed ? (
        <Congratulations
          onBackToApps={() => {
            router.push("/");
          }}
          app={app as unknown as ZkFormAppType}
        />
      ) : (
        <>
          <Section
            number={1}
            isOpen={!hasResponse}
            title="Sign in with Sismo"
            style={{ marginBottom: 16 }}
            success={hasResponse}
          >
            <ProveEligibility app={app} groupSnapshotMetadataList={groupSnapshotMetadataList} />
          </Section>
          <Section
            number={2}
            isOpen={Boolean(response)}
            title={app?.ctaText}
            success={alreadySubscribed || (fields && fields.length === 0)}
          >
            {alreadySubscribed ? (
              <AlreadyRegistered style={{ marginTop: 24 }}>
                You already registered.
              </AlreadyRegistered>
            ) : error ? (
              <Error style={{ marginTop: 24 }}>{error}</Error>
            ) : (
              <Register
                app={app as unknown as ZkFormAppType}
                onFieldsComplete={(_fields) => setFields(_fields)}
              />
            )}
          </Section>
          {hasResponse && (
            <Bottom>
              {alreadySubscribed ? (
                <Button3D
                  onClick={() => {
                    router.push("/");
                  }}
                  secondary
                >
                  Back to the Apps
                </Button3D>
              ) : (
                <Button3D
                  onClick={submit}
                  secondary
                  disabled={!fields || !hasResponse}
                  loading={verifying}
                >
                  {verifying ? "Verifying..." : "Submit"}
                </Button3D>
              )}
            </Bottom>
          )}
        </>
      )}
    </Content>
  );
}
