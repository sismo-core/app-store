'use client'

import { ZkSubAppConfig } from "@/space-config/types";
import env from "@/src/environments";
import { SismoConnectButton } from "@sismo-core/sismo-connect-react";
import React from "react";
import { styled } from "styled-components";

const Container = styled.div`

`

const Eligibility = styled.div`
    height: 44px;
    margin-top: 22px;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content:center;
`

type Props = {
    app: ZkSubAppConfig;
    onEligible: (response) => void
}

export default function ProveEligibility({ app, onEligible }: Props): JSX.Element {

    return <Container>
        <Eligibility>
        </Eligibility>
        <ButtonContainer>
            {(app?.claimRequests || app?.authRequests) && 
                <SismoConnectButton 
                    config={{
                        appId: env.isDemo ? app?.demo.appId : (env.isDev ? "0x4c40e70b081752680ce258ad321f9e58" : app?.appId),
                        vaultAppBaseUrl: env.isDemo ? "https://demo.vault-beta.sismo.io" : null,
                        devMode: {
                            enabled: env.isDemo || env.isDev,
                            devGroups: env.isDemo || env.isDev ? [{
                                groupId: app?.claimRequests[0]?.groupId,
                                data: [
                                    // Vitalik address
                                    "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
                                    "0xb01ee322C4f028B8A6BFcD2a5d48107dc5bC99EC",
                                ]
                            }] : null
                        }
                    }}
                    claims={app?.claimRequests}
                    auths={app?.authRequests}
                    callbackPath={window.location.pathname}
                    onResponse={(response) => {
                        response && onEligible(response);
                    }}
                />
            }
        </ButtonContainer>
    </Container>;
}