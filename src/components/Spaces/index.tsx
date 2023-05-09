'use client'

import { SpaceConfig } from "@/space-config/types";
import React from "react";
import styled from "styled-components";
import SpaceCard from "./SpaceCard";

const Container = styled.div`
    margin: 34px 0px 40px 0px;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 27px;
    width: 100%;
`

type Props = {
    configs: SpaceConfig[];
}

export default function Spaces({ configs }: Props): JSX.Element {
    return <Container>
        <Grid>
            {
                configs.map(config => <div key={config.slug}>
                    <SpaceCard config={config}/>
                </div>)
            }
        </Grid>
    </Container>;
}
