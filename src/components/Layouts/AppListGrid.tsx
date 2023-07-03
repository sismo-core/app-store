import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
  row-gap: 64px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    row-gap: 46px;
  }`;

type Props = {
  children: React.ReactNode;
  className?: string;
}

export default function AppListGrid({children, className}: Props): JSX.Element {

  return (
    <Container className={className}>
      {children}
    </Container>
  );

}
