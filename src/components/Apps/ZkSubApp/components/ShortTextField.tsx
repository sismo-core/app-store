'use client'

import { ShortText } from "@/space-config/types";
import TextInput from "@/src/ui/TextInput";
import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const Label = styled.div`
    
`

type Props = {
    field: ShortText;
    onChange: (value) => void
}

export default function ShortTextField({ field, onChange }: Props): JSX.Element {

    return <Container>
        <Label>
            {field.label}
        </Label>
        <TextInput onChange={onChange}/>
    </Container>;
}