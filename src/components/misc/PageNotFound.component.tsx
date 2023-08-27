import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-6xl font-semibold">404</h1>
        <h1 className="text-2xl">{t("PageNotFound_message")}</h1>
        <NavLink to="/home">
          <h1 className="text-lg text-center text-blue-500 hover:text-blue-400 mb-2 cursor-pointer">
            <i className="fa-solid fa-home me-4"></i>
            {t("PageNotFound_button")}
          </h1>
        </NavLink>
      </div>
    </div>
  );
};

export default PageNotFound;
