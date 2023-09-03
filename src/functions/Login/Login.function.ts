import { API_ENDPOINT } from "../../constants/ENDPOINTS";
import { getDataAuthenticated, postData } from "../fetchFromAPI.function";

export const handleLogin = async (
  event: any,
  loginObject: any,
  setAccessToken: any,
  setUserInfo: any,
  setIsLoggingIn: any,
  setIsLoggedIn: any,
  setIsLoginFailed: any,
) => {
  event.preventDefault();
  setIsLoggingIn(true);

  const loginToCheckObject = {
    email: loginObject.login_email,
    password: loginObject.login_password,
  };
  const loginObjectJSON = JSON.stringify(loginToCheckObject);

  // Send the credentials to check. //
  postData(
    `${API_ENDPOINT}/api/v1/auth/login`,
    loginObjectJSON,
    (result: any) => {
      if (result) {
        setAccessToken(result.accessToken);
        setIsLoggedIn(true);

        // After a successful login, get the user info right after. //
        getDataAuthenticated(
          `${API_ENDPOINT}/api/v1/profile/getProfile`,
          result.accessToken,
          (result: any) => {
            setUserInfo(result);
            localStorage.setItem("userInfo", result);
          }
        );

        localStorage.setItem("accessToken", result.accessToken);
      } else {
        setIsLoginFailed(true);
        setIsLoggingIn(false);
      }
    }
  );
};
