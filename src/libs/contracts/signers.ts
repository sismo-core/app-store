import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from "defender-relay-client/lib/ethers";
import { Network } from "./networks";
import { Signer } from "ethers";

type DefenderAPIKeys = {
  [network in Network]: {
    key: string,
    secret: string
  }
}

export const getDefenderRelayerSigner = (network: Network, defenderAPIKeys: DefenderAPIKeys): Signer => {
  if (!defenderAPIKeys) {
    throw new Error(
      "SH_RELAY_DEFENDER_API_KEYS env variables missing."
    );
  }

  const credentials = {
    apiKey: defenderAPIKeys[network]?.key,
    apiSecret: defenderAPIKeys[network]?.secret,
  };

  const provider = new DefenderRelayProvider(credentials);

  return new DefenderRelaySigner(
    credentials,
    provider,
    { speed: "fast" }
  );
};