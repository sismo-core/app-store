import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from "defender-relay-client/lib/ethers";
import { Network } from "./networks";
import { Signer } from "ethers";

const SH_RELAY_DEFENDER_API_KEYS = process.env.SH_RELAY_DEFENDER_API_KEYS;

export const getDefenderRelayerSigner = (network: Network): Signer => {
  if (!SH_RELAY_DEFENDER_API_KEYS) {
    throw new Error(
      "SH_RELAY_DEFENDER_API_KEY or SH_RELAY_DEFENDER_API_SECRET env variables missing."
    );
  }
  const shRelayDefenderApiKeysJson = JSON.parse(SH_RELAY_DEFENDER_API_KEYS);

  const SH_RELAY_DEFENDER_API_KEY =
    shRelayDefenderApiKeysJson[`${network}`].key;

  const SH_RELAY_DEFENDER_API_SECRET =
    shRelayDefenderApiKeysJson[`${network}`].secret;

  const credentials = {
    apiKey: SH_RELAY_DEFENDER_API_KEY,
    apiSecret: SH_RELAY_DEFENDER_API_SECRET,
  };

  const provider = new DefenderRelayProvider(credentials);

  return new DefenderRelaySigner(
    credentials,
    provider,
    { speed: "fast" }
  );
};