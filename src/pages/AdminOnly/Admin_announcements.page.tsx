import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import Info_create_button from "../../components/Dashboard/Buttons/Info_create_button.component";
import Admin_announcement_table from "../../components/Dashboard/Announcements/AdminOnly/table/Admin_announcements_table.component";
import Admin_announcements_modal_create from "../../components/Dashboard/Announcements/AdminOnly/modal/Admin_announcements_modal_create.component";

const Admin_announcements = () => {
  const { t } = useTranslation();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const onCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  return (
    <div>
      <PageHeaderReturn text={t("Admin_Announcements_header")} />

      <div className="mb-8">
        <Info_create_button
          setModalOpen={setCreateModalOpen}
          icon="fa-solid fa-bullhorn"
          text={t("Admin_Announcements_create_button_title")}
        />
        <Admin_announcements_modal_create
          open={createModalOpen}
          onModalClose={onCreateModalClose}
        />
      </div>

      <Admin_announcement_table />
    </div>
  );
};

export default Admin_announcements;
