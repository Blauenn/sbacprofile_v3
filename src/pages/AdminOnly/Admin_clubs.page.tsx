import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import Info_create_button from "../../components/Dashboard/Buttons/Info_create_button.component";
import Admin_club_table from "../../components/Dashboard/Clubs/AdminOnly/table/Admin_clubs_table.component";
import Admin_club_modal_create from "../../components/Dashboard/Clubs/AdminOnly/modal/Admin_clubs_modal_create.component";

const Admin_clubs = () => {
  const { t } = useTranslation();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const onCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  return (
    <div>
      <PageHeaderReturn text={t("Admin_Clubs_header")} />

      <div className="mb-8">
        <Info_create_button
          setModalOpen={setCreateModalOpen}
          icon="fa-solid fa-puzzle-piece"
          text={t("Admin_Clubs_create_button_title")}
        />
        <Admin_club_modal_create
          open={createModalOpen}
          onModalClose={onCreateModalClose}
        />
      </div>

      <Admin_club_table />
    </div>
  );
};

export default Admin_clubs;
