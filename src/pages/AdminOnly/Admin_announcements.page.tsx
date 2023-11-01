import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getData } from "../../functions/fetchFromAPI.function";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import Info_create_button from "../../components/Dashboard/Buttons/Info_create_button.component";
import Admin_announcement_table from "../../components/Dashboard/Announcements/AdminOnly/table/Admin_announcements_table.component";
import Admin_announcements_modal_create from "../../components/Dashboard/Announcements/AdminOnly/modal/Admin_announcements_modal_create.component";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";

// Contexts //
import { useContext_Announcements } from "../../context/Announcements.context";

const Admin_announcements = () => {
  const { announcements, setAnnouncements } = useContext_Announcements();

  const { t } = useTranslation();

  useEffect(() => {
    // Announcements //
    getData(`${API_ENDPOINT}/api/v1/announcement/getAll`, (result: any) => {
      setAnnouncements(result);
    });
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeaderReturn text={t("Admin_Announcements_header")} />

      <div className="mb-8">
        <Info_create_button
          setModalOpen={setModalOpen}
          icon="fa-solid fa-bullhorn"
          text={t("Admin_Announcements_create_button_title")}
        />
        <Admin_announcements_modal_create
          open={modalOpen}
          onModalClose={onModalClose}
        />
      </div>

      <div className="flex flex-col gap-8">
        <Admin_announcement_table announcements={announcements} />
      </div>
    </div>
  );
};

export default Admin_announcements;
