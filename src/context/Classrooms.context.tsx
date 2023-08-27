import { ReactNode, createContext, useContext, useMemo, useState } from "react";

// Type //
type ClassroomContextType = {
  classrooms: any[];
  setClassrooms: React.Dispatch<React.SetStateAction<any[]>>;
};
type ClassroomContextProviderProps = {
  children: ReactNode;
};

// Context //
const ClassroomsContext = createContext<ClassroomContextType | undefined>(undefined);

export function useContext_Classrooms() {
  const context = useContext(ClassroomsContext);
  if (context === undefined) {
    throw new Error("useContext_Classrooms is not used within its provider");
  }
  return context;
}

export function ClassroomContextProvider({ children }: ClassroomContextProviderProps) {
  const [classrooms, setClassrooms] = useState<any[]>([]);

  const contextValue = useMemo(
    () => ({
      classrooms,
      setClassrooms,
    }),
    [classrooms, setClassrooms]
  );

  return (
    <ClassroomsContext.Provider value={contextValue}>
      {children}
    </ClassroomsContext.Provider>
  );
}
