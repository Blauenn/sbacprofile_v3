import { ReactNode, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { logout } from "./functions/Login/Logout.function";

// Contexts //
import { useContext_Account } from "./context/Account.context";

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const { setAccessToken, setIsLoggedIn, setUserInfo } = useContext_Account();

  const { t } = useTranslation();

  const [hasError, setHasError] = useState(false);
  const [shouldClear, setShouldClear] = useState(true);

  useEffect(() => {
    const handleError = () => {
      setHasError(true);
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div className="w-full px-8 py-16">
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-6xl font-semibold">
            <i className="fa-solid fa-circle-exclamation text-red-500"></i>
          </h1>
          <h1 className="text-2xl text-center">{t("Error_message")}</h1>
          <h1
            onClick={() => {
              logout(
                setAccessToken,
                setUserInfo,
                setIsLoggedIn,
                shouldClear,
                setShouldClear
              );
              window.location.href = "/login";
            }}
            className="text-lg text-center text-red-500 hover:text-red-400 mb-2 cursor-pointer">
            <i className="fa-solid fa-right-from-bracket rotate-180 cursor-pointer me-4"></i>
            {t("Error_logout_button")}
          </h1>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
