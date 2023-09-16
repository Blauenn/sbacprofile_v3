import { ReactNode, createContext, useContext, useMemo, useState } from "react";

// Type //
type AnnouncementsContextType = {
  announcements: any[];
  setAnnouncements: React.Dispatch<React.SetStateAction<any[]>>;
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
    throw new Error(
      "useContext_Announcements is not used within its provider"
    );
  }
  return context;
}

export function AnnouncementsContextProvider({
  children,
}: AnnouncementsContextProviderProps) {
  const [announcements, setAnnouncements] = useState<any[]>([]);

  const contextValue = useMemo(
    () => ({
      announcements,
      setAnnouncements,
    }),
    [announcements, setAnnouncements]
  );

  return (
    <AnnouncementsContext.Provider value={contextValue}>
      {children}
    </AnnouncementsContext.Provider>
  );
}
