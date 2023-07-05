`use client`

import SynapsProofOfLivenessCustomApp from "./synaps/proof-of-liveness"
import WorldcoinProofOfPersonhoodCustomApp from "./worldcoin/proof-of-personhood"


export const zkCustomApps = {
    "worldcoin": {
        "proof-of-personhood": <WorldcoinProofOfPersonhoodCustomApp />,
    },
    "synaps": {
        "proof-of-liveness": <SynapsProofOfLivenessCustomApp />
    }
}