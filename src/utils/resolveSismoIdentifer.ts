import { AuthType } from "@sismo-core/sismo-connect-server";

const startsWithHexadecimal = (str) => {
  let hexRegex = /^0x[0-9a-fA-F]{6}/;
  return hexRegex.test(str);
};

export const resolveSismoIdentifier = (sismoIdentifier: string, authType: AuthType) => {
  if (authType === AuthType.EVM_ACCOUNT || authType === AuthType.VAULT) return sismoIdentifier;
  if (!startsWithHexadecimal(sismoIdentifier)) return sismoIdentifier;

  const removeLeadingZeros = (str) => {
    let arr = str.split("");
    while (arr.length > 1 && arr[0] === "0") {
      arr.shift();
    }
    return arr.join("");
  };

  sismoIdentifier = sismoIdentifier.substring(6);
  sismoIdentifier = removeLeadingZeros(sismoIdentifier);
  return sismoIdentifier;
};
