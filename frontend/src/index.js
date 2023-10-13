import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./Context/ChatProvider";
import { BrowserRouter } from "react-router-dom";
import { ColorModeProvider } from "./components/ColorModeContext";
import { SocketProvider } from "./Context/SocketProvider";
ReactDOM.render(
  <ChakraProvider>
    <ColorModeProvider>
      <BrowserRouter>
        <ChatProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </ChatProvider>
      </BrowserRouter>
    </ColorModeProvider>
  </ChakraProvider>,
  document.getElementById("root")
);
