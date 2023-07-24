import TextInputEthAccount from "@/src/ui/TextInputEthAccount";
import { styled } from "styled-components";

const Container = styled.div`
  width: 100%;
  margin-bottom: 32px;
`;

type Props = {
  onDestinationSelected: (destination: `0x${string}`) => void;
};

export default function SelectDestination({
  onDestinationSelected
}: Props): JSX.Element {
  return <Container>
    <TextInputEthAccount onEthAccount={(ethAccount) => onDestinationSelected(ethAccount.address)}/>
  </Container>;
}
