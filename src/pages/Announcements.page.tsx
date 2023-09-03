import { useTranslation } from "react-i18next";
import PageHeader from "../components/misc/common/PageHeader.component";

const Announcements = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeader
        icon="fa-solid fa-puzzle-piece"
        text={t("Announcements_header")}
      />
    </div>
  );
};

export default Announcements;
