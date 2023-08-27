export const logout = (
  setAccessToken: any,
  setUserInfo: any,
  setIsLoggedIn: any,
  shouldClear: any,
  setShouldClear: any
) => {
  if (shouldClear) {
    setAccessToken("");
    setUserInfo("");
    setIsLoggedIn(false);
    localStorage.clear();
    setShouldClear(false); // Set shouldClear to false to prevent further clearing //
  }
};
