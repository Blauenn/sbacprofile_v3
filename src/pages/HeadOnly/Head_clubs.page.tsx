import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Club } from "../../interfaces/common.interface";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import Info_create_button from "../../components/Dashboard/Buttons/Info_create_button.component";
import Clubs_table from "../../components/Dashboard/Clubs/table/Clubs_table.component";
import Clubs_modal_create from "../../components/Dashboard/Clubs/modal/Clubs_modal_create.component";

// Contexts //
import { useContext_Account } from "../../context/Account.context";
import { useContext_Clubs } from "../../context/Clubs.context";

const Head_clubs = () => {
  const { userInfo } = useContext_Account();
  const { clubs, fetchClubs } = useContext_Clubs();

  const { t } = useTranslation();

  useEffect(() => {
    if (clubs.length === 0) {
      fetchClubs();
    }
  }, []);

  const majorClubs = clubs
    .filter((club: Club) => club.club_major === userInfo.profile_major)
    .sort((a: Club, b: Club) => a.club_name.localeCompare(b.club_name));

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const onCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  return (
    <div>
      <PageHeaderReturn text={t("Clubs_header")} />

      <div className="mb-8">
        <Clubs_modal_create
          open={createModalOpen}
          onModalClose={onCreateModalClose}
        />
        <Info_create_button
          setModalOpen={setCreateModalOpen}
          icon="fa-solid fa-puzzle-piece"
          text={t("Clubs_create_button_title")}
        />
      </div>

      <Clubs_table clubs={majorClubs} />
    </div>
  );
};

export default Head_clubs;
