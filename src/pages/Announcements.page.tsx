import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getData } from "../functions/fetchFromAPI.function";
import PageHeader from "../components/misc/common/PageHeader.component";
import { API_ENDPOINT } from "../constants/ENDPOINTS";

// Contexts //
import { useContext_Announcements } from "../context/Announcements.context";
import Announcement_rolodex from "../components/Announcements/Announcement_rolodex.component";

const Announcements = () => {
  const { announcements, setAnnouncements } = useContext_Announcements();

  const { t } = useTranslation();

  useEffect(() => {
    // Announcements //
    getData(`${API_ENDPOINT}/api/v1/announcement/getAll`, (result: any) => {
      setAnnouncements(result);
    });
  }, []);

  return (
    <div>
      <PageHeader
        icon="fa-solid fa-bullhorn"
        text={t("Announcements_header")}
      />

      <Announcement_rolodex announcements={announcements} />
    </div>
  );
};

export default Announcements;
