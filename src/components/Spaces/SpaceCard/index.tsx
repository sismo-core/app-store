'use client'

import { SpaceConfig } from "@/space-config/types";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Container = styled(Link)`
    display: flex;
    flex-direction: column;
    height: 250px;
    cursor: pointer;
    border: 1px solid #525C8F;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

type Props = {
    config: SpaceConfig;
}

export default function SpaceCard({ config }: Props): JSX.Element {

    return <Container href={`/${config.slug}`}>
        <div>
            {config.name}
        </div>
    </Container>;
}
