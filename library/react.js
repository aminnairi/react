const React = {
  createElement(name, attributes = {}, ...children) {
    return {
      name,
      attributes: typeof attributes === "object" && attributes !== null ? attributes : {},
      children
    };
  }
};

export const Fragment = ({children}) => {
  return children;
};

export default React;
