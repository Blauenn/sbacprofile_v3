export const logout = (
  setAccessToken: React.Dispatch<React.SetStateAction<string>>,
  setUserInfo: any,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  shouldClear: any,
  setShouldClear: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (shouldClear) {
    setAccessToken("");
    setUserInfo("");
    setIsLoggedIn(false);
    localStorage.clear();
    setShouldClear(false); // Set shouldClear to false to prevent further clearing //
  }
};
