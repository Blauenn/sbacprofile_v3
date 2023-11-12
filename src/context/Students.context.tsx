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
type StudentsContextType = {
  students: any[];
  setStudents: React.Dispatch<React.SetStateAction<any[]>>;
  studentCount: number;
  setStudentCount: React.Dispatch<React.SetStateAction<number>>;
  fetchStudents: () => void;
};
type StudentsContextProviderProps = {
  children: ReactNode;
};

// Context //
const StudentsContext = createContext<StudentsContextType | undefined>(
  undefined
);

export function useContext_Students() {
  const context = useContext(StudentsContext);
  if (context === undefined) {
    throw new Error("useContext_Students is not used within its provider");
  }
  return context;
}

export function StudentsContextProvider({
  children,
}: Readonly<StudentsContextProviderProps>) {
  const [students, setStudents] = useState<any[]>([]);
  const [studentCount, setStudentCount] = useState<number>(0);

  const fetchStudents = () => {
    getData(`${API_ENDPOINT}/api/v1/student/getAll`, (result: any) => {
      setStudents(result);
      setStudentCount(result.length);
    });
  };

  const contextValue = useMemo(
    () => ({
      students,
      setStudents,
      studentCount,
      setStudentCount,
      fetchStudents,
    }),
    [students, setStudents]
  );

  return (
    <StudentsContext.Provider value={contextValue}>
      {children}
    </StudentsContext.Provider>
  );
}
