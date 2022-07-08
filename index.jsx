import React from "./library/react.js";
import ReactDOM from "./library/react-dom.js";
import {App} from "./app.jsx";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
