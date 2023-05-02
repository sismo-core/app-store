import React, { useState } from "react";
import styled from "styled-components";
import Loader from "../Loader";
import colors from "../../themes/colors";

const Container = styled.button<{
  hover?: boolean;
  disabled?: boolean;
  primary?: boolean;
  gold?: boolean;
  clickable?: boolean;
  transparent?: boolean;
  outline?: boolean;
  test?: boolean;
  success?: boolean;
  small?: boolean;
  verySmall?: boolean;
}>`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: fit-content;
  border: none;
  height: 40px;
  padding: 0px 25px;
  background-color: #2a3557;

  ${(props) =>
    props.hover && !props.disabled && props.clickable && "opacity: 0.8;"}
  ${(props) =>
    !props.clickable &&
    `
      cursor: default;
  `}
  
  ${(props) =>
    props.test &&
    `
    background-color: ${props.theme.colors.test};
  `}
  
  ${(props) =>
    props.primary &&
    `
    background-color: ${props.theme.colors.primary};
  `}

  ${(props) =>
    props.gold &&
    `
    background-color: ${props.theme.colors.orange2};
  `}

  ${(props) =>
    props.transparent &&
    `
    background-color: transparent;
  `}

  ${(props) =>
    props.outline &&
    `
    border: 1px solid #525c8f;
    background-color: transparent;
  `}

  ${(props) =>
    props.success &&
    `
    background-color: ${props.theme.colors.success};
  `}

  ${(props) =>
    props.disabled &&
    `
      cursor: default;
      background-color: #323E64;
  `}

  @media (max-width: 600px) {
    height: 40px;
  }

  ${(props) =>
    props.small &&
    `
    @media (max-width: 600px) {
      height: 30px;
    }
    height: 30px;
    padding: 0px 15px;
  `}

  ${(props) =>
    props.verySmall &&
    `
    height: 28px;
    padding: 0px 10px;

    @media (max-width: 600px) {
    height: 28px;
  `}
`;

const LoaderContainer = styled.div<{
  small: boolean;
  verySmall: boolean;
  center: boolean;
}>`
  position: absolute;
  left: 14px;
  top: 12px;
  ${(props) =>
    props.small &&
    `
    left: 10px;
    top: 8px;
  `}
  ${(props) =>
    props.center &&
    `
    left: auto;
    top: 2px;
    position: relative;
  `}
`;

const Content = styled.div<{
  isMedium?: boolean;
  small?: boolean;
  verySmall?: boolean;
  fontColor: string;
  disabled: boolean;
}>`
  font-size: 16px;
  color: ${(props) => props.fontColor};

  @media (max-width: 600px) {
    font-size: 14px;
  }

  ${(props) =>
    props.small &&
    `
    font-size: 14px;
  `}

  ${(props) =>
    props.verySmall &&
    `
    line-height: 18px;
    font-size: 12px;
    padding: 0px .3px;

    @media (max-width: 600px) {
    font-size: 12px;
  }
  `}

  ${(props) =>
    props.isMedium &&
    `
    font-family: ${props.theme.fonts.medium};
  `}

  ${(props) =>
    props.disabled &&
    `
      color: #6771A9;
  `}
`;

type ButtonProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  loading?: boolean;
  disabled?: boolean;
  primary?: boolean;
  gold?: boolean;
  secondary?: boolean;
  transparent?: boolean;
  success?: boolean;
  outline?: boolean;
  test?: boolean;
  small?: boolean;
  verySmall?: boolean;
  isMedium?: boolean;
};

export default function Button({
  children,
  style,
  onClick,
  loading,
  disabled,
  gold,
  primary,
  transparent,
  outline,
  small,
  verySmall,
  success,
  test,
  isMedium,
}: ButtonProps): JSX.Element {
  const [hover, setHover] = useState(false);

  let fontColor = "white";
  if (primary) fontColor = colors.blue11;
  if (outline) fontColor = "#525c8f;";
  if (test) fontColor = "#13203D";
  if (success) fontColor = "#13203D";
  if (disabled) fontColor = "#6771A9";
  if (gold) fontColor = "#13203D";

  return (
    <Container
      style={style}
      hover={hover}
      onClick={(e) => !loading && onClick && onClick(e)}
      clickable={!loading}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      primary={primary}
      gold={gold}
      transparent={transparent}
      outline={outline}
      success={success}
      test={test}
      small={small}
      verySmall={verySmall}
    >
      {loading && (
        <LoaderContainer small={small} verySmall center={!Boolean(children)}>
          <Loader color={fontColor} size={small ? 10 : 13} />
        </LoaderContainer>
      )}
      <Content
        disabled={disabled}
        small={small}
        verySmall={verySmall}
        fontColor={fontColor}
        isMedium={primary || success || isMedium}
      >
        {children}
      </Content>
    </Container>
  );
}
