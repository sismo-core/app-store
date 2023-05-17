"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 79px;
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  background: linear-gradient(180deg, rgba(10, 16, 31, 0) 0%, rgba(10, 16, 31, 0.9) 100%);
`;

const Text = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.neutral1};
  font-family: ${props => props.theme.fonts.regular};
  margin-top: 8px;
`

const ProgressContainer = styled.div`
  background: rgba(233, 236, 255, 0.4);
  width: 100%;
  height: 8px;
  border-radius: 2px;
`

const Progress = styled.div<{progress: number}>`
  background: #E9EBF6;
  border-radius: 2px;
  height: 100%;
  width: ${props => props.progress}%;
  transition: width 0.3s;
`

type Props = {
  register: number;
  availableMax: number;
}

export default function AvailabilityProgressBar({ register, availableMax }: Props): JSX.Element {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let _progress = register * 100 / availableMax;
    if (_progress > 100) _progress = 100;
    setProgress(_progress);
  }, [register])

  return (
    <Container>
      <ProgressContainer>
        <Progress progress={progress}/>
      </ProgressContainer>
      <Text>
        {register} / {availableMax} available
      </Text>
    </Container>
  );
}