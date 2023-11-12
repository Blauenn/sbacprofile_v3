import { useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../custom/Custom_Modal";
import { handleClubJoinRequestDelete } from "../../../../functions/Clubs/Clubs.function";
import Info_submit_button from "../../../Dashboard/Buttons/Info_submit_button.component";

// Contexts //
import { useContext_Clubs } from "../../../../context/Clubs.context";

interface CurrentComponentProp {
  clubJoinRequest: any;
  open: any;
  onModalClose: any;
}

const Student_club_modal_cancel = (props: CurrentComponentProp) => {
  const { clubJoinRequest, open, onModalClose } = props;

  const { fetchClubJoinRequests } = useContext_Clubs();

  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelSuccess, setIsCancelSuccess] = useState(false);

  const handleModalClose = () => {
    onModalClose();
  };

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const submissionStatus = await handleClubJoinRequestDelete(
      clubJoinRequest.club_join_request_ID
    );

    if (submissionStatus) {
      fetchClubJoinRequests();

      setIsSubmitting(false);
      setIsCancelSuccess(true);

      handleModalClose();
    } else {
      setIsSubmitting(false);
      setIsCancelSuccess(false);
    }
  };

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-right-from-bracket rotate-180"
      title={t("Student_club_cancelRequest_modal_header")}>
      <div className="flex flex-col gap-8 w-full">
        <h1 className="opacity-50">
          {t("Student_club_cancelRequest_modal_message")}
        </h1>
        {/* Submit button */}
        <Info_submit_button
          text={t("Student_club_cancelRequest_modal_submit_button_title")}
          successText={t(
            "Student_club_cancelRequest_modal_submit_success_message"
          )}
          icon="fa-solid fa-right-from-bracket rotate-180"
          color="border-red-500 hover:bg-red-500 text-red-500"
          isSubmitting={isSubmitting}
          isSuccess={isCancelSuccess}
          onClickFunction={setObjectAndSubmit}
        />
      </div>
    </Custom_Modal>
  );
};

export default Student_club_modal_cancel;
