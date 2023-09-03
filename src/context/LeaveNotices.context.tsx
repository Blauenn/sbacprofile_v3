import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

// Type //
type LeaveNoticesContextType = {
  leaveNotices: any[];
  setLeaveNotices: React.Dispatch<React.SetStateAction<any[]>>;
};
type LeaveNoticesContextProviderProps = {
  children: ReactNode;
};

// Context //
const LeaveNoticesContext = createContext<LeaveNoticesContextType | undefined>(
  undefined
);

export function useContext_LeaveNotices() {
  const context = useContext(LeaveNoticesContext);
  if (context === undefined) {
    throw new Error("useContext_LeaveNotices is not used within its provider");
  }
  return context;
}

export function LeaveNoticesContextProvider({
  children,
}: LeaveNoticesContextProviderProps) {
  const [leaveNotices, setLeaveNotices] = useState<any[]>([]);

  const contextValue = useMemo(
    () => ({
      leaveNotices,
      setLeaveNotices,
    }),
    [leaveNotices, setLeaveNotices]
  );

  return (
    <LeaveNoticesContext.Provider value={contextValue}>
      {children}
    </LeaveNoticesContext.Provider>
  );
}
