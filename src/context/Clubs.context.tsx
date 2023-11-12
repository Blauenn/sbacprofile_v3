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

  clubJoinRequests: any[];
  setClubJoinRequests: React.Dispatch<React.SetStateAction<any[]>>;
  fetchClubJoinRequests: () => void;
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
  const [clubJoinRequests, setClubJoinRequests] = useState<any[]>([]);

  const fetchClubs = () => {
    getData(`${API_ENDPOINT}/api/v1/club/getAll`, (result: any) => {
      // Change the value of the club_teacher from string into an object. //
      const remappedClub = result.map((club: any) => {
        const parsedTeacher = JSON.parse(club.club_teacher);
        return { ...club, club_teacher: parsedTeacher };
      });

      // Sort in alphabetical order. //
      const sortedResults = remappedClub.sort((a: any, b: any) => {
        return a.club_name.localeCompare(b.club_name);
      });

      setClubs(sortedResults);
    });
  };
  const fetchClubMemberships = () => {
    getData(`${API_ENDPOINT}/api/v1/clubMembership/getAll`, (result: any) => {
      setClubMemberships(result);
    });
  };
  const fetchClubJoinRequests = () => {
    getData(`${API_ENDPOINT}/api/v1/clubJoinRequest/getAll`, (result: any) => {
      setClubJoinRequests(result);
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

      clubJoinRequests,
      setClubJoinRequests,
      fetchClubJoinRequests,
    }),
    [
      clubs,
      setClubs,
      clubMemberships,
      setClubMemberships,
      clubJoinRequests,
      setClubJoinRequests,
    ]
  );

  return (
    <ClubsContext.Provider value={contextValue}>
      {children}
    </ClubsContext.Provider>
  );
}
