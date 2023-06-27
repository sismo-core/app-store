import styled from "styled-components";
import Loader from "../Loader";

const Main = styled.div<{ $isDisabled: boolean }>`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 13px;
  background-color: ${({ theme }) => theme.colors.neutral11};
  border: 3px solid ${({ theme }) => theme.colors.green2};
  border-radius: 10px;
  transition: all ${(props) => props.theme.animations.transition};
  height: 46px;

  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.medium};
  line-height: 22px;
  cursor: ${({ $isDisabled }) => ($isDisabled ? "default" : "pointer")};
`;

const Container = styled.button`
  position: relative;
  color: #e9ebf6;
  background-color: transparent;
  border: none;

  &:hover ${Main} {
    transform: translate(4px, 4px);
  }

  &:disabled {
    opacity: 0.5;

    &:hover ${Main} {
      transform: none;
    }
  }
`;

const Underline = styled.div`
  position: absolute;
  z-index: 0;
  top: 4px;
  left: 4px;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.red};
  border-radius: 10px;
`;

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onClick: () => void;
};

export default function Button({
  children,
  style,
  className,
  disabled,
  isLoading,
  onClick,
}: Props) {
  return (
    <Container
      onClick={() => !disabled && onClick()}
      disabled={disabled}
      style={style}
      className={className}
    >
      <Main $isDisabled={Boolean(disabled) || Boolean(isLoading)}>
        {isLoading && <Loader size={18} />}
        {children}
      </Main>
      <Underline />
    </Container>
  );
}
