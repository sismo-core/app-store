'use client'

import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Congratulations from "./components/Congratulations";
import Section from "./components/Section";
import Button from "@/src/ui/Button";
import { CustomAppConfig } from "@/space-config/types";
import Button3D from "@/src/ui/Button3D";
import { useRouter } from "next/navigation";
import { worldcoinConfigMain } from "../main";
import { CredentialType, IDKitWidget } from "@worldcoin/idkit";
import { CustomAppContainer } from "@/src/components/CustomAppContainer";
import ProveEligibility from "./components/ProveEligibility";

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
    position: absolute;
    bottom: -35px;
    left: 0px;
`

const Verifications = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 24px;
`

export default function WorldcoinProofOfPersonhoodCustomApp(): JSX.Element {
    const router = useRouter();
    const app = worldcoinConfigMain.apps[0] as CustomAppConfig;
    const api = app.templateConfig.api;
    const [alreadySubscribed, setAlreadySubscribed] = useState(false);
    const [domReady, setDomReady] = React.useState(false);
    const [finished, setFinished] = useState(false);
    const [error, setError] = useState(null);
    const [redirect, setRedirect] = useState(null);
    const [verifyingOrb, setVerifyingOrb] = useState(false);
    const [verifyingPhone, setVerifyingPhone] = useState(false);

    const [sismoResponse, setSismoResponse] = useState(null);
    
    const onFinish = async (worldcoinResult, type: "orb" | "phone") => {
        if (type === "orb") setVerifyingOrb(true);
        if (type === "phone") setVerifyingPhone(true);
        const body = JSON.stringify({
            result: worldcoinResult,
            response: sismoResponse
        });
        const res = await fetch(`${api}/verify`, {
            method: "POST",
            body
        });
        setVerifyingOrb(false);
        setVerifyingPhone(false);
        const data = await res.json();
        
        if (data.success) {
            setFinished(true);
        }

        switch (data.code) {
            case "sismo-response-invalid":
                setError("Server error: Sismo response invalid. Please contact us or retry later.");
                break;
            case "worldcoin-result-invalid":
                setError("Server error: Worldcoin result invalid. Please contact us or retry later.");
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
      const getRedirectParam = () => {
          if (!window) return null;
          const url = new URL(window.location.href);
          const params = new URLSearchParams(url.search);
          const redirect = params.get('redirect');
          if (!redirect) return null;
          return decodeURIComponent(redirect);
      }
      const _redirect = getRedirectParam();
      if (_redirect) setRedirect(_redirect)
    }, [])

    if (!domReady) return;

    return <CustomAppContainer>
            {
                !finished && <>
                    <Section number={1} isOpen={!sismoResponse} title="Sign in with Sismo" style={{marginBottom: 16}} success={Boolean(sismoResponse)}>
                        <ProveEligibility app={app} onEligible={(_response) => setSismoResponse(_response)}/>
                    </Section>
                    <Section number={2} isOpen={Boolean(sismoResponse)} title={app?.templateConfig?.step2CtaText} success={alreadySubscribed}>
                        {
                            alreadySubscribed ?
                            <AlreadyRegistered style={{marginTop: 24}}>
                                You already registered.
                            </AlreadyRegistered>
                            :
                            <Verifications>
                                <IDKitWidget
                                    app_id="app_staging_9aa79aedb09dc9224e0b85c36133278b"
                                    action="proof-of-personhood-orb"
                                    signal="main"
                                    credential_types={[CredentialType.Orb]}
                                    onSuccess={(result) => onFinish(result, "orb")}
                                >
                                    {({ open }) => <Button onClick={open} loading={verifyingOrb} style={{ width: "100%" }}>
                                        {verifyingOrb ? "Verifying Biometric..." : "Biometric verification" }
                                    </Button>}
                                </IDKitWidget>
                                {/* <IDKitWidget
                                    app_id="app_staging_9aa79aedb09dc9224e0b85c36133278b"
                                    action="proof-of-personhood-phone"
                                    signal="main"
                                    credential_types={[CredentialType.Phone]}
                                    onSuccess={(result) => onFinish(result, "phone")}
                                >
                                    {({ open }) => <Button onClick={open} loading={verifyingPhone} style={{ width: "100%" }}>
                                        {verifyingPhone ? "Verifying Biometric..." : "Phone verification" }
                                    </Button>}
                                </IDKitWidget> */}
                            </Verifications>
                        }
                        {
                            error &&
                            <ErrorMsg>
                                {error}
                            </ErrorMsg>
                        }
                    </Section>
                </>
            }
            {
                finished && <Congratulations app={app}/>
            }
            {alreadySubscribed || finished && 
                <Bottom>
                    <Button3D onClick={() => redirect ? window.location.href = redirect : router.push(`/${worldcoinConfigMain.metadata.slug}`)} secondary>
                        { redirect ? "Back to the Vault App" : "Back to the space" }
                    </Button3D>
                </Bottom>
            }
    </CustomAppContainer>;
}