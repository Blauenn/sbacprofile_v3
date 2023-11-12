import { useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../../custom/Custom_Modal";
import { handleClubDelete } from "../../../../../functions/Admin/Clubs/Admin_clubs.function";
import Info_submit_button from "../../../Buttons/Info_submit_button.component";

// Contexts //
import { useContext_Clubs } from "../../../../../context/Clubs.context";

interface CurrentComponentProp {
  club: any;
  club_member_count: number;
  open: boolean;
  onModalClose: any;
}

const Admin_clubs_modal_delete = (props: CurrentComponentProp) => {
  const { club, club_member_count, open, onModalClose } = props;

  const { fetchClubs } = useContext_Clubs();

  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  const handleModalClose = () => {
    onModalClose();
  };

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const submissionStatus = await handleClubDelete(club.club_ID);

    if (submissionStatus) {
      fetchClubs();

      setIsSubmitting(false);
      setIsDeleteSuccess(true);

      handleModalClose();
    } else {
      setIsSubmitting(false);
      setIsDeleteSuccess(false);
    }
  };

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-trash-can"
      title={t("Admin_Clubs_delete_modal_header")}>
      <div className="flex flex-col gap-4">
        <h1 className="opacity-50">{t("Admin_Clubs_delete_modal_message")}</h1>
        <div className="flex flex-col mb-2">
          <h1 className="text-2xl font-semibold">{club.club_name}</h1>
          {club_member_count !== 0 ? (
            <h1 className="text-lg opacity-50">
              with {club_member_count} members
            </h1>
          ) : (
            <h1 className="text-lg opacity-50">with no members</h1>
          )}
        </div>
        {/* Submit button */}
        <Info_submit_button
          text={t("Admin_Clubs_delete_modal_submit_button_title")}
          successText={t("Admin_Clubs_delete_modal_submit_success_message")}
          icon="fa-solid fa-trash-can"
          color="border-red-500 hover:bg-red-500 text-red-500"
          isSubmitting={isSubmitting}
          isSuccess={isDeleteSuccess}
          onClickFunction={setObjectAndSubmit}
        />
      </div>
    </Custom_Modal>
  );
};

export default Admin_clubs_modal_delete;
