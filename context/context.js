"use client";
import React, { createContext, useState, useContext } from "react";

const ToggleContext = createContext();

export const ToggleProvider = ({ children }) => {
  const [isShowChatbot, setIsShowChatbot] = useState(false);

  return (
    <ToggleContext.Provider value={{ isShowChatbot, setIsShowChatbot }}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggle = () => useContext(ToggleContext);
