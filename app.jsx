import React, {Fragment} from "./library/react.js";
import {Header} from "./components/header.jsx";
import {Main} from "./components/main.jsx";
import {Footer} from "./components/footer.jsx";
import {Copyright} from "./components/copyright.jsx";

export const App = () => {
  const handleClick = () => {
    alert("Hello, world!");
  };

  const fruits = [
    "banana",
    "apple",
    "pear"
  ];

  return (
    <Fragment>
      <Header>
        <h1 className="text-center" style={{color: "lightgrey", fontFamily: "sans-serif"}}>Hello, world!</h1>
      </Header>
      <Main>
        <button onClick={handleClick}>Greetings</button>
      </Main>
      <Footer>
        <ul>
          {fruits.map(fruit => <li>{fruit}</li>)}
        </ul>
        {Math.random() > 0.5 ? <Copyright /> : null}
      </Footer>
    </Fragment>
  );
};
