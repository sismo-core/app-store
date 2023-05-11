"use client";

import React from "react";
import styled from "styled-components";
import { Info } from "phosphor-react";
import colors from "@/src/themes/colors";
import UserTag from "../../UserTag";
import { AuthType, ClaimRequest } from "@sismo-core/sismo-connect-react";
import ShardTag from "../../ShardTag";
import HoverTooltip from "@/src/ui/HoverTooltip";
import { App } from "@/space-config/types";
import { GroupMetadata } from "@/src/libs/group-provider";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const ReqItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  font-family: ${(props) => props.theme.fonts.regular};
  gap: 8px;
  white-space: nowrap;
`;

const AuthItem = styled(ReqItem)`
  padding-right: 22px;
`;

const Bold = styled.span`
  font-family: ${(props) => props.theme.fonts.bold};
`;

type Props = {
  app: App;
  groupMetadataList: GroupMetadata[];
  style?: React.CSSProperties;
  fullWidth?: boolean;
};

export default function ReqList({ app, groupMetadataList, style, fullWidth }: Props): JSX.Element {
  return (
    <Container style={style}>
      {app?.authRequests?.length > 0 &&
        app?.authRequests?.map((authRequest, index) => (
          <AuthItem key={authRequest?.authType + index}>
            {authRequest?.authType === AuthType.VAULT ? (
              <>
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
              </>
            ) : (
              <>
                Own account:
                <UserTag authType={authRequest?.authType} />
              </>
            )}
          </AuthItem>
        ))}
      {app?.claimRequests?.length > 0 &&
        app?.claimRequests?.map(
          (claimRequest: ClaimRequest, index) => (
            <ReqItem key={claimRequest?.groupId + index}>
              Own data:
              <ShardTag fullWidth={fullWidth} claimRequest={claimRequest} groupMetadata={groupMetadataList?.find(el => el.id === claimRequest.groupId)}/>
            </ReqItem>
          )
        )}
    </Container>
  );
}
