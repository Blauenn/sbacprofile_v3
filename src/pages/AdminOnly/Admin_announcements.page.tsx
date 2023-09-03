import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import Info_create_button from "../../components/Dashboard/Buttons/Info_create_button.component";
import Admin_announcement_modal_create from "../../components/Dashboard/Announcements/AdminOnly/modal/Admin_announcement_modal_create.component";

const Admin_announcements = () => {
  const { t } = useTranslation();

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
        <Admin_announcement_modal_create
          open={modalOpen}
          onModalClose={onModalClose}
        />
      </div>
    </div>
  );
};

export default Admin_announcements;
