'use client'

import styled from "styled-components";

const Input = styled.input<{ small }>`
  border: none;
  outline: none;
  height: 36px;
  border-radius: 5px;
  padding: 0px 10px;
  background-color: ${props => props.theme.colors.neutral8};

  font-family: ${props => props.theme.fonts.medium};
  font-size: 14px;
  color: ${props => props.theme.colors.neutral1};

  ::placeholder {
    color: ${props => props.theme.colors.neutral5};
  }
`;

const Container = styled.div`
  position: relative;
`;

const Edit = styled.div`
  position: absolute;
  top: 12px;
  right: 10px;
`;

type TextInputInfoMessageType = "info" | "error" | "success";

export type TextInputInfoMessage = {
  type: TextInputInfoMessageType;
  text: string;
};

type TextInputProps = {
  onChange?: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  password?: boolean;
  value?: string;
  style?: React.CSSProperties;
  small?: boolean;
  maxLength?: number;
};

export default function TextInput({
  onChange,
  onBlur,
  placeholder,
  password,
  style,
  value,
  small,
  maxLength,
}: TextInputProps): JSX.Element {

  return (
    <Container>
      <Input
        type={password ? "password" : ""}
        onChange={(e) => onChange && onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        style={style}
        value={value}
        small={small}
        maxLength={maxLength}
      />
    </Container>
  );
}
