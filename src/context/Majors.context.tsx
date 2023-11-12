import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { getData } from "../functions/fetchFromAPI.function";
import { API_ENDPOINT } from "../constants/ENDPOINTS";

// Type //
type MajorContextType = {
  majors: any[];
  setMajors: React.Dispatch<React.SetStateAction<any[]>>;
  fetchMajors: () => void;
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

export function MajorContextProvider({
  children,
}: Readonly<MajorContextProviderProps>) {
  const [majors, setMajors] = useState<any[]>([]);

  const fetchMajors = () => {
    getData(`${API_ENDPOINT}/api/v1/major/getAll`, (result: any) => {
      setMajors(result);
    });
  };

  const contextValue = useMemo(
    () => ({
      majors,
      setMajors,
      fetchMajors,
    }),
    [majors, setMajors]
  );

  return (
    <MajorsContext.Provider value={contextValue}>
      {children}
    </MajorsContext.Provider>
  );
}
