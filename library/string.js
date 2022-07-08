export const isUpperCase = text => text === text.toUpperCase();

export const camelToKebabCase = text => {
  return [...text].map(character => {
    if (isUpperCase(character)) {
      return `-${character.toLowerCase()}`;
    }

    return character;
  }).join("");
};
