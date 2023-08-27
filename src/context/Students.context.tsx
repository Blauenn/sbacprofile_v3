import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

// Type //
type StudentsContextType = {
  students: any[];
  setStudents: React.Dispatch<React.SetStateAction<any[]>>;
  studentCount: number;
  setStudentCount: React.Dispatch<React.SetStateAction<number>>;
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
}: StudentsContextProviderProps) {
  const [students, setStudents] = useState<any[]>([]);
  const [studentCount, setStudentCount] = useState<number>(0);

  const contextValue = useMemo(
    () => ({
      students,
      setStudents,
      studentCount,
      setStudentCount,
    }),
    [students, setStudents]
  );

  return (
    <StudentsContext.Provider value={contextValue}>
      {children}
    </StudentsContext.Provider>
  );
}
