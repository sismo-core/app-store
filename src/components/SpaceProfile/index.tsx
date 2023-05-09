'use client'

import { SpaceConfig } from "@/space-config/types";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
    color: white;
    background-color: blue;
`;

type Props = {
    config: SpaceConfig;
    coverImage: string;
}

export default function SpaceProfile({ config, coverImage }: Props): JSX.Element {

    return <Container>
        {config?.coverImage && coverImage && (
            <Image src={coverImage} alt={"Space cover image"} width={500} height={300} />
        )}
        <div>
            {config.name}
        </div>
        <div>
            {config.description}
        </div>
    </Container>;
}
