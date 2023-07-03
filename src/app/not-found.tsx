
"use client";
import styled from "styled-components";
import PageContainer from "../components/Layouts/PageContainer";
import { useRouter } from "next/navigation";
import Button3D from "../ui/Button3D";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 70vh;
  font-family: ${props => props.theme.fonts.medium};
`

export default function NotFound() {
  const router = useRouter();

  return (
    <PageContainer>
    <Container>
      <h1>Not Found</h1>
      <p>Could not find the requested resource</p>
      <Button3D onClick={() => router.push("/")} style={{marginTop: 32}} >Go back home</Button3D> 
    </Container>
    </PageContainer>
  );
}