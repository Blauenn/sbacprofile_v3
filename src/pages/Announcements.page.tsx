import { useTranslation } from "react-i18next";
import PageHeader from "../components/misc/common/PageHeader.component";
import Announcement_rolodex from "../components/Announcements/Announcement_rolodex.component";

const Announcements = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeader
        icon="fa-solid fa-bullhorn"
        text={t("Announcements_header")}
      />

      <Announcement_rolodex />
    </div>
  );
};

export default Announcements;
