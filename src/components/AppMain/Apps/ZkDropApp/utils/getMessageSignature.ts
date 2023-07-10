import { encodeAbiParameters } from "viem";

export const getMessageSignature = ({ destination }: {
  destination: `0x${string}`
  }) => {
    if (!destination) return "";

    return encodeAbiParameters(
      [{ type: "address", name: "destination" }],
      [destination as `0x${string}`]
    );
  };