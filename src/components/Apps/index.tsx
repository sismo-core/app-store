'use client'

import { App } from "@/space-config/types";
import React, { useState } from "react";
import styled from "styled-components";
import AppCard from "./components/AppCard";
import ZkDropApp from "./ZkDropApp";
import ZkSubApp from "./ZkSubApp";

const Container = styled.div`
    margin: 48px 0px 80px 0px;
    //min-height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: 16px;
    width: 100%;

    @media (max-width: 768px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
`

type Props = {
    apps: App[];
}

export default function Apps({ apps}: Props): JSX.Element {
    const [zkSubApp, setZkSubApp] = useState(null);
    const [zkDropApp, setZkDropApp] = useState(null);

    return <Container>
        <ZkSubApp isOpen={Boolean(zkSubApp)} app={zkSubApp} onClose={() => setZkSubApp(null)}/>
        <ZkDropApp isOpen={Boolean(zkDropApp)} app={zkDropApp} onClose={() => setZkDropApp(null)}/>
        <Grid>
            {
                apps && apps.map(app => <div key={app.name + app.type}>
                    <AppCard 
                        app={app} 
                        onCTAClick={() => {
                            if (app.type === "external") window.location.href = app.link;
                            if (app.type === "zkdrop") setZkDropApp(app);
                            if (app.type === "zksub") setZkSubApp(app);
                        }} 
                    />
                </div>)
            }
            {
                !apps && <div>
                    No apps found for this space
                </div>
            }
        </Grid>
    </Container>;
}
