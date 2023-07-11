"use client";

import { GroupSnapshotMetadata } from "@/src/libs/group-provider";
import { ZkAppType } from "@/src/services/spaces-service";
import { LockSimpleOpen } from "phosphor-react";
import React from "react";
import styled from "styled-components";
import ReqList from "../../components/ReqList";

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
  padding: 10px 0px;
`;

type Props = {
    app: ZkAppType;
    groupSnapshotMetadataList: GroupSnapshotMetadata[];
};

export default function Requirements({ app, groupSnapshotMetadataList }: Props): JSX.Element {

  return (
    <Container>
        <RequirementTitle>
            <LockSimpleOpen size={16} />
            Requirements
        </RequirementTitle>
        <Eligibility style={{ marginBottom: 24 }}>
            <ReqList app={app} groupSnapshotMetadataList={groupSnapshotMetadataList} style={{marginLeft: -16}}/>
        </Eligibility>
    </Container>
  );
}
