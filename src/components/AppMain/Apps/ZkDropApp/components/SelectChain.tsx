import { Network, networkLabels } from "@/src/libs/contracts/networks";
import Select from "@/src/ui/Select";
import { styled } from "styled-components";

const Container = styled.div`
  width: 100%;
`;

type Props = {
  selectedChain: Network | null;
  chains: Network[];
  onChainSelected: (chain: Network) => void;
  style: React.CSSProperties;
};

export default function SelectChain({
  selectedChain,
  chains,
  onChainSelected,
  style,
}: Props): JSX.Element {
  return (
    <Container style={style}>
      <Select
        options={chains.map((chain) => ({
          value: chain,
          label: networkLabels[chain],
        }))}
        placeholder="Select a chain"
        value={selectedChain}
        onChange={(chain) => onChainSelected(chain as Network)}
      />
    </Container>
  );
}
