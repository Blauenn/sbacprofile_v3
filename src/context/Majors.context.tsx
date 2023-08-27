import { ReactNode, createContext, useContext, useMemo, useState } from "react";

// Type //
type MajorContextType = {
  majors: any[];
  setMajors: React.Dispatch<React.SetStateAction<any[]>>;
};
type MajorContextProviderProps = {
  children: ReactNode;
};

// Context //
const MajorsContext = createContext<MajorContextType | undefined>(undefined);

export function useContext_Majors() {
  const context = useContext(MajorsContext);
  if (context === undefined) {
    throw new Error("useContext_Majors is not used within its provider");
  }
  return context;
}

export function MajorContextProvider({ children }: MajorContextProviderProps) {
  const [majors, setMajors] = useState<any[]>([]);

  const contextValue = useMemo(
    () => ({
      majors,
      setMajors,
    }),
    [majors, setMajors]
  );

  return (
    <MajorsContext.Provider value={contextValue}>
      {children}
    </MajorsContext.Provider>
  );
}
