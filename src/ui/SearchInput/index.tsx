import styled from "styled-components";
import { MagnifyingGlass, X } from "phosphor-react";

const Container = styled.div`
  position: relative;
  width: 100%;

`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.neutral7};

  border: 1px solid ${({ theme }) => theme.colors.neutral7};
padding: 7px 12px 7px 44px;

  color: inherit;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.medium};
  line-height: 20px;


    background: transparent;

  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.neutral4};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral7};
    /* Body/14/Medium */
    font-size: 14px;
    font-family: ${({ theme }) => theme.fonts.medium};
    line-height: 20px;
  }
`;

const StyledSearch = styled(MagnifyingGlass)`
position: absolute;
left: 12px;
top: calc(50% - 10px);
`;

const StyledX = styled(X)`
position: absolute;
right: 12px;
top: calc(50% - 10px);
cursor: pointer;
transition: transform ${({ theme }) => theme.animations.transition};

&:active {
  transform: scale(0.9);
}
`;

type Props = {
  onChange?: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  value?: string;
  style?: React.CSSProperties;
  className?: string;
};

export default function SearchInput({
  onChange,
  onBlur,
  placeholder,
  value,
  style,
  className,
}: Props): JSX.Element {
  return (
    <Container className={className}>
      <StyledSearch size={20} weight="bold" />
      {value && <StyledX size={20} weight="bold" onClick={(e) => onChange && onChange("")}/>}
      <Input
        onChange={(e) => onChange && onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        style={style}
        value={value}
      />
    </Container>
  );
}
