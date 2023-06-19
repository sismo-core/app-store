'use client'

import { CustomAppConfig, SpaceConfig } from "@/space-config/types";
import Modal from "@/src/ui/Modal";
import React, { useState } from "react";
import { styled } from "styled-components";
import Congratulations from "../components/Congratulations";
import Button3D from "@/src/ui/Button3D";
import Section from "../components/Section";
import ProveEligibility from "../components/ProveEligibility";

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

const Content = styled.div`
    max-width: 580px;
`

type Props = {
    isOpen: boolean;
    onClose: () => void;
    app: CustomAppConfig;
    space: SpaceConfig;
}


export default function CustomApp({ isOpen, onClose, app, space }: Props): JSX.Element {
    const [response, setResponse] = useState();

    const submit = async () => {
       
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
                        <ProveEligibility app={app} onEligible={(_response) => setResponse(_response)} groupMetadataList={groupMetadataList}/>
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