// ColorModeContext.js
import React, { createContext, useContext, useState } from "react";

const ColorModeContext = createContext();

export function useColorModeContext() {
  return useContext(ColorModeContext);
}

export function ColorModeProvider({ children }) {
  const [colorMode, setColorMode] = useState("light"); // Initialize with your default color mode

  const toggleColorMode = () => {
    setColorMode((prevColorMode) =>
      prevColorMode === "light" ? "dark" : "light"
    );
  };

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
}
