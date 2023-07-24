`use client`;

import SynapsProofOfLivenessCustomApp from "./synaps-proof-of-liveness";
import WorldcoinProofOfPersonhoodCustomApp from "./wordlcoin-proof-of-personhood";

export const customApps = {
  worldcoin: {
    "proof-of-personhood": <WorldcoinProofOfPersonhoodCustomApp />,
  },
  synaps: {
    "proof-of-liveness": <SynapsProofOfLivenessCustomApp />,
  },
};
