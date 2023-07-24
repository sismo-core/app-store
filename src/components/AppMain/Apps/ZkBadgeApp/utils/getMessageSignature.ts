import { encodeAbiParameters } from "viem";

export const getMessageSignature = ({ destination, tokenId }: {
  destination: `0x${string}`, tokenId: string
  }) => {
    if (!destination || !tokenId) return "";

    return encodeAbiParameters(
      [{ type: "address", name: "destination" }, { type: "uint256", name: "tokenId" }],
      [destination as `0x${string}`, BigInt(tokenId)]
    );
  };