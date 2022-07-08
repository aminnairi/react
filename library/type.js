/**
 * Since there is no reliable way in the built-in functions that are exposed
 * through the JavaScript language to know if something is really something, we
 * have to write our own function. Try to get the typeof null, and then
 * compare the result with the typeof {} and you'll see that both are returned
 * as objects! This is a weird bug that has been for a while since the
 * beginning of the JavaScript language and since it would be a huge breaking
 * change accross all of the applications that have every been written in
 * JavaScript since 1995, this is something that has been part of the standard
 * since. Fortunately, it is possible to have the inner representation of
 * anything in JavaScript using the Object.prototype.toString method by
 * calling it with another context (the input that we want to check). Easy,
 * right? :') #iwantokillmyself
 */
export const getType = input => Object.prototype.toString.call(input).replace("[object ", "").replace("]", "").trim().toLowerCase();

/**
 * A functional component is a function that will eventually return some JSX
 * code. So it has everything that a virtual element created in JSX has, except
 * that it's virtual element's name is a function that is a reference to
 * itself. This is how JSX do to differentiate functional components and JSX
 * elements because otherwise we would not be able to. Now you may ask why not
 * just render them as both virtual element directly, wouldn't it be simpler?
 * Well, in fact, these are functions! If you execute the function directly,
 * you get it's returned value, but also all of the side-effects that have
 * been called (an HTTP call, a filesystem write, etc...). If this component
 * were to be conditionnaly rendered, you wouldn't want it to be rendered if
 * your user is disconnected for instance, right? Well if they are executed
 * and rendered as virtual element directly, this would be a cause of many
 * bugs in many applications! Remember that you can conditionnaly render
 * elements as well as functional components. This is an expected behavior,
 * but is not simple to understand at first.
 */
export const isFunctionalComponent = (input) => {
  return getType(input) === "object"
    && getType(input.name) === "function"
    && getType(input.attributes) === "object"
    && getType(input.children) === "array";
};

/**
 * A virtual element is just the representation of a JSX element that has been
 * transpiled by the JSX transpiler. Thanks! It has some properties that help
 * us quickly write DOM elements as if they were HTML strings. This prevents
 * the need to use the DOM API directly, since the latter can be quite verbose
 * and hard to understand and use. HTML is in fact one of the best way to
 * represent graphically what can be seen in a screen, no other combinations
 * of tools offers the simplicity yet the power of HTML to render graphical
 * interfaces and this is also used in many other fields like XML in Android,
 * HTMl in Gnome Apps and every other tools that do not use HTML or XML are
 * often quite hard to use in practice.
 */
export const isVirtualElement = input => {
  return getType(input) === "object"
    && getType(input.name) === "string"
    && getType(input.attributes) === "object"
    && getType(input.children) === "array";
};
