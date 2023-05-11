import React, { useState } from "react";
import styled from "styled-components";
import Loader from "../Loader";

const Container = styled.button<{
  hover?: boolean;
  disabled?: boolean;
  clickable?: boolean;
}>`
  ${props => props.clickable && `
    cursor: pointer;
  `};
  border: none;
  height: 46px;
  border-radius: 10px;
  position: relative;
  background-color: ${props => props.theme.colors.blue12};

  ${props => props.disabled && `
    opacity: 0.5;
    cursor: default;
  `};
`;

const Content = styled.div<{ hover: boolean, secondary: boolean}>`
  position: relative;
  z-index: 2;
  padding: 0px 16px;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
  background-color: ${props => props.theme.colors.blue12};
  border: ${props => props.secondary ? 1 : 3}px solid ${props => props.theme.colors.green2};

  border-radius: 10px;

  font-size: 16px;
  color: ${(props) => props.theme.colors.blue0};
  font-family: ${props => props.theme.fonts.medium};


  bottom: ${(props) => props.hover ? (props.secondary ? -3 : -5) : 0}px;
  right: ${(props) => props.hover ? -3 : 0}px;
  transition: 0.15s;
`;

const BackgroundContent = styled.div<{ secondary: boolean }>`
  position: absolute;
  bottom: ${(props) => props.secondary ? -3 : -5}px;
  right: -3px;

  width: 100%;
  height: 100%;

  ${props => props.secondary && `border: 1px solid ${props.theme.colors.blueRYB};`};
  
  background-color: ${props => props.secondary ? props.theme.colors.blue12 : props.theme.colors.red0};
  border-radius: 10px;
`

type ButtonProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  loading?: boolean;
  disabled?: boolean;
  secondary?: boolean;
};

export default function Button3D({
  children,
  style,
  onClick,
  loading,
  disabled,
  secondary
}: ButtonProps): JSX.Element {
  const [hover, setHover] = useState(false);

  return (
    <Container
      style={style}
      hover={!loading && hover}
      onClick={(e) => !loading && !disabled && onClick && onClick(e)}
      clickable={!loading}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Content hover={!loading && hover} secondary={secondary}>
        {
          loading &&
          <Loader style={{ marginRight: 10 }}/>
        }
        {children}
      </Content>
      <BackgroundContent secondary={secondary}/>
    </Container>
  );
}
