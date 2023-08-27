import { useState } from "react";
import { TextField } from "@mui/material";
import { handleInputChange } from "../functions/fields/handleFieldChanges.function";
import { handleLogin } from "../functions/Login/Login.function";

const Login = (props: any) => {
  const { setAccessToken, setUserInfo, setIsLoggedIn } = props;

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  // Login object that's to be sent. //
  const [loginObject, setLoginObject] = useState({
    login_email: "",
    login_password: "",
  });

  return (
    <div>
      <div className="flex justify-center">
        <div className="border border-standardBlack border-opacity-25 rounded-xl p-8 mt-8">
          <h1 className="text-3xl font-semibold mb-8">Login</h1>
          <form
            id="login_form"
            onSubmit={(event) => {
              handleLogin(
                event,
                loginObject,
                setAccessToken,
                setUserInfo,
                setIsLoggingIn,
                setIsLoggedIn,
                setIsLoginFailed
              );
            }}
            className="flex flex-col items-center w-[256px] sm:w-[512px]">
            <div className="flex flex-col items-center gap-4 w-full">
              <TextField
                label="Email address"
                value={loginObject.login_email}
                onChange={(event) => {
                  handleInputChange(event, loginObject, setLoginObject);
                }}
                name="login_email"
                className="w-full"
                InputProps={{ sx: { borderRadius: 3 } }}
              />
              <TextField
                label="Password"
                value={loginObject.login_password}
                onChange={(event) => {
                  handleInputChange(event, loginObject, setLoginObject);
                }}
                name="login_password"
                type="password"
                className="w-full"
                InputProps={{ sx: { borderRadius: 3 } }}
              />
              {isLoginFailed ? (
                <div className="flex justify-start w-full mb-4">
                  <h1 className="text-lg font-semibold">
                    <i className="fa-solid fa-circle-exclamation text-red-500 me-2"></i>
                    Invalid credentials
                  </h1>
                </div>
              ) : null}
              <div className="flex justify-start w-full">
                <button
                  className={`${
                    isLoggingIn ||
                    loginObject.login_email == "" ||
                    loginObject.login_password == ""
                      ? "bg-gray-500"
                      : "bg-primary hover:bg-violet-700"
                  } text-white rounded-full px-6 py-2 w-full sm:w-1/2`}
                  disabled={
                    isLoggingIn ||
                    loginObject.login_email == "" ||
                    loginObject.login_password == ""
                  }
                  type="submit">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
