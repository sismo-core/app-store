'use client'

// import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Input = styled.input<{ small }>`
  border: none;
  border-radius: 5px;
  height: 40px;
  padding: 2px 10px 0px 20px;
  width: calc(100% - 30px);
  position: relative;
  font-family: ${(props) => props.theme.fonts.medium};

  ${(props) =>
    props.small &&
    `
    height: 25px;
  `}

  font-size: 14px;
  color: #13203d;
  background-color: white;

  :focus {
    outline: none;
  }
  ::placeholder {
    color: #13203d;
    font-style: italic;
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
  // const [isFocus, setIsFocus] = useState(false);
  // const ref = useRef();

  // useEffect(() => {
  //   if (!ref.current) return;
  //   if (document.activeElement === ref.current) {
  //     setIsFocus(true);
  //   } else {
  //     setIsFocus(false);
  //   }
  // }, []);

  return (
    <Container>
      <Input
        // ref={ref}
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
