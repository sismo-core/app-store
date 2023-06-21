"use client";

import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 92px - 183px);
`;

const Content = styled.div`
    max-width: 580px;
`
type Props = {
    children: React.ReactNode
}

export default function CustomAppContainer({ children }: Props): JSX.Element {

  return (
    <Container>
        <Content>
            {children}
        </Content>
    </Container>
  );
}
