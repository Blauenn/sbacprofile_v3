import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { API_ENDPOINT } from "../constants/ENDPOINTS";
import { getData } from "../functions/fetchFromAPI.function";

// Type //
type RequestFormsContextType = {
  requestForms: any[];
  setRequestForms: React.Dispatch<React.SetStateAction<any[]>>;
  fetchRequestForms: () => void;
};
type RequestFormsContextProviderProps = {
  children: ReactNode;
};

// Context //
const RequestFormsContext = createContext<RequestFormsContextType | undefined>(
  undefined
);

export function useContext_RequestForms() {
  const context = useContext(RequestFormsContext);
  if (context === undefined) {
    throw new Error("useContext_RequestForms is not used within its provider");
  }
  return context;
}

export function RequestFormsContextProvider({
  children,
}: Readonly<RequestFormsContextProviderProps>) {
  const [requestForms, setRequestForms] = useState<any[]>([]);

  const fetchRequestForms = () => {
    getData(
      `${API_ENDPOINT}/api/v1/forms/requestForm/getAll`,
      (result: any) => {
        setRequestForms(result);
      }
    );
  };

  const contextValue = useMemo(
    () => ({
      requestForms,
      setRequestForms,
      fetchRequestForms,
    }),
    [requestForms, setRequestForms]
  );

  return (
    <RequestFormsContext.Provider value={contextValue}>
      {children}
    </RequestFormsContext.Provider>
  );
}
