import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import About from "../src/components/About/About.js";
import { color, useColorMode } from "@chakra-ui/react";

function App() {
  const { colorMode } = useColorMode();

  return (
    <div className={colorMode === "light" ? "App App2" : "App App3"}>
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} />
      <Route path={"/about"} component={About} />
    </div>
  );
}

export default App;
