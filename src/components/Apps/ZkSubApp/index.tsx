'use client'

import { SpaceConfig, ZkSubAppConfig } from "@/space-config/types";
import Modal from "@/src/ui/Modal";
import React, { useMemo, useState } from "react";
import { styled } from "styled-components";
import ShortTextField from "./components/ShortTextField";
import { SismoConnectButton, SismoConnectClientConfig, useSismoConnect } from "@sismo-core/sismo-connect-react";
import Button3D from "@/src/ui/Button3D";

const Content = styled.div`

`

const Fields = styled.div`
    
`

type Props = {
    isOpen: boolean;
    onClose: () => void;
    app: ZkSubAppConfig;
    space: SpaceConfig;
}

type FieldValue = {
    name: string,
    value: string
}
export default function ZkSubApp({ isOpen, onClose, app, space }: Props): JSX.Element {
    const config: SismoConnectClientConfig = useMemo(() => ({
        appId: app?.appId,
        devMode: {
            enabled: true,
            devGroups: [{
                groupId: "0x682544d549b8a461d7fe3e589846bb7b",
                data: ["0xb01ee322C4f028B8A6BFcD2a5d48107dc5bC99EC"]
            }]
        }
    }), [app]);
    const { response } = useSismoConnect({ config });

    const [fields, setFields] = useState<FieldValue[]>([]);

    const submit = async () => {
        // TODO Requirement fields verification
        const body = {
            fields,
            response: response,
            appSlug: app.slug,
            spaceSlug: space.slug
        }
        const res = await fetch("/api/verify", {
            method: "POST",
            body: JSON.stringify(body)
        })
        const data = await res.json();
        console.log("data", data);
    }

    const updateField = (name: string, value: string) => {
        const _fields = [...fields];
        const index = _fields.findIndex(field => field.name === name);
        if (index !== -1) _fields.splice(index, 1);
        _fields.push({
            name,
            value
        });
        setFields(_fields);
    }

    return <Modal isOpen={isOpen} onClose={onClose} animated>
        <Content>
            {app?.name}
            {(app?.claimRequests || app?.authRequests) &&
                <SismoConnectButton 
                    config={config}
                    claims={app?.claimRequests}
                    auths={app?.authRequests}
                    callbackPath={window.location.pathname}
                />
            }
            <Fields>
                {
                    app?.fields && app.fields.map(field => <div key={field.label}>{
                        field.type === "short-text" && <ShortTextField field={field} onChange={(value) => updateField(field.label, value)}/>
                    }</div>)
                }
            </Fields>
            <Button3D onClick={submit}>
                Submit
            </Button3D>
        </Content>
    </Modal>;
}