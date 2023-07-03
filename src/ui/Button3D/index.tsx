import styled from "styled-components";
import Loader from "../Loader";

const Main = styled.div<{ $isDisabled: boolean; $isSecondary: boolean }>`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 13px;
  background-color: ${({ theme }) => theme.colors.neutral11};
  border: ${({ $isSecondary }) => ($isSecondary ? "1px" : "3px")} solid
    ${({ theme }) => theme.colors.green2};
  border-radius: 10px;
  transition: all ${(props) => props.theme.animations.transition};
  height: 46px;

  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.medium};
  line-height: 22px;
  cursor: ${({ $isDisabled }) => ($isDisabled ? "default" : "pointer")};
`;

const Container = styled.button<{ $isSecondary }>`
  position: relative;
  color: #e9ebf6;
  background-color: transparent;
  border: none;

  &:hover ${Main} {
    transform: translate(
      ${({ $isSecondary }) => ($isSecondary ? "5px" : "4px")},
      ${({ $isSecondary }) => ($isSecondary ? "5px" : "4px")}
    );
  }

  &:disabled {
    opacity: 0.5;

    &:hover ${Main} {
      transform: none;
    }
  }
`;

const Underline = styled.div<{ $isSecondary: boolean }>`
  position: absolute;
  z-index: 0;
  top: ${({ $isSecondary }) => ($isSecondary ? "5px" : "4px")};
  left: ${({ $isSecondary }) => ($isSecondary ? "5px" : "4px")};
  width: 100%;
  height: 100%;
  background-color: ${({ theme, $isSecondary }) =>
    $isSecondary ? "transparent" : theme.colors.red};
  border: 1px solid
    ${({ theme, $isSecondary }) =>
      $isSecondary ? theme.colors.blueRYB : "transparent"};
  border-radius: 10px;
`;

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  style?: React.CSSProperties;
  className?: string;
  secondary?: boolean;
  onClick: () => void;
};

export default function Button({
  children,
  style,
  className,
  disabled,
  loading,
  secondary,
  onClick,
}: Props) {
  return (
    <Container
      $isSecondary={secondary}
      onClick={() => !disabled && !loading && onClick()}
      disabled={Boolean(disabled) || Boolean(loading)}
      style={style}
      className={className}
    >
      <Main
        $isDisabled={Boolean(disabled) || Boolean(loading)}
        $isSecondary={secondary}
      >
        {loading && <Loader size={18} />}
        {children}
      </Main>
      <Underline $isSecondary={secondary} />
    </Container>
  );
}
