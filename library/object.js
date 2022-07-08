import {camelToKebabCase} from "./string.js";

/**
 * This will turn an object like <span style={{color: "red", fontFamily: "sans-serif"}}>Hello</span>
 * into something like [["color", "red"], ["font-family", "sans-serif"]] so
 * that we can then turn each one of these entries to "property: value" and
 * since this is an array we can join them all separating them by a ";"
 * character and note that the camelCase version of "fontFamily" is turned into
 * a kebab-case version "font-family" because we want to ease the writing of
 * styles, at least that's what I would say if I worked for Meta but I'm not so
 * I'm not earning 150k/year and I wouldn't be able to brag about it on Twitter
 * because I deleted all of my social medias.
 */
export const objectToStyleString = object => {
  return Object.entries(object).map(([cssPropertyName, cssPropertyValue]) => {
    return `${camelToKebabCase(cssPropertyName)}: ${cssPropertyValue}`;
  }).join(";");
};
