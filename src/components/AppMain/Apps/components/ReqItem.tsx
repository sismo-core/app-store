import { GroupMetadata, GroupProvider, GroupSnapshotMetadata } from "@/src/libs/group-provider";
import styled from "styled-components";
import ShardTag from "../../../ShardTag";
import EligibilityModal from "../../../EligibilityModal";
import { useEffect, useState } from "react";
import { ClaimRequest } from "@sismo-core/sismo-connect-react";
import env from "@/src/environments";

const Container = styled.div`
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

type Props = {
  groupSnapshotMetadata: GroupSnapshotMetadata;
  claimRequest: ClaimRequest;
  fullWidth?: boolean;
};

export default function ReqItem({ groupSnapshotMetadata, claimRequest, fullWidth }: Props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [groupMetadata, setGroupMetadata] = useState<GroupMetadata | null>(null);

  useEffect(() => {
    if (!groupSnapshotMetadata) return;
    const groupProvider = new GroupProvider({
      hubApiUrl: env.hubApiUrl,
    });

    async function getMetadata() {
      const metadata = await groupProvider.getGroupMetadata({
        groupId: groupSnapshotMetadata?.id,
        timestamp: "latest",
      });
      setGroupMetadata(metadata);
    }
    getMetadata();
  }, [groupSnapshotMetadata]);

  return (
    <>
      {groupMetadata && (
        <EligibilityModal
          groupMetadata={groupMetadata}
          isOpen={modalIsOpen}
          onClose={() => {
            setModalIsOpen(false);
          }}
        />
      )}
      <Container>
        <ShardTag
          onModal={() => {
            setModalIsOpen(true);
          }}
          fullWidth={fullWidth}
          claimRequest={claimRequest}
          groupSnapshotMetadata={groupSnapshotMetadata}
        />
      </Container>
    </>
  );
}
