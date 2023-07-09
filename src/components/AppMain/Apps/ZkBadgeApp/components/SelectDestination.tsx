import TextInputEthAccount from "@/src/ui/TextInputEthAccount";
import { styled } from "styled-components";

const Container = styled.div`
  width: 100%;
  margin-bottom: 32px;
`;

const Label = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
  font-family: ${(props) => props.theme.fonts.bold};
`

type Props = {
  onDestinationSelected: (destination: `0x${string}`) => void;
};

export default function SelectDestination({
  onDestinationSelected
}: Props): JSX.Element {
  return <Container>
    <Label>
      Claim destination:
    </Label>
    <TextInputEthAccount onEthAccount={(ethAccount) => onDestinationSelected(ethAccount.address)}/>
  </Container>;
}
