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
type LeaveNoticesContextType = {
  leaveNotices: any[];
  setLeaveNotices: React.Dispatch<React.SetStateAction<any[]>>;
  fetchLeaveNotices: () => void;
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
}: Readonly<LeaveNoticesContextProviderProps>) {
  const [leaveNotices, setLeaveNotices] = useState<any[]>([]);

  const fetchLeaveNotices = () => {
    getData(
      `${API_ENDPOINT}/api/v1/forms/leaveNotice/getAll`,
      (result: any) => {
        setLeaveNotices(result);
      }
    );
  };

  const contextValue = useMemo(
    () => ({
      leaveNotices,
      setLeaveNotices,
      fetchLeaveNotices,
    }),
    [leaveNotices, setLeaveNotices]
  );

  return (
    <LeaveNoticesContext.Provider value={contextValue}>
      {children}
    </LeaveNoticesContext.Provider>
  );
}
