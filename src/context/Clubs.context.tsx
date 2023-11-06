import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

// Type //
type ClubsContextType = {
  clubs: any[];
  setClubs: React.Dispatch<React.SetStateAction<any[]>>;
  clubMemberships: any[];
  setClubMemberships: React.Dispatch<React.SetStateAction<any[]>>;
  clubJoinRequests: any[];
  setClubJoinRequests: React.Dispatch<React.SetStateAction<any[]>>;
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

export function ClubsContextProvider({ children }: ClubsContextProviderProps) {
  const [clubs, setClubs] = useState<any[]>([]);
  const [clubMemberships, setClubMemberships] = useState<any[]>([]);
  const [clubJoinRequests, setClubJoinRequests] = useState<any[]>([]);

  const contextValue = useMemo(
    () => ({
      clubs,
      setClubs,
      clubMemberships,
      setClubMemberships,
      clubJoinRequests,
      setClubJoinRequests,
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
