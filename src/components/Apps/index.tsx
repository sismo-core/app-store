'use client'

import { App, SpaceConfig, ZkDropAppConfig, ZkSubAppConfig } from "@/space-config/types";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AppCard from "./components/AppCard";
import ZkDropApp from "./ZkDropApp";
import ZkSubApp from "./ZkSubApp";
import { useRouter } from 'next/navigation';

const Container = styled.div`
    margin: 48px 0px 40px 0px;
    min-height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 40px;
    width: 100%;
`

type Props = {
    config: SpaceConfig;
    appSlug: string;
}

export default function Apps({ config, appSlug }: Props): JSX.Element {
    const [zkSubApp, setZkSubApp] = useState<ZkSubAppConfig>(null);
    const [zkDropApp, setZkDropApp] = useState<ZkDropAppConfig>(null);

    useEffect(() => {
        if (!config) return;
        if (!appSlug) return;
        const app = config.apps.find(app => app.type === "zksub" &&  app.slug === appSlug);
        if (app && app.type === "zksub") {
            setTimeout(() => {
                setZkSubApp(app)
            }, 300);
        }
    }, [config, appSlug])

    return <Container>
        <ZkSubApp 
            isOpen={Boolean(zkSubApp)} 
            app={zkSubApp} 
            space={config}
            onClose={() => {
                let url = window.location.origin + `/${config.slug}`;
                window.history.replaceState(null, "", url);
                setZkSubApp(null);
            }}
        />
        <ZkDropApp isOpen={Boolean(zkDropApp)} app={zkDropApp} onClose={() => setZkDropApp(null)}/>
        <Grid>
            {
                config?.apps && config.apps.map(app => <div key={app.name + app.type}>
                    <AppCard 
                        app={app} 
                        onCTAClick={() => {
                            if (app.type === "external") window.location.href = app.link;
                            if (app.type === "zkdrop") setZkDropApp(app);
                            if (app.type === "zksub") {
                                let url = window.location.origin + `/${config.slug}/${app.slug}`;
                                window.history.replaceState(null, "", url);
                                setZkSubApp(app);
                            }
                        }} 
                    />
                </div>)
            }
            {
                !config && <div>
                    No apps found for this space
                </div>
            }
        </Grid>
    </Container>;
}
