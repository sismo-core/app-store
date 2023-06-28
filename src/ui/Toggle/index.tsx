import styled from "styled-components";

const Main = styled.div<{ $isDisabled: boolean, $isPrimary: boolean }>`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 4px;
  background-color: ${(props) => props.theme.colors.neutral11};
  border: 1px solid ${({$isPrimary, theme}) => $isPrimary ? theme.colors.green2 : theme.colors.red};
  border-radius: 30px;
  transition: all ${(props) => props.theme.animations.transition};
  cursor: pointer;
  user-select: none;
`;

const Container = styled.div`
  position: relative;
  color: #e9ebf6;
  font-family: inherit;
  font-weight: 500;
  font-size: 20px;
  line-height: 22px;
  background-color: transparent;
  border: none;
`;

const Underline = styled.div<{$isPrimary: boolean}>`
  position: absolute;
  z-index: 0;
  top: 5px;
  left: 5px;
  width: 100%;
  height: 100%;
  border: 1px solid ${({$isPrimary, theme}) => $isPrimary ? theme.colors.red : theme.colors.green2};
  border-radius: 30px;
  transition: all ${(props) => props.theme.animations.transition};
`;

const Item = styled.div<{ $isSelected: boolean }>`
  position: relative;
  display: flex;
  width: 80px;
  padding: 4px 0px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 40px;

  color: ${(props) =>
    props.$isSelected
      ? props.theme.colors.neutral11
      : props.theme.colors.neutral1};
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.medium};
  line-height: 22px;
  z-index: 2;
  transition: all ${(props) => props.theme.animations.transition};
`;

const Cartridge = styled.div<{ $selectedIndex: number }>`
  position: absolute;
  top: 4px;
  left: 4px;
  width: 80px;
  height: 30px;
  border-radius: 40px;
  background: ${({ $selectedIndex, theme }) =>
    $selectedIndex > 0 ? theme.colors.red : theme.colors.green2};
  transform: ${({ $selectedIndex }) =>
    `translateX(calc(${$selectedIndex * 100}% + ${$selectedIndex * 2}px))`};
    transition: all ${(props) => props.theme.animations.transition};
  z-index: 1;
`;

export type ToggleOption = {
  label: string;
  value: string;
};

type Props = {
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  options: ToggleOption[];
  selected: string;
  onChange: (value: string) => void;
};

export default function Toggle({
  style,
  className,
  disabled,
  onChange,
  options,
  selected,
}: Props) {
  const isPrimary = selected === options[0].value;

  return (
    <Container style={style} className={className}>
      <Main $isDisabled={Boolean(disabled)} $isPrimary={isPrimary} >
        {options.map((option) => (
          <Item
            key={option.value}
            $isSelected={option.value === selected}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </Item>
        ))}
        <Cartridge
          $selectedIndex={options.findIndex(
            (option) => option.value === selected
          )}
        />
      </Main>
      <Underline $isPrimary={isPrimary}/>
    </Container>
  );
}
