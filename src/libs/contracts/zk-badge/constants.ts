import env from "@/src/environments";
import { Network } from "../networks";
import zkBadge from "./abi.json";

export const ZK_BADGE_ADDRESSES: { [network in Network]?: `0x${string}` } = env.zkBadgeAddresses;

export const ZK_BADGE_ABI = zkBadge.abi;
