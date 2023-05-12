
"use client";
import styled from "styled-components";
import PageContainer from "../components/Layouts/PageContainer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 60vh;
  font-family: ${props => props.theme.fonts.medium};
`

export default function NotFound() {
  return (
    <PageContainer>
    <Container>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
    </Container>
    </PageContainer>
  );
}