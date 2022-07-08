import {objectToStyleString} from "./object.js";
import {getType, isVirtualElement, isFunctionalComponent} from "./type.js";

const ReactDOM = {
  createRoot(htmlElement) {
    return {
      render(virtualElement) {
        const virtualElementType = getType(virtualElement);

        if (!["array", "string", "object"].includes(virtualElementType)) {
          return;
        }

        if (virtualElementType === "string") {
          htmlElement.appendChild(document.createTextNode(virtualElement));

          return;
        }

        if (virtualElementType === "array") {
          virtualElement.forEach(child => {
            ReactDOM.createRoot(htmlElement).render(child);
          });

          return;
        }

        if (isFunctionalComponent(virtualElement)) {
          ReactDOM.createRoot(htmlElement).render(virtualElement.name({...virtualElement.attributes, children: virtualElement.children}));

          return;
        }

        if (!isVirtualElement(virtualElement)) {
          return;
        }

        const element = document.createElement(virtualElement.name);

        Object.entries(virtualElement.attributes).forEach(([attributeName, attributeValue]) => {
          if (attributeName === "style") {
            element.style = objectToStyleString(attributeValue);
            return;
          }

          if (attributeName.startsWith("on")) {
            element[attributeName.toLowerCase()] = attributeValue;
            return;
          }

          element[attributeName] = attributeValue;
        });

        virtualElement.children.forEach(child => {
          ReactDOM.createRoot(element).render(child);
        });

        htmlElement.appendChild(element);
      }
    };
  }
};

export default ReactDOM;
