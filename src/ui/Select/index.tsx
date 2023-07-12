import useOnClickOutside from "@/src/utils/useClickOutside";
import { CaretDown } from "phosphor-react";
import { useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div<{ $isDisabled: boolean }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  width: 184px;
  gap: 10px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.neutral7};
  color: inherit;
  flex-shrink: 0;

  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.medium};
  line-height: 20px;
  cursor: ${({ $isDisabled }) => ($isDisabled ? "default" : "pointer")};

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Dropdown = styled.div`
  display: flex;
  width: 184px;
  padding: 6px 0px;
  flex-direction: column;
  align-items: flex-start;

  position: absolute;
  left: -1px;
  top: calc(36px + 5px);

  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.neutral7};
  background: ${({ theme }) => theme.colors.neutral11};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

  z-index: 1;

  @media (max-width: 900px) {
    width: calc(100% + 2px);
  }
`;

const Item = styled.div`
  padding: 8px 14px;
  width: 100%;
`;

const StyledCaret = styled(CaretDown)<{ $isOpen: boolean }>`
  transform: rotateX(${({ $isOpen }) => ($isOpen ? "180deg" : "0deg")});
  transition: transform ${({ theme }) => theme.animations.transition};
`;

const Placeholder = styled.div`
  color: ${(props) => props.theme.colors.neutral5};
`;

export type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function Select({ value, placeholder, options, onChange }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const label = options.find((option) => option.value === value)?.label;
  useOnClickOutside(ref, () => setIsOpen(false));

  const isDisabled = Boolean(options?.length === 0);

  return (
    <Container ref={ref} onClick={() => !isDisabled && setIsOpen(!isOpen)} $isDisabled={isDisabled}>
      {label ? label : <Placeholder>{placeholder}</Placeholder>}
      {!isDisabled && <StyledCaret $isOpen={isOpen} size={20} />}
      {isOpen && (
        <Dropdown>
          {options.map((option) => (
            <Item key={option.value} onClick={() => onChange(option.value)}>
              {option.label}
            </Item>
          ))}
        </Dropdown>
      )}
    </Container>
  );
}
