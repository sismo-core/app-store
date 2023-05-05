'use client'

import React from "react";
import styled from "styled-components";

const Container = styled.div`
    height: 183px;
    display: flex;
    justify-content: right;
    align-items: center;
    position: relative;
`;

const Separator = styled.div`
    background-color: #525C8F;
    height: 1px;
    width: 100%;
    position: absolute;
    top: 0px;
`


export default function Footer(): JSX.Element {
    return <Container>
        <Separator />
        <div>
            Footer
        </div>
    </Container>;
}
