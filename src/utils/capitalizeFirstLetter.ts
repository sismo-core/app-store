export default function capitalizeFirstLetter(input: string) {
  if (!input) return "";
  return input.charAt(0).toUpperCase() + input.slice(1);
}
