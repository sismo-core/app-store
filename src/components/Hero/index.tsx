'use client'

import React from "react";
import styled from "styled-components";

const Container = styled.div`
    height: 381px;
    color: white;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Separator = styled.div`
    background-color: #525C8F;
    height: 1px;
    width: 100%;
    position: absolute;
    bottom: 0px;
`

const Title = styled.div`
    font-size: 36px;
    max-width: 490px;
`

const Subtitle = styled.div` 
    font-size: 18px;
    max-width: 265px;
`

const TextContainer = styled.div`
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
`

export default function Hero(): JSX.Element {
    return <Container>
        <Separator/>
        <TextContainer>
            <Title style={{marginBottom: 8}}>
                Powerful spaces for <br/>
                community builders who truly care.
            </Title>
            <Subtitle>
                Bring joy to your community, respect their privacy.
            </Subtitle>
        </TextContainer>
    </Container>;
}
