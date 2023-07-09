"use client";

import '@rainbow-me/rainbowkit/styles.css';
import { createConfig, configureChains } from 'wagmi'
import {  gnosis, polygonMumbai, sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { WagmiConfig } from "wagmi";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

const { chains, publicClient } = configureChains(
    [
      gnosis, 
      polygonMumbai, 
      sepolia
    ],
    [publicProvider()],
)

const { connectors } = getDefaultWallets({
    appName: "Sismo app-store",
    projectId: "a042cef969ee1fe381914133aa76b3d5",
    chains,
  });
   
  const config = createConfig({
    autoConnect: true,
    publicClient,
    connectors
  })

type Props = {
  children: React.ReactNode;
};

export default function AppProviders({ children }: Props): JSX.Element {

    return <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains} modalSize="compact">
          {children}
        </RainbowKitProvider>
    </WagmiConfig>
}
