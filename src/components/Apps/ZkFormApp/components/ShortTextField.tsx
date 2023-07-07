"use client";

import { ShortText } from "@/space-configs/types";
import TextInput from "@/src/ui/TextInput";
import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  font-family: ${(props) => props.theme.fonts.bold};
  color: ${(props) => props.theme.colors.neutral1};
  margin-bottom: 8px;
`;

type Props = {
  field: ShortText;
  onChange: (value) => void;
};

export default function ShortTextField({ field, onChange }: Props): JSX.Element {
  return (
    <Container>
      <Label>{field.label}</Label>
      <TextInput onChange={onChange} style={{ width: "100%" }} placeholder={field.placeholder} />
    </Container>
  );
}
