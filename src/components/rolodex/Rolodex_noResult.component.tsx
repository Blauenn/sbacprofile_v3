import { useTranslation } from "react-i18next";

const Rolodex_noResult = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between flex-col gap-4">
      <div className="mt-8 flex justify-center items-center flex-col opacity-75">
        <i className="text-5xl sm:text-8xl fa-solid fa-face-frown mb-4"></i>
        <h1 className="text-3xl sm:text-5xl">
          {t("profile_rolodex_noResults")}
        </h1>
      </div>
    </div>
  );
};

export default Rolodex_noResult;
