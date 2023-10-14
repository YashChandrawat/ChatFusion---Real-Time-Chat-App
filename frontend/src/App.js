import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import { color, useColorMode } from "@chakra-ui/react";

function App() {
  const { colorMode } = useColorMode();

  return (
    <div className={colorMode === "light" ? "App" : "App3"}>
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} />
    </div>
  );
}

export default App;
