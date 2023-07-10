import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from "defender-relay-client/lib/ethers";
import { Network } from "./networks";
import { Signer } from "ethers";
import env from "@/src/environments";


export const getDefenderRelayerSigner = (network: Network): Signer => {
  if (!env.defenderAPIKeys) {
    throw new Error(
      "SH_RELAY_DEFENDER_API_KEYS env variables missing."
    );
  }

  const credentials = {
    apiKey: env.defenderAPIKeys[network]?.key,
    apiSecret: env.defenderAPIKeys[network]?.secret,
  };

  const provider = new DefenderRelayProvider(credentials);

  return new DefenderRelaySigner(
    credentials,
    provider,
    { speed: "fast" }
  );
};