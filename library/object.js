import {camelToKebabCase} from "./string.js";

export const objectToStyleString = object => {
  return Object.entries(object).map(([cssPropertyName, cssPropertyValue]) => {
    return `${camelToKebabCase(cssPropertyName)}: ${cssPropertyValue}`;
  }).join(";");
};
