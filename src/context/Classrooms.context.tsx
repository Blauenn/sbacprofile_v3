import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { getData } from "../functions/fetchFromAPI.function";
import { API_ENDPOINT } from "../constants/ENDPOINTS";

// Type //
type ClassroomContextType = {
  classrooms: any[];
  setClassrooms: React.Dispatch<React.SetStateAction<any[]>>;
  fetchClassrooms: () => void;
};
type ClassroomContextProviderProps = {
  children: ReactNode;
};

// Context //
const ClassroomsContext = createContext<ClassroomContextType | undefined>(
  undefined
);

export function useContext_Classrooms() {
  const context = useContext(ClassroomsContext);
  if (context === undefined) {
    throw new Error("useContext_Classrooms is not used within its provider");
  }
  return context;
}

export function ClassroomContextProvider({
  children,
}: Readonly<ClassroomContextProviderProps>) {
  const [classrooms, setClassrooms] = useState<any[]>([]);

  const fetchClassrooms = () => {
    getData(`${API_ENDPOINT}/api/v1/classroom`, (result: any) =>
      setClassrooms(result)
    );
  };

  const contextValue = useMemo(
    () => ({
      classrooms,
      setClassrooms,
      fetchClassrooms,
    }),
    [classrooms, setClassrooms]
  );

  return (
    <ClassroomsContext.Provider value={contextValue}>
      {children}
    </ClassroomsContext.Provider>
  );
}
