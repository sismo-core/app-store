'use client'

import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Congratulations from "./components/Congratulations";
import Section from "./components/Section";
import ProveEligibility from "./components/ProveEligibility";
import Button from "@/src/ui/Button";
import SynapsModal from "./components/SynapsModal";
import { synapsConfig } from "@/space-config/synaps";
import CustomAppContainer from "@/src/components/CustomAppContainer";
import { CustomAppConfig } from "@/space-config/types";

const Title = styled.div`
    margin-bottom: 16px;
    font-family: ${props => props.theme.fonts.semibold};
    color: ${props => props.theme.colors.neutral1};
    font-size: 32px;
`

const Description = styled.div`
    margin-bottom: 32px;
    font-family: ${props => props.theme.fonts.regular};
    color: ${props => props.theme.colors.neutral3};
    font-size: 16px;
`

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

const Content = styled.div`
    max-width: 580px;
`

const ErrorMsg = styled.div`
    color: ${props => props.theme.colors.error};
    font-family: ${props => props.theme.fonts.regular};
`

export default function ProofOfLivenessCustomApp(): JSX.Element {
    const app = synapsConfig.apps[0] as CustomAppConfig;
    const api = app.extraData.api;
    const [response, setResponse] = useState();
    const [alreadySubscribed, setAlreadySubscribed] = useState(false);
    const [domReady, setDomReady] = React.useState(false);
    const [verifying, setVerifying] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [finished, setFinished] = useState(false);
    const [error, setError] = useState(false);
  
    const prove = async () => {
        const res = await fetch(`${api}/start-session`, {
            method: "POST"
        });
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

    return <CustomAppContainer>
        <SynapsModal sessionId={sessionId} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onFinish={() => onFinish()}/>
        <Content>
            {
                !finished && <>
                    <Title>
                        {app?.name}
                    </Title>
                    <Description>
                        {app?.description}
                    </Description>
                    <Section number={1} isOpen={!response} title="Sign in with Sismo" style={{marginBottom: 16}} success={Boolean(response)}>
                        <ProveEligibility app={app} onEligible={(_response) => setResponse(_response)}/>
                    </Section>
                    <Section number={2} isOpen={Boolean(response)} title={app?.CTAText} success={alreadySubscribed}>
                        {
                            alreadySubscribed ?
                            <AlreadyRegistered style={{marginTop: 24}}>
                                You already registered.
                            </AlreadyRegistered>
                            :
                            <>
                            <Button onClick={prove} loading={verifying} style={{ width: "100%", marginTop: 16}}>
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
                </>
            }
            {
                finished && <Congratulations app={app}/>
            }
        </Content>
    </CustomAppContainer>;
}