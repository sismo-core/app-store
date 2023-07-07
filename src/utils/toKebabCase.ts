export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2") // get all camelCased
    .replace(/[\s_]+/g, "-") // replace spaces and underscore with hyphens
    .toLowerCase(); // convert to lower case
}
