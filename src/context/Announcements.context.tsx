import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { getData } from "../functions/fetchFromAPI.function";
import { API_ENDPOINT } from "../constants/ENDPOINTS";

// Type //
type AnnouncementsContextType = {
  announcements: any[];
  setAnnouncements: React.Dispatch<React.SetStateAction<any[]>>;
  fetchAnnouncements: () => void;
};
type AnnouncementsContextProviderProps = {
  children: ReactNode;
};

// Context //
const AnnouncementsContext = createContext<
  AnnouncementsContextType | undefined
>(undefined);

export function useContext_Announcements() {
  const context = useContext(AnnouncementsContext);
  if (context === undefined) {
    throw new Error("useContext_Announcements is not used within its provider");
  }
  return context;
}

export function AnnouncementsContextProvider({
  children,
}: Readonly<AnnouncementsContextProviderProps>) {
  const [announcements, setAnnouncements] = useState<any[]>([]);

  const fetchAnnouncements = () => {
    getData(`${API_ENDPOINT}/api/v1/announcement/getAll`, (result: any) => {
      setAnnouncements(result);
    });
  };

  const contextValue = useMemo(
    () => ({
      announcements,
      setAnnouncements,
      fetchAnnouncements,
    }),
    [announcements, setAnnouncements]
  );

  return (
    <AnnouncementsContext.Provider value={contextValue}>
      {children}
    </AnnouncementsContext.Provider>
  );
}
