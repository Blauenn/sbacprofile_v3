import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { getData } from "../functions/fetchFromAPI.function";
import { API_ENDPOINT } from "../constants/ENDPOINTS";

// Type //
type TeachersContextType = {
  teachers: any[];
  setTeachers: React.Dispatch<React.SetStateAction<any[]>>;
  teacherCount: number;
  setTeacherCount: React.Dispatch<React.SetStateAction<number>>;
  fetchTeachers: () => void;
};
type TeachersContextProviderProps = {
  children: ReactNode;
};

// Context //
const TeachersContext = createContext<TeachersContextType | undefined>(
  undefined
);

export function useContext_Teachers() {
  const context = useContext(TeachersContext);
  if (context === undefined) {
    throw new Error("useContext_Teachers is not used within its provider");
  }
  return context;
}

export function TeachersContextProvider({
  children,
}: Readonly<TeachersContextProviderProps>) {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [teacherCount, setTeacherCount] = useState<number>(0);

  const fetchTeachers = () => {
    getData(`${API_ENDPOINT}/api/v1/teacher/getAll`, (result: any) => {
      setTeachers(result);
      setTeacherCount(result.length);
    });
  };

  const contextValue = useMemo(
    () => ({
      teachers,
      setTeachers,
      teacherCount,
      setTeacherCount,
      fetchTeachers,
    }),
    [teachers, setTeachers]
  );

  return (
    <TeachersContext.Provider value={contextValue}>
      {children}
    </TeachersContext.Provider>
  );
}
