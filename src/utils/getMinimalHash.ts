export const getMinimalHash = (hash: string) => {
  if (hash) {
    if (hash.length <= 20) return hash;

    const last = hash?.slice(-4);
    const start = hash?.slice(0, 6);
    return start + "..." + last;
  } else return "...";
};
