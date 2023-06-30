'use client'

import { ZkFormAppType } from "@/src/libs/spaces";
import Button3D from "@/src/ui/Button3D";
import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.div`
    font-family: ${props => props.theme.fonts.semibold};
    color: ${props => props.theme.colors.neutral1};
    font-size: 32px;
    margin-top: 63px;
`

const Subtitle = styled.div`
    font-family: ${props => props.theme.fonts.regular};
    color: ${props => props.theme.colors.neutral3};
    font-size: 16px;
    margin-bottom: 63px;
    text-align: center;
`

type Props = {
    onBackToSpace: () => void,
    app: ZkFormAppType
}

export default function Congratulations({ onBackToSpace, app }: Props): JSX.Element {

    return <Container>
        <Title style={{marginBottom: 16}}>
            {app?.congratulationsMessage?.title}
        </Title>
        <Subtitle>
            {app?.congratulationsMessage?.description}
        </Subtitle>
        <Button3D onClick={onBackToSpace} secondary>
            Back to the Space
        </Button3D>
    </Container>;
}