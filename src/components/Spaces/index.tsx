'use client'

import { SpaceConfig } from "@/space-config/types";
import React from "react";
import styled from "styled-components";
import SpaceCard from "./SpaceCard";
import { SpaceImportedImage } from "@/src/app/(landing)/page";

const Container = styled.div`
    margin: 34px 0px 40px 0px;
    width: 100%;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 27px;
    width: 100%;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 1100px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 16px;
    }
    @media (max-width: 500px) {
        grid-template-columns: repeat(1, 1fr);
    }
`

type Props = {
    configs: SpaceConfig[];
    spaceImportedImages: SpaceImportedImage[];
}

export default function Spaces({ configs, spaceImportedImages }: Props): JSX.Element {
    return <Container>
        <Grid>
            {
                configs.map(config => <div key={config.slug}>
                    <SpaceCard config={config} image={spaceImportedImages.find(el => el.config.slug === config.slug).link}/>
                </div>)
            }
        </Grid>
    </Container>;
}
