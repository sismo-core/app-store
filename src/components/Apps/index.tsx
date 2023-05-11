'use client'

import { SpaceConfig, ZkDropAppConfig, ZkSubAppConfig } from "@/space-config/types";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AppCard from "./components/AppCard";
import ZkDropApp from "./ZkDropApp";
import ZkSubApp from "./ZkSubApp";

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
    // Don't use Boolean(zkSubApp) to open the app in order to avoid seeing the app disappear during the close animation
    const [isZkSubAppOpen, setIsZkSubAppOpen] = useState(false);
    const [zkSubAppOpening, setZkAppOpening] = useState(false);

    const [zkDropApp, setZkDropApp] = useState<ZkDropAppConfig>(null);
    const [isZkDropAppOpen, setIsZkDropAppOpen] = useState(false);

    useEffect(() => {
        if (!config) return;
        if (!appSlug) return;
        const app = config.apps.find(app => app.type === "zksub" &&  app.slug === appSlug);
        if (app && app.type === "zksub") {
            setZkAppOpening(true);
            // Can open the modal only 300ms after the init due to animation
            setTimeout(() => {
                setZkSubApp(app);
                setIsZkSubAppOpen(true);
                setZkAppOpening(false);
            }, 300);
        }
    }, [config, appSlug])

    return <Container>
        <ZkSubApp 
            isOpen={isZkSubAppOpen} 
            app={zkSubApp} 
            space={config}
            onClose={() => {
                let url = window.location.origin + `/${config.slug}`;
                window.history.replaceState(null, "", url);
                setIsZkSubAppOpen(false);
            }}
        />
        <ZkDropApp isOpen={isZkDropAppOpen} app={zkDropApp} onClose={() => setIsZkDropAppOpen(false)}/>
        <Grid>
            {
                config?.apps && config.apps.map(app => <div key={app.name + app.type}>
                    <AppCard 
                        app={app} 
                        onCTAClick={() => {
                            if (zkSubAppOpening) return;

                            if (app.type === "external") window.location.href = app.link;
                            if (app.type === "zkdrop") {
                                setZkDropApp(app);
                                setIsZkDropAppOpen(true);
                            }
                            if (app.type === "zksub") {
                                let url = window.location.origin + `/${config.slug}/${app.slug}`;
                                window.history.replaceState(null, "", url);
                                setZkSubApp(app);
                                setIsZkSubAppOpen(true);
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
