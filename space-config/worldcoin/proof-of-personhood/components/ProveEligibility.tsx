"use client";

import { AuthType, SismoConnectButton } from "@sismo-core/sismo-connect-react";
import React from "react";
import { styled } from "styled-components";
import HoverTooltip from "@/src/ui/HoverTooltip";
import { Info, LockSimpleOpen } from "phosphor-react";
import colors from "@/src/themes/colors";
import { CustomAppConfig } from "@/space-config/types";

const Container = styled.div``;

const Eligibility = styled.div`
  margin-top: 7px;
  border-top: 1px solid ${(props) => props.theme.colors.neutral7};
  border-bottom: 1px solid ${(props) => props.theme.colors.neutral7};
  padding: 10px 0px;
`;

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
  padding: 0px 16px;
`;

const Bold = styled.span`
  font-family: ${(props) => props.theme.fonts.bold};
`;

type Props = {
  app: CustomAppConfig;
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
      <RequirementTitle>
        <LockSimpleOpen size={16} />
        Requirements
      </RequirementTitle>
      <Eligibility style={{ marginBottom: 24 }}>
        <AuthItem>
          <Bold>User Id</Bold>
          <HoverTooltip
            text={
              "User Id is an anonymous identifier that indicates a unique user on a specific app. Sharing your User Id only reveals that you are a unique user and authenticates that you own a Data Vault."
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
