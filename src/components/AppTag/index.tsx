import styled from "styled-components";

export const Container = styled.div`
color: inherit;
display: flex;
align-items: center;
justify-content: center;
gap: 4px;
text-align: center;
font-size: 12px;
font-family: ${({ theme }) => theme.fonts.medium};
line-height: 18px;
border-radius: 20px;
border: 1px solid ${({ theme }) => theme.colors.neutral6};
padding: 3px 7px;
`;

type Props = {
  children: React.ReactNode;
}

export default function AppTag({children} : Props): JSX.Element {

  return (
    <Container>
      {children}
    </Container>
  );

}