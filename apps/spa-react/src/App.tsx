import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";

import "ui/styles.css";
import { sum } from "lib";
import { Button, Buttontw } from "ui";

function App() {
  const [count, setCount] = useState(0);

  console.log(sum(1, 2));

  return (
    <>
      <h1 className="text-3xl font-bold underline bg-blue-300">Hello world!</h1>
      <Button> first one</Button>
      <hr />
      <Buttontw label={"buton tw"} />
    </>
  );
}

export default App;
