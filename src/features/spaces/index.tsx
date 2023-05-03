'use client';

import Button from "@/src/components/Button";
import { getSpaces } from "@/src/libs/spaces";
import React, { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`

`;

export default function Space(): JSX.Element {

  useEffect(() => {
    const test = async () => {
      const spaces = await getSpaces();
      console.log("spaces", spaces);
    }
    test();
  }, []);

  return (
    <Container>
      This is a space
      <Button>
        Test button
      </Button>
    </Container>
  );
}
