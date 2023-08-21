export enum Network {
  Test = "test",
  Local = "local",
  Goerli = "goerli",
  Sepolia = "sepolia",
  Mainnet = "mainnet",
  Gnosis = "gnosis",
  Polygon = "polygon",
  Mumbai = "mumbai",
  Optimism = "optimism",
  OptimismGoerli = "optimism-goerli",
  Arbitrum = "arbitrum",
  ArbitrumGoerli = "arbitrum-goerli",
  Base = "base",
  BaseGoerli = "base-goerli",
  ScrollTestnet = "scroll-testnet",
}

export const networkChainIds: { [network in Network]: number } = {
  [Network.Test]: 123456,
  [Network.Local]: 31337,
  [Network.Goerli]: 5,
  [Network.Sepolia]: 11155111,
  [Network.Mainnet]: 1,
  [Network.Gnosis]: 100,
  [Network.Polygon]: 137,
  [Network.Mumbai]: 80001,
  [Network.Optimism]: 10,
  [Network.OptimismGoerli]: 420,
  [Network.Arbitrum]: 42161,
  [Network.ArbitrumGoerli]: 421613,
  [Network.Base]: 8453,
  [Network.BaseGoerli]: 84531,
  [Network.ScrollTestnet]: 534353,
};

export const networkLabels: { [network in Network]?: string } = {
  [Network.Goerli]: "Goerli",
  [Network.Sepolia]: "Sepolia",
  [Network.Mainnet]: "Mainnet",
  [Network.Gnosis]: "Gnosis",
  [Network.Polygon]: "Polygon",
  [Network.Mumbai]: "Mumbai",
  [Network.Optimism]: "Optimism",
  [Network.OptimismGoerli]: "Optimism Goerli",
  [Network.Arbitrum]: "Arbitrum",
  [Network.ArbitrumGoerli]: "Arbitrum Goerli",
  [Network.Base]: "Base",
  [Network.BaseGoerli]: "Base Goerli",
  [Network.ScrollTestnet]: "Scroll Testnet",
};

export const networkRpcUrls: { [network in Network]?: string } = {
  [Network.Arbitrum]: "https://1rpc.io/arb",
  [Network.ArbitrumGoerli]: "https://rpc.goerli.arbitrum.gateway.fm",
  [Network.Base]: "https://mainnet.base.org",
  [Network.BaseGoerli]: "https://goerli.base.org",
  [Network.ScrollTestnet]: "https://alpha-rpc.scroll.io/l2",
};

export const explorers: { [network in Network]?: string } = {
  [Network.Mumbai]: "https://mumbai.polygonscan.com",
  [Network.Gnosis]: "https://gnosisscan.io",
  [Network.Sepolia]: "https://sepolia.etherscan.io",
  [Network.Polygon]: "https://polygonscan.com",
  [Network.Mainnet]: "https://etherscan.io",
  [Network.Goerli]: "https://goerli.etherscan.io",
  [Network.Optimism]: "https://optimistic.etherscan.io",
  [Network.OptimismGoerli]: "https://goerli-optimism.etherscan.io",
  [Network.Arbitrum]: "https://arbiscan.io",
  [Network.ArbitrumGoerli]: "https://goerli.arbiscan.io",
  [Network.Base]: "https://basescan.org/",
  [Network.BaseGoerli]: "https://goerli.basescan.org/",
};

export const getTxExplorer = ({ txHash, network }: { txHash: string; network: Network }) => {
  if (!explorers[network]) return null;
  return `${explorers[network]}/tx/${txHash}`;
};

export const getErc721Explorer = ({
  contractAddress,
  network,
  tokenId,
}: {
  contractAddress: string;
  network: Network;
  tokenId?: string;
}) => {
  switch (network) {
    case Network.ArbitrumGoerli:
    case Network.Goerli:
    case Network.Mumbai:
    case Network.OptimismGoerli:
    case Network.Sepolia:
    case Network.BaseGoerli:
      return `https://testnets.opensea.io/assets/${network}/${contractAddress}${
        tokenId ? "/" + tokenId : ""
      }`;
    case Network.Mainnet:
      return `https://opensea.io/assets/ethereum/${contractAddress}${tokenId ? "/" + tokenId : ""}`;
    case Network.Base:
    case Network.Optimism:
      return `https://opensea.io/assets/${network}/${contractAddress}${
        tokenId ? "/" + tokenId : ""
      }`;
    case Network.Arbitrum:
      return `https://opensea.io/assets/arbitrum/${contractAddress}${tokenId ? "/" + tokenId : ""}`;
    case Network.Polygon:
      return `https://opensea.io/assets/matic/${contractAddress}${tokenId ? "/" + tokenId : ""}`;
    case Network.Gnosis:
      if (tokenId) return `https://gnosisscan.io/nft/${contractAddress}/${tokenId}`;
      return `https://gnosisscan.io/token/${contractAddress}`;
    default:
      console.error("Unsupported network or no dedicated NFT explorer for this network.");
      return null;
  }
};

export const getErc1155Explorer = ({
  contractAddress,
  tokenId,
  network,
}: {
  contractAddress: string;
  tokenId: string;
  network: Network;
}) => {
  if (!explorers[network]) return null;
  return `${explorers[network]}/token/${contractAddress}?a=${tokenId}`;
};
