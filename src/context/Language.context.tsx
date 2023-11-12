import { ReactNode, createContext, useContext, useMemo, useState } from "react";

// Type //
type LanguageContextType = {
  languages: string;
  setLanguages: React.Dispatch<React.SetStateAction<string>>;
};
type LanguageContextProviderProps = {
  children: ReactNode;
};

// Context //
const LanguagesContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function useContext_Languages() {
  const context = useContext(LanguagesContext);
  if (context === undefined) {
    throw new Error("useContext_Languages is not used within its provider");
  }
  return context;
}

export function LanguageContextProvider({
  children,
}: Readonly<LanguageContextProviderProps>) {
  const [languages, setLanguages] = useState<string>("en");

  const contextValue = useMemo(
    () => ({
      languages,
      setLanguages,
    }),
    [languages, setLanguages]
  );

  return (
    <LanguagesContext.Provider value={contextValue}>
      {children}
    </LanguagesContext.Provider>
  );
}
