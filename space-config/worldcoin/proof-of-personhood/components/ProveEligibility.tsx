"use client";

import { AuthType, SismoConnectButton } from "@sismo-core/sismo-connect-react";
import React from "react";
import { styled } from "styled-components";
import HoverTooltip from "@/src/ui/HoverTooltip";
import { Info } from "phosphor-react";
import colors from "@/src/themes/colors";
import { ZkCustomAppConfig } from "@/space-config/types";

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

const AuthItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  font-family: ${(props) => props.theme.fonts.regular};
  gap: 8px;
  white-space: nowrap;
`;

const Bold = styled.span`
  font-family: ${(props) => props.theme.fonts.bold};
`;

type Props = {
  app: ZkCustomAppConfig;
  onEligible: (response) => void;
};

export default function ProveEligibility({
  app,
  onEligible,
}: Props): JSX.Element {

  const config = {
    appId: app.sismoConnectRequest.appId
  };

  return (
    <Container>
      <Eligibility style={{ marginBottom: 24 }}>
        <AuthItem>
          Share: <Bold>Vault Id</Bold>
          <HoverTooltip
            text={
              "Vault Id is an anonymous identifier that indicates a unique user on a specific app. Sharing your Vault ID only reveals that you are a unique user and authenticates that you own a Data Vault."
            }
            width={300}
            style={{ marginLeft: -4 }}
          >
            <Info size={18} color={colors.neutral1} />
          </HoverTooltip>
        </AuthItem>
      </Eligibility>
      <ButtonContainer>
        <SismoConnectButton
          config={config}
          auths={[{ authType: AuthType.VAULT }]}
          callbackUrl={window.location.href}
          onResponse={(response) => {
            response && onEligible(response);
          }}
        />
      </ButtonContainer>
    </Container>
  );
}
