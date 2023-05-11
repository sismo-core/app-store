'use client'

import { ZkSubAppConfig } from "@/space-config/types";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ShortTextField from "./ShortTextField";

const Container = styled.div`

`

const Field = styled.div`
    margin-top: 24px;
`

export type FieldValue = {
    name: string,
    value: string
}

type Props = {
    app: ZkSubAppConfig;
    onFieldsComplete: (fields) => void
}

export default function Register({ app, onFieldsComplete }: Props): JSX.Element {
    const [fields, setFields] = useState<FieldValue[]>([]);

    useEffect(() => {
        for (let appField of app.fields) {
            const fieldAdded = fields.find(_field => _field.value && _field.name === appField.label)
            if (!fieldAdded) {
                onFieldsComplete(null);
                return;
            }
        }
        onFieldsComplete(fields);
    }, [fields])
    
    const updateField = (name: string, value: string) => {
        const _fields = [...fields];
        const index = _fields.findIndex(field => field.name === name);
        if (index !== -1) _fields.splice(index, 1);
        _fields.push({
            name,
            value
        });
        setFields(_fields);
    }

    return <Container>
        {
            app?.fields && app.fields.map(field => <Field key={field.label}>{
                field.type === "short-text" && <ShortTextField field={field} onChange={(value) => updateField(field.label, value)}/>
            }</Field>)
        }
    </Container>;
}