"use client";
import { createContext, useContext } from "react";

const TranslationContext = createContext({ dict: {}, locale: "fa" });

export const TranslationProvider = ({ dict, locale, children }) => {
  return (
    <TranslationContext.Provider value={{ dict, locale }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const { dict, locale } = useContext(TranslationContext);
  const t = (key) => dict[key] || key;
  return { t, locale };
};
