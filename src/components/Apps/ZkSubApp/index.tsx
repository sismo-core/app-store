'use client'

import { SpaceConfig, ZkSubAppConfig } from "@/space-config/types";
import Modal from "@/src/ui/Modal";
import React, { useState } from "react";
import { styled } from "styled-components";
import Button3D from "@/src/ui/Button3D";
import ProveEligibility from "./components/ProveEligibility";
import { SismoConnectResponse } from "@sismo-core/sismo-connect-server";
import Register, { FieldValue } from "./components/Register";
import Section from "./components/Section";
import Congratulations from "./components/Congratulations";

const Content = styled.div`
    max-width: 580px;
`

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

const Bottom = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 32px;
    position: relative;
    height: 46px;
    display: flex;
    align-items: center;
`

const Loading = styled.div`
    font-family: ${props => props.theme.fonts.regular};
    color: ${props => props.theme.colors.neutral1};
    font-size: 16px;
`

const ErrorMsg = styled.div`
    color: ${props => props.theme.colors.error};
    font-family: ${props => props.theme.fonts.regular};
    position: absolute;
    bottom: -25px;
    font-size: 12px;
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

type Props = {
    isOpen: boolean;
    onClose: () => void;
    app: ZkSubAppConfig;
    space: SpaceConfig;
}


export default function ZkSubApp({ isOpen, onClose, app, space }: Props): JSX.Element {
    const [error, setError] = useState(null);
    const [alreadySubscribed, setAlreadySubscribed] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [verifying, setVerifying] = useState<boolean>(false);
    const [fields, setFields] = useState<FieldValue[]>(null);
    const [response, setResponse] = useState<SismoConnectResponse>(null);


    const submit = async () => {
        const body = {
            fields,
            response: response,
            appSlug: app.slug,
            spaceSlug: space.slug
        }
        setError(null);
        setVerifying(true);
        const res = await fetch("/api/verify", {
            method: "POST",
            body: JSON.stringify(body)
        })
        setVerifying(false);
        if (!res.ok || res.status !== 200) {
            setError("Server error")
            return;
        }
        
        const data = await res.json();
        if (data.status === "subscribed") {
            setSubscribed(true);
        }
        if (data.status === "already-subscribed") {
            setAlreadySubscribed(true);
        }
    }

    return <Modal isOpen={isOpen} onClose={onClose} animated>
        <Content>
            {
                subscribed ? <Congratulations onBackToSpace={onClose} app={app}/> : <>
                    <Title>
                        {app?.name}
                    </Title>
                    <Description>
                        {app?.description}
                    </Description>
                    <Section number={1} isOpen={!response} title="Prove Eligibility" style={{marginBottom: 16}} success={Boolean(response)}>
                        <ProveEligibility app={app} onEligible={(_response) => setResponse(_response)}/>
                    </Section>
                    <Section number={2} isOpen={Boolean(response)} title={app?.CTAText} success={alreadySubscribed}>
                        {
                            alreadySubscribed ?
                            <AlreadyRegistered style={{marginTop: 24}}>
                                You already registered.
                            </AlreadyRegistered>
                            :
                            <Register app={app} onFieldsComplete={(_fields) => setFields(_fields)}/>
                        }
                    </Section>
                    <Bottom>
                        {
                            alreadySubscribed ?
                            <Button3D onClick={onClose} secondary>
                                Back to the Space
                            </Button3D>
                            :
                            <Button3D onClick={submit} secondary disabled={!fields || !response} loading={verifying}>
                                {verifying ? "Verifying..." : "Submit"}
                            </Button3D>
                        }
                        <ErrorMsg>
                            {error}
                        </ErrorMsg>
                    </Bottom>
                </>
            }
        </Content>
    </Modal>;
}