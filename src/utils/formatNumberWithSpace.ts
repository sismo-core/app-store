export default function formatNumberWithSpace(x: number): string {
  if (typeof x !== "number") return "";
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
