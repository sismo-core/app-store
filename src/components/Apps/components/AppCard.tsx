'use client'

import { App } from "@/space-config/types";
import Button from "@/src/ui/Button";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 614px;
    cursor: pointer;
    border: 1px solid #525C8F;
    border-radius: 16px;
    padding: 16px;
`;

type Props = {
    app: App;
    onCTAClick: () => void
}

export default function AppCard({ app, onCTAClick }: Props): JSX.Element {

    return <Container>
        <div>
            {app.name}
        </div>
        <div>
            {app.description}
        </div>
        <Button success onClick={onCTAClick} style={{ width: "100%" }}>
            {app.buttonText}
        </Button>
    </Container>;
}
