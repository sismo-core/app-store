'use client'

import { SpaceConfig, ZkTelegramBotAppConfig } from "@/space-config/types";
import Modal from "@/src/ui/Modal";
import React, { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import Button3D from "@/src/ui/Button3D";
import ProveEligibility from "../components/ProveEligibility";
import { SismoConnectResponse } from "@sismo-core/sismo-connect-server";
import Section from "../components/Section";
import { GroupMetadata } from "@/src/libs/group-provider";
import { useModals } from "@/src/state/ModalState";
import env from "@/src/environments";

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ErrorMsg = styled.div`
    color: ${props => props.theme.colors.error};
    font-family: ${props => props.theme.fonts.regular};
    font-size: 12px;
`

const Bottom = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 15px;
    position: relative;
    display: flex;
    align-items: center;
`

type Props = {
    isOpen: boolean;
    onClose: () => void;
    groupMetadataList: GroupMetadata[];
    app: ZkTelegramBotAppConfig;
    space: SpaceConfig;
}

export default function ZkBotApp({ isOpen, onClose, app, space, groupMetadataList }: Props): JSX.Element {
    const [error, setError] = useState(null);
    const [approved, setApproved] = useState(false);
    const [verifying, setVerifying] = useState<boolean>(false);
    const { requirementsIsOpen } = useModals();

    const verify = async (response: SismoConnectResponse) => {
        const body = {
            response: response,
            appSlug: app.slug,
            spaceSlug: space.slug
        }
        setError(null);
        setVerifying(true);
        const res = await fetch("/api/zk-telegram-bot/verify", {
            method: "POST",
            body: JSON.stringify(body)
        })
        setVerifying(false);
        if (!res.ok || res.status !== 200) {
            setError("Server error");
            return;
        }
        const data = await res.json();
        if (data.status === "approved" || data.status === "already-approved") {
            setApproved(true);
        } else {
            setError("Server Error");
        }
    };

    useEffect(() => {
        if (!isOpen) reset();
    }, [isOpen])

    const reset = () => {
        setTimeout(() => {
            setError(null);
            setApproved(false);
        }, 300);
    }

    const openInviteLink = () => {
        const inviteLink = env.isDemo ? app?.demo?.telegramInviteLink : app?.telegramInviteLink;
        window.open(inviteLink, "_blank");
    }

    return <Modal isOpen={isOpen} onClose={onClose} animated outsideClosable={!requirementsIsOpen}>
        <Content>
            {
                <>
                    <Title>
                        {app?.name}
                    </Title>
                    <Description>
                        {app?.description}
                    </Description>
                    <Section number={1} isOpen={!approved} title="Prove Eligibility" style={{marginBottom: 16}} success={approved}>
                        <ProveEligibility 
                            app={app} 
                            onEligible={(response) => verify(response)}
                            verifying={verifying}
                            groupMetadataList={groupMetadataList} />
                        {error && (
                            <Bottom>
                                <ErrorMsg>
                                {error}
                                </ErrorMsg>
                            </Bottom>
                        )}   
                    </Section>
                    <Section number={2} isOpen={approved} title={app?.CTAText} success={false}>
                        <ButtonContainer>
                            <Button3D style={{marginTop: 25, marginBottom: 15}} onClick={openInviteLink} secondary>
                                Join our Telegram
                            </Button3D>
                        </ButtonContainer>
                    </Section>
                </>
            }
        </Content>
    </Modal>;
}