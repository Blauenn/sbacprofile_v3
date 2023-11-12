import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import Info_create_button from "../../components/Dashboard/Buttons/Info_create_button.component";
import Head_club_modal_create from "../../components/Dashboard/Clubs/HeadOnly/modal/Head_clubs_modal_create.component";
import Head_club_table from "../../components/Dashboard/Clubs/HeadOnly/table/Head_clubs_table.component";

const Head_clubs = () => {
  const { t } = useTranslation();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const onCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  return (
    <div>
      <PageHeaderReturn text={t("Admin_Clubs_header")} />

      <div className="mb-8">
        <Head_club_modal_create
          open={createModalOpen}
          onModalClose={onCreateModalClose}
        />
        <Info_create_button
          setModalOpen={setCreateModalOpen}
          icon="fa-solid fa-puzzle-piece"
          text={t("Admin_Clubs_create_button_title")}
        />
      </div>

      <Head_club_table />
    </div>
  );
};

export default Head_clubs;
