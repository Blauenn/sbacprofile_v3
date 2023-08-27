import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { UserInfo } from "../interfaces/account.interface";

// Type //
type AccountContextType = {
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  userInfo: UserInfo[];
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo[]>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};
type AccountContextProviderProps = {
  children: ReactNode;
};

// Context //
const AccountContext = createContext<AccountContextType | undefined>(undefined);

export function useContext_Account() {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useContext_Account is not used within its provider");
  }
  return context;
}

export function AccountContextProvider({
  children,
}: AccountContextProviderProps) {
  const [accessToken, setAccessToken] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfo[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const contextValue = useMemo(
    () => ({
      accessToken,
      setAccessToken,
      userInfo,
      setUserInfo,
      isLoggedIn,
      setIsLoggedIn,
    }),
    [
      accessToken,
      setAccessToken,
      userInfo,
      setUserInfo,
      isLoggedIn,
      setIsLoggedIn,
    ]
  );

  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
}
