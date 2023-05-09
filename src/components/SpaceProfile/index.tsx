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
    banner: string;
}

export default function SpaceProfile({ config, banner }: Props): JSX.Element {

    return <Container>
        {config?.banner && banner && (
            <Image src={banner} alt={"Space banner"} width={500} height={300} />
        )}
        <div>
            {config.name}
        </div>
        <div>
            {config.description}
        </div>
    </Container>;
}
