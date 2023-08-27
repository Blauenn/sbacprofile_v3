import { useTranslation } from "react-i18next";
import { Ring } from "react-cssfx-loading";

const Loading = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full">
      <Ring />
      <h1 className="text-xl opacity-50">{t("Loading_message")}</h1>
    </div>
  );
};

export default Loading;
