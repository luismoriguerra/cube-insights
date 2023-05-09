import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "ui/styles.css";

import { getContributorsPeriodsDiff } from "insights-api";

function App() {
  // add a useEffect that calls the API
  useEffect(() => {
    getContributorsPeriodsDiff().then((data) => {
      console.log(data);
    });
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold underline bg-blue-300">Hello world!</h1>
      {/* <Button> first one</Button> */}
      {/* <hr /> */}
      {/* <Buttontw label={"buton tw"} /> */}
    </>
  );
}

export default App;
