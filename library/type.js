export const getType = input => Object.prototype.toString.call(input).replace("[object ", "").replace("]", "").trim().toLowerCase();

export const isFunctionalComponent = (input) => {
  return getType(input) === "object"
    && getType(input.name) === "function"
    && getType(input.attributes) === "object"
    && getType(input.children) === "array";
};

export const isVirtualElement = input => {
  return getType(input) === "object"
    && getType(input.name) === "string"
    && getType(input.attributes) === "object"
    && getType(input.children) === "array";
};
