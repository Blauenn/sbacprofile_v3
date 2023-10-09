import { useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../custom/Custom_Modal";
import { TextField_multiline } from "../../../custom/Custom_TextFields";
import { getData } from "../../../../functions/fetchFromAPI.function";
import { handleLeaveNoticeUpdate } from "../../../../functions/LeaveNotices/LeaveNotices.function";
import Info_submit_button from "../../../Dashboard/Buttons/Info_submit_button.component";
import LeaveNotice_evaluate_buttons from "../../LeaveNotice_evaluate_buttons.component";
import { API_ENDPOINT } from "../../../../constants/ENDPOINTS";

// Contexts //
import { useContext_Account } from "../../../../context/Account.context";
import { useContext_LeaveNotices } from "../../../../context/LeaveNotices.context";

interface CurrentComponentProp {
  leaveNotice: any;
  open: boolean;
  onModalClose: any;
}

const Teacher_leaveNotices_evaluate_modal = (props: CurrentComponentProp) => {
  const { leaveNotice, open, onModalClose } = props;

  const { userInfo } = useContext_Account();
  const { setLeaveNotices } = useContext_LeaveNotices();

  const { t } = useTranslation();

  const [leaveNoticeUpdateObject, setLeaveNoticeUpdateObject] = useState({
    teacher: userInfo.profile_ID,
    status: 0,
    description: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    status: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  const handleModalClose = () => {
    setLeaveNoticeUpdateObject({
      teacher: userInfo.profile_ID,
      status: 0,
      description: "",
    });
    setValidationErrors({
      status: "",
      description: "",
    });

    setIsSubmitting(false);
    setIsUpdateSuccess(false);

    onModalClose();
  };

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const updatedLeaveNoticeObject = {
      teacher: leaveNoticeUpdateObject.teacher,
      // +1 because "pending" is at the status #1. //
      status: leaveNoticeUpdateObject.status + 1,
      description: leaveNoticeUpdateObject.description,
    };

    const submissionStatus = await handleLeaveNoticeUpdate(
      leaveNotice,
      updatedLeaveNoticeObject
    );

    if (submissionStatus) {
      getData(
        `${API_ENDPOINT}/api/v1/forms/leaveNotice/getAll`,
        (result: any) => setLeaveNotices(result)
      );

      setIsSubmitting(false);
      setIsUpdateSuccess(true);
    } else {
      setIsSubmitting(false);
      setIsUpdateSuccess(false);
    }
  };

  // Set the button title based on the value of the status. //
  let info_submit_button_text: string = "";
  let info_submit_button_icon: string = "";
  let info_submit_button_color: string = "";
  switch (leaveNoticeUpdateObject.status) {
    case 1:
      info_submit_button_text = t("LeaveNotices_evaluate_button_approve_title");
      info_submit_button_icon = "fa-solid fa-circle-check";
      info_submit_button_color = "border-green-500 hover:bg-green-500 text-green-500"
      break;
    case 2:
      info_submit_button_text = t("LeaveNotices_evaluate_button_edit_title");
      info_submit_button_icon = "fa-solid fa-pencil";
      info_submit_button_color = "border-yellow-500 hover:bg-yellow-500 text-yellow-500"
      break;
    case 3:
      info_submit_button_text = t("LeaveNotices_evaluate_button_reject_title");
      info_submit_button_icon = "fa-solid fa-circle-xmark";
      info_submit_button_color = "border-red-500 hover:bg-red-500 text-red-500"
      break;
    default:
      info_submit_button_text = t("LeaveNotices_evaluate_button_title");
      info_submit_button_icon = "fa-solid fa-flag";
      break;
  }

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-flag"
      title={t("LeaveNotices_teachers_evaluate_modal_header")}
      altIcon="fa-solid fa-circle-check text-green-500"
      altTitle={t("LeaveNotices_evaluate_modal_submit_success_message")}
      useAltTitle={isUpdateSuccess}>
      <div className="flex flex-col gap-8 w-full">
        <LeaveNotice_evaluate_buttons
          leaveNoticeUpdateObject={leaveNoticeUpdateObject}
          setLeaveNoticeUpdateObject={setLeaveNoticeUpdateObject}
        />
        <TextField_multiline
          label="Message"
          className="w-full"
          maxRows={4}
          name="description"
          object={leaveNoticeUpdateObject}
          setObject={setLeaveNoticeUpdateObject}
          validation={validationErrors.description}
        />
        <Info_submit_button
          text={info_submit_button_text}
          icon={info_submit_button_icon}
          color={info_submit_button_color}
          isSubmitting={isSubmitting}
          disabled={leaveNoticeUpdateObject.status === 0}
          onClickFunction={() => {
            setObjectAndSubmit();
          }}
        />
      </div>
    </Custom_Modal>
  );
};

export default Teacher_leaveNotices_evaluate_modal;
