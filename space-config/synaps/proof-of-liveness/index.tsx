'use client'

import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Congratulations from "./components/Congratulations";
import Section from "./components/Section";
import ProveEligibility from "./components/ProveEligibility";
import Button from "@/src/ui/Button";
import SynapsModal from "./components/SynapsModal";
import { synapsConfigMain } from "@/space-config/synaps/main";
import { ZkCustomAppConfig } from "@/space-config/types";
import Button3D from "@/src/ui/Button3D";
import { useRouter } from "next/navigation";
import { ZkCustomAppContainer } from "@/src/components/ZkCustomAppContainer";


const AlreadyRegistered = styled.div`
    color: ${props => props.theme.colors.neutral1};
    font-family: ${props => props.theme.fonts.regular};
    border: 1px solid ${props => props.theme.colors.blueRYB};
    font-size: 16px;
    background: rgba(18, 52, 245, 0.05);
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
`

const Bottom = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
`

const ErrorMsg = styled.div`
    color: ${props => props.theme.colors.error};
    font-family: ${props => props.theme.fonts.regular};
`

export default function SynapsProofOfLivenessCustomApp(): JSX.Element {
    const app = synapsConfigMain.apps[0] as ZkCustomAppConfig;
    const router = useRouter();
    const api = app.templateConfig.extraData.api;
    const [response, setResponse] = useState();
    const [alreadySubscribed, setAlreadySubscribed] = useState(false);
    const [domReady, setDomReady] = React.useState(false);
    const [verifying, setVerifying] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [finished, setFinished] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const prove = async () => {
        setLoading(true);
        const res = await fetch(`${api}/start-session`, {
            method: "POST"
        });
        setLoading(false);
        if (!res.ok) throw new Error("Error while creating Synaps session");
        const data = await res.json();
        setSessionId(data.sessionId);
        setIsModalOpen(true);
    }

    const onFinish = async () => {
        setIsModalOpen(false);
        setVerifying(true);
        const body = JSON.stringify({
            sessionId,
            response
        });
        const res = await fetch(`${api}/register-vault-id`, {
            method: "POST",
            body
        });
        setVerifying(false);
        if (!res.ok) {
            throw new Error("Error while verifying Synaps session");
        }
        const data = await res.json();
        if (data.status === "success") {
            setFinished(true);
        }
        if (data.status === "vault-id-already-registered") {
            setAlreadySubscribed(true);
        }
        if (data.status === "vault-id-already-registered") {
            setAlreadySubscribed(true);
        }
        if (data.status === "error") {
            setError(true);
        }
    }

    useEffect(() => {
      setDomReady(true)
    }, [])

    if (!domReady) return;

    return <>
        <SynapsModal sessionId={sessionId} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onFinish={() => onFinish()}/>
        <ZkCustomAppContainer>
            {
                !finished && <>
                    <Section number={1} isOpen={!response} title="Sign in with Sismo" style={{marginBottom: 16}} success={Boolean(response)}>
                        <ProveEligibility app={app} onEligible={(_response) => setResponse(_response)}/>
                    </Section>
                    <Section number={2} isOpen={Boolean(response)} title={app?.metadata?.ctaText} success={alreadySubscribed}>
                        {
                            alreadySubscribed ?
                            <AlreadyRegistered style={{marginTop: 24}}>
                                You already registered.
                            </AlreadyRegistered>
                            :
                            <>
                            <Button onClick={prove} loading={verifying || loading} style={{ width: "100%", marginTop: 16}}>
                                {verifying ? "Verifying..." : "Prove liveness" }
                            </Button>
                            {
                                error &&
                                <ErrorMsg>
                                    Server error
                                </ErrorMsg>
                            }
                            </>
                        }
                    </Section>
                    {
                        alreadySubscribed && 
                        <Bottom>
                            <Button3D onClick={() => router.push(`/${synapsConfigMain.metadata.slug}`)} secondary>
                                Back to the space
                            </Button3D>
                        </Bottom>
                    }
                </>
            }
            {
                finished && <Congratulations app={app}/>
            }
        </ZkCustomAppContainer>
    </>;
}