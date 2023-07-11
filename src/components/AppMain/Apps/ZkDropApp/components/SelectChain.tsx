import { Network, networkLabels } from "@/src/libs/contracts/networks";
import Select from "@/src/ui/Select";
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
  selectedChain: Network | null;
  chains: Network[];
  onChainSelected: (chain: Network) => void;
};

export default function SelectChain({
    selectedChain,
    chains,
    onChainSelected
}: Props): JSX.Element {

  return <Container>
    <Label>
      Chain:
    </Label>
    <Select
      options={chains.map(chain => ({ 
        value: chain,
        label: networkLabels[chain]
      }))}
      placeholder="Select your chain"
      value={selectedChain}
      onChange={(chain) => onChainSelected(chain as Network)}
    />
  </Container>;
}
