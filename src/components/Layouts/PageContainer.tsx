"use client";

import { useEffect, useState } from "react";
import { styled } from "styled-components";

export const Container = styled.div<{ $scrollBarWidth: number }>`
margin: 0 auto;
  max-width: 1280px;
  @media (min-width: 1281px) {
    min-width: 1280px;
    padding: 0px ${(props) => 60 - props.$scrollBarWidth / 2}px 0px
      ${(props) => 60 + props.$scrollBarWidth / 2}px;
  }
  @media (max-width: 1280px) {
    padding: 0px ${(props) => 60 - props.$scrollBarWidth}px 0px 60px;
    min-width: calc(100vw - 120px);
  }
  @media (max-width: 900px) {
    padding: 0px ${(props) => 0 - props.$scrollBarWidth}px 0px 0px;
    min-width: 100vw;
  }
`;

type Props = {
  children: React.ReactNode;
};

export default function PageContainer({ children }: Props): JSX.Element {
  const [scrollbarWidth, setScrollbarWidth] = useState(null);

  useEffect(() => {
    function resizeHandler() {
      setScrollbarWidth(window.innerWidth - window.visualViewport.width);
    }
    window.visualViewport.addEventListener("resize", resizeHandler);
    return () =>
      window.visualViewport.removeEventListener("resize", resizeHandler);
  }, []);

  return <Container $scrollBarWidth={scrollbarWidth}>{children}</Container>;
}
