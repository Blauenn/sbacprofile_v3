import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import Info_create_button from "../../components/Dashboard/Buttons/Info_create_button.component";
import Clubs_table from "../../components/Dashboard/Clubs/table/Clubs_table.component";
import Clubs_modal_create from "../../components/Dashboard/Clubs/modal/Clubs_modal_create.component";

// Contexts //
import { useContext_Clubs } from "../../context/Clubs.context";
import { Club } from "../../interfaces/common.interface";

const Admin_clubs = () => {
  const { clubs, fetchClubs } = useContext_Clubs();

  const { t } = useTranslation();

  useEffect(() => {
    if (clubs.length === 0) {
      fetchClubs();
    }
  }, []);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const onCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const sortedClubs = clubs.sort((a: Club, b: Club) =>
    a.club_name.localeCompare(b.club_name)
  );

  return (
    <div>
      <PageHeaderReturn text={t("Admin_Clubs_header")} />

      <div className="mb-8">
        <Info_create_button
          setModalOpen={setCreateModalOpen}
          icon="fa-solid fa-puzzle-piece"
          text={t("Clubs_create_button_title")}
        />
        <Clubs_modal_create
          open={createModalOpen}
          onModalClose={onCreateModalClose}
        />
      </div>

      <Clubs_table clubs={sortedClubs} />
    </div>
  );
};

export default Admin_clubs;
