"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Info } from "phosphor-react";
import colors from "@/src/themes/colors";
import UserTag from "../../UserTag";
import { AuthType, ClaimRequest } from "@sismo-core/sismo-connect-react";
import ShardTag from "../../ShardTag";
import HoverTooltip from "@/src/ui/HoverTooltip";
import { GroupMetadata } from "@/src/libs/group-provider";
import EligibilityModal from "../../EligibilityModal";
import { useModals } from "@/src/state/ModalState";
import { AppFront } from "@/src/utils/getSpaceConfigsFront";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0px 16px;
`;

const RequiredList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const OptionalList = styled(RequiredList)`
  margin-top: 16px;
  border-top: 1px solid ${(props) => props.theme.colors.neutral9};
`;

const OptionalTitle = styled.div`
align-self: flex-start;
  color: ${(props) => props.theme.colors.neutral6};
  text-align: center;
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.medium};
  line-height: 20px;
  margin-top: 8px;
`;

const ReqItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 20px;
  font-family: ${(props) => props.theme.fonts.regular};
  gap: 8px;
  white-space: nowrap;
  width: 334px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const AuthItem = styled(ReqItem)`
  padding-right: 22px;
`;

const Bold = styled.span`
  font-family: ${(props) => props.theme.fonts.bold};
`;

type Props = {
  app: AppFront;
  groupMetadataList: GroupMetadata[];
  style?: React.CSSProperties;
  fullWidth?: boolean;
};

export default function ReqList({
  app,
  groupMetadataList,
  style,
  fullWidth,
}: Props): JSX.Element {
  const { requirementsIsOpen, setRequirementsIsOpen } = useModals();
  const [groupMetadata, setGroupMetadata] = useState(null);

  const requiredAuth = [];
  const requiredClaim = [];
  const optionalAuth = [];
  const optionalClaim = [];

  if (app?.authRequests?.length > 0) {
    for (const authRequest of app?.authRequests) {
      if (!authRequest?.isOptional) {
        requiredAuth.push(authRequest);
      } else {
        optionalAuth.push(authRequest);
      }
    }
  }

  if (app?.claimRequests?.length > 0) {
    for (const claimRequest of app?.claimRequests) {
      if (!claimRequest?.isOptional) {
        requiredClaim.push(claimRequest);
      } else {
        optionalClaim.push(claimRequest);
      }
    }
  }

  return (
    <>
      <EligibilityModal
        groupMetadata={groupMetadata}
        isOpen={requirementsIsOpen}
        onClose={() => {
          setGroupMetadata(null);
          setRequirementsIsOpen(false);
        }}
      />
      <Container style={style}>
        <RequiredList>
          {requiredAuth.length > 0 &&
            requiredAuth?.map((authRequest, index) => (
              <AuthItem key={authRequest?.authType + index}>
                {authRequest?.authType === AuthType.VAULT ? (
                  <>
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
                  </>
                ) : (
                  <UserTag
                    authType={authRequest?.authType}
                    fullWidth={fullWidth}
                  />
                )}
              </AuthItem>
            ))}
          {requiredClaim?.length > 0 &&
            requiredClaim?.map((claimRequest: ClaimRequest, index) => {
              const groupMetadata = groupMetadataList?.find(
                (el) => el.id === claimRequest.groupId
              );
              return (
                <ReqItem key={claimRequest?.groupId + index}>
                  <ShardTag
                    onModal={() => {
                      setGroupMetadata(groupMetadata);
                      setRequirementsIsOpen(true);
                    }}
                    fullWidth={fullWidth}
                    claimRequest={claimRequest}
                    groupMetadata={groupMetadata}
                  />
                </ReqItem>
              );
            })}
        </RequiredList>
        {(optionalAuth?.length > 0 ||
          optionalClaim?.length > 0) && (
            <OptionalList>
              <OptionalTitle>Optional</OptionalTitle>
              {optionalAuth.length > 0 &&
                optionalAuth?.map((authRequest, index) => (
                  <AuthItem key={authRequest?.authType + index}>
                    {authRequest?.authType === AuthType.VAULT ? (
                      <>
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
                      </>
                    ) : (
                      <UserTag
                        authType={authRequest?.authType}
                        fullWidth={fullWidth}
                      />
                    )}
                  </AuthItem>
                ))}
              {optionalClaim?.length > 0 &&
                optionalClaim?.map((claimRequest: ClaimRequest, index) => {
                  const groupMetadata = groupMetadataList?.find(
                    (el) => el.id === claimRequest.groupId
                  );
                  return (
                    <ReqItem key={claimRequest?.groupId + index}>
                      <ShardTag
                        onModal={() => {
                          setGroupMetadata(groupMetadata);
                          setRequirementsIsOpen(true);
                        }}
                        fullWidth={fullWidth}
                        claimRequest={claimRequest}
                        groupMetadata={groupMetadata}
                      />
                    </ReqItem>
                  );
                })}
            </OptionalList>
          )}
      </Container>
    </>
  );
}
