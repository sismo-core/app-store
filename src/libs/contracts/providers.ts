import { ethers } from "ethers";
import { Provider } from "@ethersproject/abstract-provider";
import { Network } from "./networks";

const providers = new Map();

export const getProvider = (network: Network): Provider => {
    if (providers.has(network)) return providers.get(network);

    let _provider = null;
    switch (network) {
        case Network.Mumbai:
            _provider = new ethers.providers.JsonRpcProvider(
              "https://matic-mumbai.chainstacklabs.com",
              80001
            );
            providers.set(network, _provider);
            return _provider;
        case Network.Gnosis:
            _provider = new ethers.providers.JsonRpcProvider(
              "https://rpc.gnosis.gateway.fm",
              100
            );
            providers.set(network, _provider);
            return _provider;
    }
};