import { useEffect, useState, useCallback, useMemo } from "react";
import { ethers } from "ethers";

const EnsCache = {};

export const getMinimalIdentifier = (identifier: string): string => {
  if (identifier) {
    if (identifier.length <= 20) return identifier;
    const start = identifier?.slice(0, 6);
    const last = identifier?.slice(-4);
    return start + "..." + last;
  } else return "...";
};

export const getExtraMinimalIdentifier = (identifier: string): string => {
  if (identifier) {
    if (identifier.length <= 20) return identifier;

    const last = identifier?.slice(-2);
    const start = identifier?.slice(0, 4);
    return start + "..." + last;
  } else return "...";
};

export const getMinimalEns = (ens: string): string => {
  if (ens) {
    if (ens.length <= 20) return ens;

    const last = ens?.slice(-11);
    const start = ens?.slice(0, 6);
    return start + "..." + last;
  }
  return "...";
};

export const useMainMinified = (address: string) => {
  const [main, setMain] = useState<string>(address);
  const [mainMinified, setMainMinified] = useState<string>(getMinimalIdentifier(address));
  const [mainExtraMinified, setMainExtraMinified] = useState<string>(
    getExtraMinimalIdentifier(address)
  );

  const mainnetProvider = useMemo(
    () => new ethers.providers.InfuraProvider(1, "6f9a75d029ce430794e3155621e2d620"),
    []
  );

  const getEns = useCallback(
    async (address: string) => {
      try {
        if (!mainnetProvider) return null;
        if (EnsCache[address]) {
          return EnsCache[address];
        }
        const name = await mainnetProvider.lookupAddress(address);
        let ens = null;
        if (name) {
          ens = name;
          EnsCache[address] = ens;
        }
        return ens;
      } catch (e) {
        return null;
      }
    },
    [mainnetProvider]
  );

  useEffect(() => {
    const resolveEns = async () => {
      const ens = await getEns(address);
      if (ens) {
        setMainMinified(getMinimalEns(ens));
        setMainExtraMinified(getMinimalEns(ens));
        setMain(ens);
      }
    };
    resolveEns();
  }, [address, getEns]);

  return {
    main, // ENS (if available) or address
    mainMinified, // minified ENS (if available) or minified address
    mainExtraMinified, // minified ENS (if available) or extra minified address
  };
};
