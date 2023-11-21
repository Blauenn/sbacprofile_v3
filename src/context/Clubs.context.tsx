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
type ClubsContextType = {
  clubs: any[];
  setClubs: React.Dispatch<React.SetStateAction<any[]>>;
  fetchClubs: () => void;

  clubMemberships: any[];
  setClubMemberships: React.Dispatch<React.SetStateAction<any[]>>;
  fetchClubMemberships: () => void;
  
  clubManagers: any[];
  setClubManagers: React.Dispatch<React.SetStateAction<any[]>>;
  fetchClubManagers: () => void;

  clubJoinRequests: any[];
  setClubJoinRequests: React.Dispatch<React.SetStateAction<any[]>>;
  fetchClubJoinRequests: () => void;

  clubLeaveRequests: any[];
  setClubLeaveRequests: React.Dispatch<React.SetStateAction<any[]>>;
  fetchClubLeaveRequests: () => void;
};
type ClubsContextProviderProps = {
  children: ReactNode;
};

// Context //
const ClubsContext = createContext<ClubsContextType | undefined>(undefined);

export function useContext_Clubs() {
  const context = useContext(ClubsContext);
  if (context === undefined) {
    throw new Error("useContext_Clubs is not used within its provider");
  }
  return context;
}

export function ClubsContextProvider({
  children,
}: Readonly<ClubsContextProviderProps>) {
  const [clubs, setClubs] = useState<any[]>([]);
  const [clubMemberships, setClubMemberships] = useState<any[]>([]);
  const [clubManagers, setClubManagers] = useState<any[]>([]);
  const [clubJoinRequests, setClubJoinRequests] = useState<any[]>([]);
  const [clubLeaveRequests, setClubLeaveRequests] = useState<any[]>([]);

  const fetchClubs = () => {
    getData(`${API_ENDPOINT}/api/v1/club/getAll`, (result: any) => {
      setClubs(result);
    });
  };
  const fetchClubMemberships = () => {
    getData(`${API_ENDPOINT}/api/v1/clubMembership/getAll`, (result: any) => {
      setClubMemberships(result);
    });
  };
  const fetchClubManagers = () => {
    getData(`${API_ENDPOINT}/api/v1/clubManager/getAll`, (result: any) => {
      setClubManagers(result);
    });
  };
  const fetchClubJoinRequests = () => {
    getData(`${API_ENDPOINT}/api/v1/clubJoinRequest/getAll`, (result: any) => {
      setClubJoinRequests(result);
    });
  };
  const fetchClubLeaveRequests = () => {
    getData(`${API_ENDPOINT}/api/v1/clubLeaveRequest/getAll`, (result: any) => {
      setClubLeaveRequests(result);
    });
  };

  const contextValue = useMemo(
    () => ({
      clubs,
      setClubs,
      fetchClubs,

      clubMemberships,
      setClubMemberships,
      fetchClubMemberships,

      clubManagers,
      setClubManagers,
      fetchClubManagers,

      clubJoinRequests,
      setClubJoinRequests,
      fetchClubJoinRequests,
      
      clubLeaveRequests,
      setClubLeaveRequests,
      fetchClubLeaveRequests,
    }),
    [
      clubs,
      setClubs,

      clubMemberships,
      setClubMemberships,

      clubManagers,
      setClubManagers,
      
      clubJoinRequests,
      setClubJoinRequests,

      clubLeaveRequests,
      setClubLeaveRequests,
    ]
  );

  return (
    <ClubsContext.Provider value={contextValue}>
      {children}
    </ClubsContext.Provider>
  );
}
