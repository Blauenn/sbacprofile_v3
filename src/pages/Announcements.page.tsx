import { useTranslation } from "react-i18next";
import PageHeader from "../components/misc/common/PageHeader.component";

const Announcements = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeader
        icon="fa-solid fa-bullhorn"
        text={t("Announcements_header")}
      />
      
      <div className="w-full shadow-sm px-4 py-2 rounded-xl bg-white">
        UwU
      </div>
    </div>
  );
};

export default Announcements;
