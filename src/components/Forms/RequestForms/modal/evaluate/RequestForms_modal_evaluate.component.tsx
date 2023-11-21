import { useTranslation } from "react-i18next";
import { useContext_Account } from "../../../../../context/Account.context";
import { useContext_RequestForms } from "../../../../../context/RequestForms.context";
import { RequestForm } from "../../../../../interfaces/common.interface";
import { useState } from "react";
import Custom_Modal from "../../../../custom/Custom_Modal";
import RequestForms_evaluate_buttons from "./RequestForms_evaluate_buttons.component";
import { TextField_multiline } from "../../../../custom/Custom_TextFields";
import Info_submit_button from "../../../../Dashboard/Buttons/Info_submit_button.component";
import { handleRequestFormUpdate } from "../../../../../functions/Forms/RequestForms/Admin_requestForms.function";

interface CurrentComponentProp {
  requestForm: RequestForm;
  open: boolean;
  onModalClose: () => void;
}

const RequestForms_modal_evaluate = (props: CurrentComponentProp) => {
  const { requestForm, open, onModalClose } = props;

  const { userInfo } = useContext_Account();
  const { fetchRequestForms } = useContext_RequestForms();

  const { t } = useTranslation();

  const [requestFormUpdateObject, setRequestFormUpdateObject] = useState({
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
    setRequestFormUpdateObject({
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

  let updateAs: number;
  switch (userInfo.profile_position) {
    case 3:
      updateAs = 2;
      break;
    case 4:
      updateAs = 3;
      break;
    default:
      updateAs = 1;
      break;
  }

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const updatedRequestFormObject = {
      teacher: requestFormUpdateObject.teacher,
      // +1 because "pending" is at the status #1. //
      status: requestFormUpdateObject.status + 1,
      description: requestFormUpdateObject.description,
    };

    const submissionStatus = await handleRequestFormUpdate(
      requestForm,
      updatedRequestFormObject,
      updateAs
    );

    if (submissionStatus) {
      fetchRequestForms();

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
  switch (requestFormUpdateObject.status) {
    case 1:
      info_submit_button_text = t("RequestForms_evaluate_button_approve_title");
      info_submit_button_icon = "fa-solid fa-circle-check";
      info_submit_button_color =
        "border-green-500 hover:bg-green-500 text-green-500";
      break;
    case 2:
      info_submit_button_text = t("RequestForms_evaluate_button_edit_title");
      info_submit_button_icon = "fa-solid fa-pencil";
      info_submit_button_color =
        "border-yellow-500 hover:bg-yellow-500 text-yellow-500";
      break;
    case 3:
      info_submit_button_text = t("RequestForms_evaluate_button_reject_title");
      info_submit_button_icon = "fa-solid fa-circle-xmark";
      info_submit_button_color = "border-red-500 hover:bg-red-500 text-red-500";
      break;
    default:
      info_submit_button_text = t("RequestForms_evaluate_button_title");
      info_submit_button_icon = "fa-solid fa-folder";
      break;
  }

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-folder"
      title={t("RequestForms_teachers_evaluate_modal_header")}>
      <div className="flex flex-col gap-8 w-full">
        <RequestForms_evaluate_buttons
          // TODO: MAKE THE TYPE WORKS //
          requestFormUpdateObject={requestFormUpdateObject}
          setRequestFormUpdateObject={setRequestFormUpdateObject}
        />
        <TextField_multiline
          label="Message"
          className="w-full"
          maxRows={4}
          name="description"
          object={requestFormUpdateObject}
          setObject={setRequestFormUpdateObject}
          validation={validationErrors.description}
        />
        <Info_submit_button
          text={info_submit_button_text}
          successText={t("RequestForms_evaluate_modal_submit_success_message")}
          icon={info_submit_button_icon}
          color={info_submit_button_color}
          isSubmitting={isSubmitting}
          isSuccess={isUpdateSuccess}
          disabled={requestFormUpdateObject.status === 0}
          onClickFunction={() => {
            setObjectAndSubmit();
          }}
        />
      </div>
    </Custom_Modal>
  );
};

export default RequestForms_modal_evaluate;
