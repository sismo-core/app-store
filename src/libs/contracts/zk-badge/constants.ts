import { Network } from "../networks";
import zkBadge from "./abi.json";

export const ZK_BADGE_ADDRESSES = {
    [Network.Mumbai]: "0x748A728f35B364C98E06143602000070ECeC4E2f",
    [Network.Sepolia]: "0x908E56d719EB3deA6F5A6371131Cb9eb43F13A46"
}

export const ZK_BADGE_ABI = zkBadge.abi