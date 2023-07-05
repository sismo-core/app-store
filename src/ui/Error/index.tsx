import { type } from "os";
import styled from "styled-components";

const Container = styled.div`
  flex-grow: 1;
  align-self: stretch;
  width: 100%;
  display: flex;
  padding: 12px 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  min-height: 46px;
  border: 1px solid ${(props) => props.theme.colors.red};
  background: rgba(238, 82, 110, 0.1);
  color: ${(props) => props.theme.colors.neutral1};
  text-align: center;
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.regular};
  line-height: 22px;
`;

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

export default function Error({ children, style, className }: Props) {
  return (
    <Container style={style} className={className}>
      {children}
    </Container>
  );
}
