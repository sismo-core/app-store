"use client";

import React, { useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import Button3D from "@/src/ui/Button3D";
import ProveEligibility from "../components/ProveEligibility";
import { SismoConnectResponse } from "@sismo-core/sismo-connect-server";
import Section from "../components/Section";
import { GroupMetadata } from "@/src/libs/group-provider";
import useRemainingTime from "@/src/utils/useRemainingTime";
import { AppFront } from "@/src/utils/getSpaceConfigsFront";
import { ZkTelegramBotAppType } from "@/src/libs/spaces";
import env from "@/src/environments";
import { getImpersonateAddresses } from "@/src/utils/getImpersonateAddresses";
import { useSismoConnect } from "@sismo-core/sismo-connect-react";
import { redirect } from "next/navigation";

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

type Props = {
  groupMetadataList: GroupMetadata[];
  app: AppFront;
};

export default function ZkTelegramBotApp({ app, groupMetadataList }: Props): JSX.Element {
  const [error, setError] = useState(null);
  const [approved, setApproved] = useState(false);
  const [verifying, setVerifying] = useState<boolean>(false);
  const config = useMemo(() => {
    const config = {
      appId: app.appId,
      vault: env.isDemo ? {
        impersonate: getImpersonateAddresses(app)
      } : null
    };
    return config;
  }, [app]);

  const { response } = useSismoConnect({config})

  const verify = async (response: SismoConnectResponse) => {
    const body = {
      response: response,
      appSlug: app.slug,
      spaceSlug: app.spaceSlug,
    };
    setError(null);
    setVerifying(true);
    const res = await fetch("/api/zk-telegram-bot/verify", {
      method: "POST",
      body: JSON.stringify(body),
    });
    setVerifying(false);
    if (!res.ok || res.status !== 200) {
      setError("Server error");
      return;
    }
    const data = await res.json();
    if (data.status === "approved" || data.status === "already-approved") {
      setApproved(true);
    } else {
      setError("Server Error");
    }
  };

  useEffect(() => {
    if (response) {
      verify(response);
    }
  }, [response]);

  const openInviteLink = () => {
    const inviteLink = (app as unknown as ZkTelegramBotAppType).telegramInviteLink;
    window.open(inviteLink, "_blank");
  };

  return (
    <Content>
      {
        <>
          <Section
            number={1}
            isOpen={!approved}
            title="Prove Eligibility"
            style={{ marginBottom: 16 }}
            success={approved}
          >
            <ProveEligibility
              app={app}
              verifying={verifying}
              groupMetadataList={groupMetadataList}
            />
            {error && (
              <Bottom>
                <ErrorMsg>{error}</ErrorMsg>
              </Bottom>
            )}
          </Section>
          <Section number={2} isOpen={approved} title={app?.ctaText} success={false}>
            <ButtonContainer>
              <Button3D
                style={{ marginTop: 25, marginBottom: 15 }}
                onClick={openInviteLink}
                secondary
              >
                Join our Telegram
              </Button3D>
            </ButtonContainer>
          </Section>
        </>
      }
    </Content>
  );
}
