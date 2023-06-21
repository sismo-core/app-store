import styled from "styled-components";
import Synaps from "@synaps-io/react-verify";
import { useEffect, useState } from "react";
import Modal from "@/src/ui/Modal";
import Loader from "@/src/ui/Loader";

const Content = styled.div`
  border-radius: 10px;
  overflow: hidden;
  height: 685px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6771a9;
  position: absolute;
`;

type SynapsModalProps = {
  sessionId: string;
  onClose: () => void;
  onFinish: () => void;
  isOpen: boolean;
};

export default function SynapsModal({
  sessionId,
  isOpen,
  onClose,
  onFinish,
}: SynapsModalProps): JSX.Element {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) setLoading(true);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} outsideClosable animated>
      <Content>
        {sessionId && (
          <Synaps
            sessionId={sessionId}
            service={"individual"}
            lang={"en"}
            onReady={() => setLoading(false)}
            onFinish={() => {
              alert("onfinish")
              onFinish();
            }}
            color={{
              primary: "212b39",
              secondary: "ffffff",
            }}
          />
        )}
        {loading && (
          <LoadingMessage>
            <Loader style={{ marginRight: 7 }} color={"#6771A9"} /> Charging
            liveness module...
          </LoadingMessage>
        )}
      </Content>
    </Modal>
  );
}
