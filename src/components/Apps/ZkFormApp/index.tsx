"use client";

import { ZkSubAppConfig } from "@/space-config/types";
import React, {  useState } from "react";
import { styled } from "styled-components";
import Button3D from "@/src/ui/Button3D";
import ProveEligibility from "./components/ProveEligibility";
import { SismoConnectResponse } from "@sismo-core/sismo-connect-server";
import Register, { FieldValue } from "./components/Register";
import Section from "./components/Section";
import Congratulations from "./components/Congratulations";
import { GroupMetadata } from "@/src/libs/group-provider";
import { useModals } from "@/src/state/ModalState";
import { AppFront } from "@/src/utils/getSpaceConfigsFront";
import useRemainingTime from "@/src/utils/useRemainingTime";
import Timer from "../Timer";

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

const Loading = styled.div`
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.neutral1};
  font-size: 16px;
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
  groupMetadataList: GroupMetadata[];
  app: AppFront;
};

export default function ZkFormApp({
  app,
  groupMetadataList,
}: Props): JSX.Element {
  const [error, setError] = useState(null);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [verifying, setVerifying] = useState<boolean>(false);
  const [fields, setFields] = useState<FieldValue[]>(null);
  const [response, setResponse] = useState<SismoConnectResponse>(null);

  const { hasStarted } = useRemainingTime({startDate: app?.startDate});


  const submit = async () => {
    const body = {
      fields,
      response: response,
      appSlug: app.slug,
      spaceSlug: app.spaceSlug,
    };
    setError(null);
    setVerifying(true);
    const res = await fetch("/api/verify", {
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

  const reset = () => {
    setTimeout(() => {
      setError(null);
      setAlreadySubscribed(false);
      setSubscribed(false);
      setFields(null);
      setResponse(null);
    }, 300);
  };

  if(!hasStarted) return <Content>
    <Timer app={app} />
  </Content>

  return (
    <Content>
      {subscribed ? (
        <Congratulations onBackToSpace={()=>{}} app={app as unknown as ZkSubAppConfig} />
      ) : (
        <>
          <Section
            number={1}
            isOpen={!response}
            title="Sign in with Sismo"
            style={{ marginBottom: 16 }}
            success={Boolean(response)}
          >
            <ProveEligibility
              app={app as unknown as ZkSubAppConfig}
              onEligible={(_response) => setResponse(_response)}
              groupMetadataList={groupMetadataList}
            />
          </Section>
          <Section
            number={2}
            isOpen={Boolean(response)}
            title={app?.CTAText}
            success={alreadySubscribed || (fields && fields.length === 0)}
          >
            {alreadySubscribed ? (
              <AlreadyRegistered style={{ marginTop: 24 }}>
                You already registered.
              </AlreadyRegistered>
            ) : (
              <Register
                app={app as unknown as ZkSubAppConfig}
                onFieldsComplete={(_fields) => setFields(_fields)}
              />
            )}
          </Section>
          {response && <Bottom>
            {alreadySubscribed ? (
              <Button3D onClick={()=>{}} secondary>
                Back to the Space
              </Button3D>
            ) : (
              <Button3D
                onClick={submit}
                secondary
                disabled={!fields || !response}
                loading={verifying}
              >
                {verifying ? "Verifying..." : "Submit"}
              </Button3D>
            )}
            <ErrorMsg>{error}</ErrorMsg>
          </Bottom>}
        </>
      )}
    </Content>
  );
}
