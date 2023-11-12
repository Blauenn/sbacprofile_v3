import { useTranslation } from "react-i18next";

const Loading = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full mt-16">
      <i className="fa-solid fa-spinner animate-spin text-6xl text-primary"></i>
      <h1 className="text-xl opacity-50">{t("Loading_message")}</h1>
    </div>
  );
};

export default Loading;
