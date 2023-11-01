import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import { handle_input_change } from "../functions/fields/handleFieldChanges.function";
import { handleLogin } from "../functions/Login/Login.function";
import { hover_transition } from "../constants/styles/transitions.style";

interface CurrentComponentProp {
  setAccessToken: any;
  setUserInfo: any;
  setIsLoggedIn: any;
}

const Login = (props: CurrentComponentProp) => {
  const { setAccessToken, setUserInfo, setIsLoggedIn } = props;

  const { t } = useTranslation();

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
        <div className="border border-standardBlack border-opacity-25 bg-white rounded-xl p-8 mt-8">
          <h1 className="text-3xl font-semibold mb-8">{t("Login_title")}</h1>
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
                label={t("Login_email_label")}
                value={loginObject.login_email}
                onChange={(event) => {
                  handle_input_change(event, loginObject, setLoginObject);
                }}
                name="login_email"
                className="w-full"
                InputProps={{ sx: { borderRadius: 3 } }}
              />
              <TextField
                label={t("Login_password_label")}
                value={loginObject.login_password}
                onChange={(event) => {
                  handle_input_change(event, loginObject, setLoginObject);
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
                    {t("Login_invalidCredentials_message")}
                  </h1>
                </div>
              ) : null}
              <div className="flex justify-start w-full">
                <button
                  className={`${
                    isLoggingIn ||
                    loginObject.login_email == "" ||
                    loginObject.login_password == ""
                      ? "bg-gray-500 text-white"
                      : "border border-primary text-primary hover:bg-primary hover:text-white"
                  } rounded-full px-6 py-2 w-full sm:w-1/2 ${hover_transition}`}
                  disabled={
                    isLoggingIn ||
                    loginObject.login_email == "" ||
                    loginObject.login_password == ""
                  }
                  type="submit">
                  {t("Login_submit_button_title")}
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
