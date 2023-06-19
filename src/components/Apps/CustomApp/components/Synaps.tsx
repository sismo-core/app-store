`use client`

import Button from "@/src/ui/Button";
import SynapsModal from "./SynapsModal";
import { useState } from "react";
import { styled } from "styled-components";
import { SismoConnectResponse } from "@sismo-core/sismo-connect-react";

const Container = styled.div`
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`

type Props = {
    onSuccess: () => void,
    response: SismoConnectResponse
};

export default function Synaps({ onSuccess, response }: Props): JSX.Element {
    const [sessionId, setSessionId] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [verifying, setVerifying] = useState(false);

    const prove = async () => {
        const res = await fetch("/api/synaps/start-session", {
            method: "POST"
        });
        if (!res.ok) throw new Error("Error while creating Synaps session");
        const data = await res.json();
        setSessionId(data.sessionId);
        setIsModalOpen(true);
    }

    const onFinish = async () => {
        console.log("onFinish")
        setIsModalOpen(false);
        setVerifying(true);
        const body = JSON.stringify({
            sessionId,
            response
        });
        const res = await fetch("/api/synaps/register-vault-id", {
            method: "POST",
            body
        });
        if (!res.ok) throw new Error("Error while verifying Synaps session");
        const data = await res.json();
        console.log("data", data);
        if (data.status === "success") {
            onSuccess();
        }
        if (data.status === "error") {
            // TODO
        }
        setVerifying(false);
    }

    return (
        <Container>
            <SynapsModal sessionId={sessionId} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onFinish={() => onFinish()}/>
            <Button onClick={prove} loading={verifying}>
                {verifying ? "Verifying..." : "Prove liveness" }
            </Button>
        </Container>
    );
}
