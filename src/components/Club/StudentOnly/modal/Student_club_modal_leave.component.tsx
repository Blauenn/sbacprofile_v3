import { useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../custom/Custom_Modal";
import { Club } from "../../../../interfaces/common.interface";
import { handleClubLeaveRequestCreate } from "../../../../functions/Clubs/ClubLeaveRequests.function";
import Info_submit_button from "../../../Dashboard/Buttons/Info_submit_button.component";

// Contexts //
import { useContext_Account } from "../../../../context/Account.context";
import { useContext_Clubs } from "../../../../context/Clubs.context";

interface CurrentComponentProp {
  club: Club;
  open: boolean;
  onModalClose: () => void;
}

const Student_club_modal_leave = (props: CurrentComponentProp) => {
  const { club, open, onModalClose } = props;

  const { userInfo } = useContext_Account();
  const { fetchClubLeaveRequests } = useContext_Clubs();

  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const handleModalClose = () => {
    onModalClose();
  };

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const submissionStatus = await handleClubLeaveRequestCreate(
      club.club_ID,
      userInfo.profile_ID
    );

    if (submissionStatus) {
      fetchClubLeaveRequests();
      setIsSubmitSuccess(true);
      handleModalClose();
    } else {
      setIsSubmitSuccess(true);
    }
    setIsSubmitting(false);
  };

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-right-from-bracket rotate-180"
      title={t("Student_club_leaveRequest_modal_header")}>
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl">
            {t("Student_club_leaveRequest_modal_message")}
          </h1>
          <h1 className="opacity-50">
            {t("Student_club_leaveRequest_modal_description")}
          </h1>
        </div>
        {/* Submit button */}
        <Info_submit_button
          text={t("Student_club_leaveRequest_modal_submit_button_title")}
          successText={t(
            "Student_club_leaveRequest_modal_submit_success_message"
          )}
          icon="fa-solid fa-right-from-bracket rotate-180"
          color="border-red-500 hover:bg-red-500 text-red-500"
          isSubmitting={isSubmitting}
          isSuccess={isSubmitSuccess}
          onClickFunction={setObjectAndSubmit}
        />
      </div>
    </Custom_Modal>
  );
};

export default Student_club_modal_leave;
