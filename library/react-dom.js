import {objectToStyleString} from "./object.js";
import {getType, isVirtualElement, isFunctionalComponent} from "./type.js";

const ReactDOM = {
  createRoot(htmlElement) {
    return {
      render(virtualElement) {
        /**
         * Since we only support arrays, strings and objects (virtual elements
         * or functional components), we should probably skip anything else by
         * checking the type that we get before doing anything else... Wait
         * that is exactly what I did below, see I'm a genius.
         */
        const virtualElementType = getType(virtualElement);

        /**
         * I won't be repeating myself here because we do exactly what I did
         * meaning early returning when we do not encounter any string, array
         * or object so I'm going to fill this space with a funny story, the
         * other day I went offroad biking with friends and I was packing
         * everything for two days only to crash my bike and my feet got stuck
         * under and I didn't even ride 3 hours I was forced to go home early
         * with a broken feet and all of my camping stuff for nothing but I
         * managed to get back home.
         */
        if (!["array", "string", "object"].includes(virtualElementType)) {
          return;
        }

        /**
         * If we encounter a string, we want to make sure we add it to the DOM
         * as-is. Some people said that I could have been using the innerText
         * property to add the string directly, but that would have overridden
         * every other texts that would have been added earlier and we
         * probably don't want to do that this is why we want to add another
         * element, but we don't want to create a span with a text content
         * just for that hence this neat method for creating an element from a
         * string, thanks DOM API!
         */
        if (virtualElementType === "string") {
          htmlElement.appendChild(document.createTextNode(virtualElement));

          return;
        }

        /**
         * Okay, this one is pretty tough but I'll try my best to explain.
         * Since we can encounter an array as our virtual element, we want to
         * make sure that every item inside this array will be treated as a
         * virtual element. But then we will have a bunch of other stuff like
         * a string or a virtual element. So we have two choice. Either we
         * repeat ourselves meaning all of the logic for adding a string that
         * we wrote earlier will be put here but that would defeat the SOLID
         * principles, or we could use some functional programming goodies and
         * use a recursive call so that everytime we loop and get a value out
         * of our array, we can just say okay just do whatever I did in this
         * render method and this is awesome because this makes our code so
         * much terser than it would be if we would have written the logic of
         * handling a string but also a virtual element, twice!
         */
        if (virtualElementType === "array") {
          virtualElement.forEach(child => {
            ReactDOM.createRoot(htmlElement).render(child);
          });

          return;
        }

        /**
         * Alright, this one is weird, but this is because the JSX standard is
         * made this way. When we encounter a functional component, instead of
         * calling it like a function we can use it in our code like
         * <FunctionalComponent /> and this is neat, but when transpiling, it
         * gets turned into a virtual element, with the only difference that
         * instead of having a name that is a string, we get a name that is a
         * function, and the function is the functional component that we can
         * call just as usual with a JavaScript function. And we also get its
         * children and attributes if we need to so we feed it inside its
         * parameters. That's it!
         */
        if (isFunctionalComponent(virtualElement)) {
          ReactDOM.createRoot(htmlElement).render(virtualElement.name({...virtualElement.attributes, children: virtualElement.children}));

          return;
        }

        /**
         * After handling strings, arrays, functional component, the only thing
         * left for us is a virtual element, right? Right?? Well, not really.
         * It can also be a POJO (Plain Old Javascript Object). And those are
         * not the thing we want to handle since it can break our code since
         * JavaScript hasn't been made to handle types in the first place like
         * another language like Elm and thus we have to check this case and
         * account for it at runtime unfortunately otherwise we risk having
         * our whole application crashing instead of silently failing.
         */
        if (!isVirtualElement(virtualElement)) {
          return;
        }

        /**
         * When dealing with virtual elements, we need to use the Web API DOM
         * to create its counterpart equivalent since the render method is what
         * makes dreams come true. The createElement method accepts a string
         * that matches the html element we wan to create. For instance, if I
         * write something like <small>pp</small>, I'll get something like
         * "small" for the virtual element name property and that is awesome
         * because we can use it to create an html element.
         */
        const element = document.createElement(virtualElement.name);

        /**
         * JSX attributes gets rendered into an object that matches all of the
         * attributes in the form of properties and values. Since we need to
         * add the corresponding DOM properties to their element, we need a
         * way to loop through this attributes' object. We could have used our
         * good'ol for in loop, but I heard this one is pretty slow, plus I
         * like functional programming and React is also all about functions
         * so why not use a functional way of looping through this object? If
         * we find an imperative way of doing this though, it would probably
         * be better in the future since we could potentially loose some
         * precious performance boost by copying the object into an array in
         * memory. But JavaScript has never been meant to be a performant
         * language so it is probably better to let the folks enhance the
         * JavaScript engine instead of trying to do things like in C or Rust.
         * And if we really want to get some performance boost, we should
         * probably be using WebAssembly for that type of algorithm.
         */
        Object.entries(virtualElement.attributes).forEach(([attributeName, attributeValue]) => {
          /**
           * If we encounter a style property, we don't want to add its value
           * directly to its corresponding DOM property! Because it might be an
           * object since we want to support the exact same React API so we
           * need to add an extra-step that will turn the object into a string
           * that ressembles the style property we all have been writing at
           * least once in our life because we were so lazy to create an
           * external stylesheet just to center a text. Don't be that guy I
           * know you did you filthy animal...
           */
          if (attributeName === "style") {
            element.style = objectToStyleString(attributeValue);
            return;
          }

          /**
           * Well, since our React is 100x better that the one from the folks
           * at Meta, and since we accepted to matche the exact same API as
           * theirs, we simply turn their synthetic event name into the real
           * DOM event names. Why not add an event listener? Well, because we
           * don't need to. Those elements have only one event listener for
           * each and every one of their corresponding event. If you really
           * want to simulate having multiple handlers for the same event, you
           * should compose functions just like in functional programming.
           * See? Functional programming again! No need for those non-sense
           * oriented-object shenanigans...
           */
          if (attributeName.startsWith("on")) {
            element[attributeName.toLowerCase()] = attributeValue;
            return;
          }

          /**
           * After handling events and styles, we can finally add our attribute
           * value to the corresponding DOM attribute. This will fail for SVG
           * elements because SVG elements have the brillant idea to have
           * their property name separated by dashes. So this will be
           * something like "font-family". So you can write SVG properties in
           * JSX with a dash, but it would have been great to write them using
           * camelCase as well and you might say, we already did it! We can use
           * the same algorithm as we were using in the objectToStyleString
           * with the camelToKebabCase function! And you will be wrong because
           * if you try to camelCase back a kebab-cased SVG properties, it
           * won't work. That's it, this is the SVG standard. Thanks guys!
           */
          element[attributeName] = attributeValue;
        });

        /**
         * If the JSX element has children (strings, arrays, other virtual
         * elements) again we don't want to copy/pasta everything that we just
         * wrote earlier, so recursion for the rescue! Recursion is actually
         * pretty simple: it is a function that can call itself. But since
         * calling itself can cause it to call itself again, it might end up
         * in an infinite loop. This is why we have a bunch of if statements
         * so that the recursion only occurs in a specific case. Fun fact,
         * recursion is the only way to loop through an array for instance
         * since looping using a for-loop is considered a side-effect and
         * side-effects are not permitted in a true-functional language like
         * Haskell or Elm.
         */
        virtualElement.children.forEach(child => {
          ReactDOM.createRoot(element).render(child);
        });

        /**
         * Finally, when we made everything to turn a string, array functional
         * component or virtual element into a DOM element, we need to attach
         * it to its parent element. Here, the parent element is the one that
         * we specified in the call for our createRoot method. And when this
         * virtual element has children, it becomes the parent to its
         * children, because dads don't leave their children, they stay until
         * they are adults and JSX children are still children after all we
         * need to keep them safe okay? We need to protect our children!
         */
        htmlElement.appendChild(element);
      }
    };
  }
};

export default ReactDOM;
