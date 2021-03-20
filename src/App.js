//router
import { Route } from "react-router-dom";
import React from "react";

//components and pages
import Home from "./pages/Home";
import GlobalStyles from "./components/GlobalStyles";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Home />
    </div>
  );
}

export default App;
