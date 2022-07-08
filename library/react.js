const React = {
  createElement(name, attributes = {}, ...children) {
    /**
     * Why do we return an object you might say? Well, this is our virtual DOM
     * representation. That's it. An object. Plain old JavaScript object. And
     * objects are awesome at representing a tree of element, just like the
     * DOM.
     */
    return {
      /**
       * The name here matches the name of the tag that we write in JSX. For
       * instance, if we were to use the <span>Amogus</span> tag, its name
       * would be turned into a string by the JSX transpiler and would be equal
       * to "span". This will help us create its corresponding DOM element later
       * when rendered using the render method.
       */
      name,

      /**
       * This is were you can specify what to do with your attributes. Since we
       * want an object that represent every attributes, and since the JSX
       * transpiler will turn something like <span level={100} owner="John">Geodude</span>
       * into attributes like {level: 100, owner: "John"}, this is perfect! We
       * will then be able to loop through it when attaching every attributes
       * here to its corresponding DOM element.
       */
      attributes: typeof attributes === "object" && attributes !== null ? attributes : {},

      /**
       * Childrens are everything that a JSX tag can accept as content. It
       * might be a string like <span>Arch BTW</span> or some other JSX
       * elements like <ul><li>Bread</li></ul> where the <li>Bread</li> would be
       * the children or even more elements just like in HTML! Since we want to
       * render the whole tree, we have to account for the case where there can
       * be children. But if we don't have children, this property will be
       * equivalent to an empty array, but our algorithm will still works as
       * expected in the render method!
       */
      children
    };
  }
};

/**
 * A Fragment component is just a component that renders to nothing, and thus
 * returning the children directly is the most obvious way of saying that this
 * element is not rendered in our DOM, but its children are. This is very
 * useful because the JSX standards does not accept multiple root elements, it
 * needs to find at most one root elements, and then we can have multiple
 * children. This is only true for the root element (the first parent of our
 * JSX code), you can have multiple children when you go deep the tree!
 */
export const Fragment = ({children}) => {
  return children;
};

export default React;
