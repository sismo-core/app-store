import styled from "styled-components";

export const Container = styled.div`
color: ${({ theme }) => theme.colors.neutral1};
text-align: center;
font-size: 12px;
font-family: ${({ theme }) => theme.fonts.medium};
line-height: 18px;
border-radius: 20px;
border: 1px solid ${({ theme }) => theme.colors.neutral6};
padding: 3px 7px;
`;

type Props = {
  label: string;
}

export default function AppTag({label} : Props): JSX.Element {

  return (
    <Container>
      {label}
    </Container>
  );

}