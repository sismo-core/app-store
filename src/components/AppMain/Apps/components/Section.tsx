"use client";

import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.colors.neutral7};
  border-radius: 4px;
  padding: 16px;
`;

const Title = styled.div<{ $disabled: boolean; $success: boolean; clickable: boolean }>`
  display: flex;
  font-family: ${(props) => props.theme.fonts.semibold};
  color: ${(props) =>
    props.$disabled ? props.theme.colors.neutral6 : props.theme.colors.neutral1};

  ${(props) =>
    props.$success &&
    `
        color: ${props.theme.colors.green1};
    `}
  ${(props) =>
    props.clickable &&
    `
    cursor: pointer;
  `}
`;

const Number = styled.div<{ $disabled: boolean; $success: boolean; $number: number }>`
  font-family: ${(props) => props.theme.fonts.medium};
  margin-right: 12px;
  font-size: 14px;
  width: 20px;
  height: 20px;
  color: ${(props) => props.theme.colors.neutral11};
  background-color: ${(props) =>
    props.$disabled ? props.theme.colors.neutral6 : props.theme.colors.neutral1};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  line-height: 20px;
  ${(props) =>
    props.$success &&
    `
        background-color: ${props.theme.colors.green1};
    `}

  ${(props) =>
    props.$number === 1 &&
    `
        padding-right: 1px;
    `}
    ${(props) =>
    props.$number === 2 &&
    `
        padding-right: 0px;
    `}
`;

type Props = {
  title: string;
  number: number;
  children: React.ReactNode;
  isOpen: boolean;
  success?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export default function Section({
  number,
  children,
  title,
  isOpen,
  success,
  style,
  onClick,
}: Props): JSX.Element {
  return (
    <Container style={style}>
      <Title $disabled={!isOpen} $success={success} onClick={onClick} clickable={Boolean(onClick)}>
        <Number $disabled={!isOpen} $success={success} $number={number}>
          {number}
        </Number>
        {title}
      </Title>
      {isOpen && children}
    </Container>
  );
}
