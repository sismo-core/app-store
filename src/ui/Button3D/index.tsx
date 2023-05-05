import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.button<{
  hover?: boolean;
  disabled?: boolean;
}>`
  cursor: pointer;
  border: none;
  height: 46px;
  border-radius: 10px;
  position: relative;
  background-color: ${props => props.theme.colors.blue12};
`;

const Content = styled.div<{ hover: boolean}>`
  position: relative;
  z-index: 2;
  padding: 0px 16px;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
  background-color: ${props => props.theme.colors.blue12};
  border: 3px solid ${props => props.theme.colors.green2};
  border-radius: 10px;

  font-size: 16px;
  color: ${(props) => props.theme.colors.blue0};
  font-family: ${props => props.theme.fonts.medium};


  bottom: ${(props) => props.hover ? -5 : 0}px;
  right: ${(props) => props.hover ? -3 : 0}px;
  transition: 0.15s;
`;

const BackgroundContent = styled.div`
  position: absolute;
  bottom: -5px;
  right: -3px;

  width: 100%;
  height: 100%;

  background-color: ${props => props.theme.colors.red0};
  border-radius: 10px;
`

type ButtonProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  loading?: boolean;
  disabled?: boolean;
};

export default function Button3D({
  children,
  style,
  onClick,
  loading,
  disabled,
}: ButtonProps): JSX.Element {
  const [hover, setHover] = useState(false);

  return (
    <Container
      style={style}
      hover={hover}
      onClick={(e) => !loading && onClick && onClick(e)}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Content hover={hover}>
        {children}
      </Content>
      <BackgroundContent/>
    </Container>
  );
}
