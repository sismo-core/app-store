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
    ArbitrumOne = "arbitrum-one",
    ArbitrumGoerli = "arbitrum-goerli",
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
    [Network.ArbitrumOne]: 42161,
    [Network.ArbitrumGoerli]: 421613,
    [Network.ScrollTestnet]: 534353
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
  [Network.ArbitrumOne]: "Arbitrum",
  [Network.ArbitrumGoerli]: "Arbitrum Goerli",
  [Network.ScrollTestnet]: "Scroll Testnet"
};

export const networkRpcUrls: { [network in Network]?: string } = {
    [Network.ArbitrumOne]: "https://1rpc.io/arb",
    [Network.ArbitrumGoerli]: "https://rpc.goerli.arbitrum.gateway.fm",
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
  [Network.ArbitrumOne]: "https://arbiscan.io",
  [Network.ArbitrumGoerli]: "https://goerli.arbiscan.io"
};

export const getTxExplorer = ({ txHash, network }: { txHash: string, network: Network }) => {
  if (!explorers[network]) return null;
  return `${explorers[network]}/tx/${txHash}`;
} 

export const getErc721Explorer = ({ contractAddress, network, tokenId }: { contractAddress: string, network: Network, tokenId?: string }) => {
  switch (network) {
      case Network.ArbitrumGoerli:
      case Network.Goerli:      
      case Network.Mumbai:
      case Network.OptimismGoerli:
      case Network.Sepolia:
          return `https://testnets.opensea.io/assets/${network}/${contractAddress}${tokenId ? "/" + tokenId : ""}`;
      case Network.Mainnet:
      case Network.Polygon:
      case Network.Optimism:
      case Network.ArbitrumOne:
          return `https://opensea.io/assets/${network}/${contractAddress}${tokenId ? "/" + tokenId : ""}`;
      case Network.Gnosis:
          if (tokenId)
            return `https://gnosisscan.io/nft/${contractAddress}/${tokenId}`
          return `https://gnosisscan.io/token/${contractAddress}`
      default:
          console.error('Unsupported network or no dedicated NFT explorer for this network.');
          return null;
  }
}

export const getErc1155Explorer = ({ contractAddress, tokenId, network }: { contractAddress:string, tokenId: string, network: Network }) => {
  if (!explorers[network]) return null;
  return `${explorers[network]}/token/${contractAddress}?a=${tokenId}`;
} 