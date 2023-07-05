'use client'

import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Congratulations from "./components/Congratulations";
import Section from "./components/Section";
import ProveEligibility from "./components/ProveEligibility";
import Button from "@/src/ui/Button";
import { ZkCustomAppConfig } from "@/space-config/types";
import Button3D from "@/src/ui/Button3D";
import { useRouter } from "next/navigation";
import { worldcoinConfigMain } from "../main";
import { CredentialType, IDKitWidget } from "@worldcoin/idkit";
import { ZkCustomAppContainer } from "@/src/components/ZkCustomAppContainer";

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

export default function WorldcoinProofOfPersonhoodCustomApp(): JSX.Element {
    const router = useRouter();
    const app = worldcoinConfigMain.apps[0] as ZkCustomAppConfig;
    const api = app.templateConfig.extraData.api;
    const [alreadySubscribed, setAlreadySubscribed] = useState(false);
    const [domReady, setDomReady] = React.useState(false);
    const [verifying, setVerifying] = useState(false);
    const [finished, setFinished] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [sismoResponse, setSismoResponse] = useState(null);
    
    const onFinish = async (worldcoinResult) => {
        setVerifying(true);
        setLoading(true);
        const body = JSON.stringify({
            result: worldcoinResult,
            response: sismoResponse
        });
        const res = await fetch(`${api}/verify`, {
            method: "POST",
            body
        });
        setVerifying(false);
        if (!res.ok) {
            throw new Error("Error while verifying Worldcoin proof");
        }
        const data = await res.json();
        if (data.success) {
            setFinished(true);
        }

        switch (data.code) {
            case "sismo-response-invalid":
                setError("Server error [Sismo response invalid]. Please contact us or retry later.");
                break;
            case "worldcoin-result-invalid":
                setError("Server error [Worldcoin result invalid]. Please contact us or retry later.");
                break;
            case "worldcoin-proof-already-verified":
                setAlreadySubscribed(true);
                break;
            case "nullifier-hash-already-used":
                setAlreadySubscribed(true);
                break;
            case "vault-id-already-used":
                setAlreadySubscribed(true);
                break;
            case "orb-already-verified":
                setAlreadySubscribed(true);
                break;
            case "phone-already-verified":
                setAlreadySubscribed(true);
                break;
        }
    }

    useEffect(() => {
      setDomReady(true)
    }, [])

    const getRedirectParam = () => {
        if (!window) return null;
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        const redirect = params.get('redirect');
        return decodeURIComponent(redirect);
    }
    const redirect = getRedirectParam();
    console.log("redirect", redirect);

    if (!domReady) return;

    return <ZkCustomAppContainer>
            {
                !finished && <>
                    <Section number={1} isOpen={!sismoResponse} title="Sign in with Sismo" style={{marginBottom: 16}} success={Boolean(sismoResponse)}>
                        <ProveEligibility app={app} onEligible={(_response) => setSismoResponse(_response)}/>
                    </Section>
                    <Section number={2} isOpen={Boolean(sismoResponse)} title={app?.metadata?.ctaText} success={alreadySubscribed}>
                        {
                            alreadySubscribed ?
                            <AlreadyRegistered style={{marginTop: 24}}>
                                You already registered.
                            </AlreadyRegistered>
                            :
                            <>
                                <IDKitWidget
                                    app_id="app_staging_9aa79aedb09dc9224e0b85c36133278b"
                                    action="proof-of-personhood"
                                    signal="main"
                                    credential_types={[CredentialType.Phone, CredentialType.Orb]}
                                    onSuccess={(result) => onFinish(result)}
                                >
                                    {({ open }) => <Button onClick={open} loading={verifying || loading} style={{ width: "100%", marginTop: 16}}>
                                        {verifying ? "Verifying..." : "Prove you are unique" }
                                    </Button>}
                                </IDKitWidget>
                                {
                                    error &&
                                    <ErrorMsg>
                                        {error}
                                    </ErrorMsg>
                                }
                            </>
                        }
                    </Section>
                    {Boolean(sismoResponse) && 
                        <Bottom>
                            <Button3D onClick={() => redirect ? window.location.href = redirect : router.push("/synaps")} secondary>
                                { redirect ? "Back to the Vault App" : "Back to the space" }
                            </Button3D>
                        </Bottom>
                    }
                </>
            }
            {
                finished && <Congratulations app={app}/>
            }
    </ZkCustomAppContainer>;
}