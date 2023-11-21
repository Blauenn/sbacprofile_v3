import { useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../custom/Custom_Modal";
import {
  TextField_multiline,
  TextField_text,
} from "../../../custom/Custom_TextFields";
import Custom_FileFields from "../../../custom/Custom_FileFields";
import Info_submit_button from "../../../Dashboard/Buttons/Info_submit_button.component";
import { handleRequestFormCreate } from "../../../../functions/Forms/RequestForms/RequestForms.function";

// Context //
import { useContext_Account } from "../../../../context/Account.context";
import { useContext_RequestForms } from "../../../../context/RequestForms.context";

interface CurrentComponentProp {
  open: boolean;
  onModalClose: () => void;
}

const RequestForms_modal_create = (props: CurrentComponentProp) => {
  const { open, onModalClose } = props;

  const { userInfo } = useContext_Account();
  const { fetchRequestForms } = useContext_RequestForms();

  const { t } = useTranslation();

  const [requestFormCreateObject, setRequestFormCreateObject] = useState({
    request_form_ID: "",
    request_form_student_ID: 0,
    request_form_title: "",
    request_form_description: "",
    request_form_create_datetime: "",
    request_form_attached_file: "",
    request_form_teacher_ID: 0,
    request_form_teacher_status: 1,
    request_form_teacher_description: "",
    request_form_teacher_change_datetime: "",
    request_form_head_ID: 0,
    request_form_head_status: 1,
    request_form_head_description: "",
    request_form_head_change_datetime: "",
  });
  const [requestFormFile, setRequestFormFile] = useState(null);
  const [requestFormFileName, setRequestFormFileName] = useState("");

  const [validationErrors, setValidationErrors] = useState({
    request_form_title: "",
    request_form_description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);

  const handleModalClose = () => {
    setRequestFormCreateObject({
      request_form_ID: "",
      request_form_student_ID: 0,
      request_form_title: "",
      request_form_description: "",
      request_form_create_datetime: "",
      request_form_attached_file: "",
      request_form_teacher_ID: 0,
      request_form_teacher_status: 1,
      request_form_teacher_description: "",
      request_form_teacher_change_datetime: "",
      request_form_head_ID: 0,
      request_form_head_status: 1,
      request_form_head_description: "",
      request_form_head_change_datetime: "",
    });
    setValidationErrors({
      request_form_title: "",
      request_form_description: "",
    });
    setRequestFormFile(null);
    setRequestFormFileName("");

    setIsCreateSuccess(false);
    setIsSubmitting(false);

    onModalClose();
  };

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const submissionStatus = await handleRequestFormCreate(
      requestFormCreateObject,
      userInfo.profile_ID,
      requestFormFile,
      requestFormFileName,
      setValidationErrors
    );

    if (submissionStatus) {
      fetchRequestForms();

      setIsSubmitting(false);
      setIsCreateSuccess(true);
    } else {
      setIsSubmitting(false);
      setIsCreateSuccess(false);
    }
  };

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-plus"
      title={t("RequestForms_students_create_modal_header")}>
      <div className="grid grid-cols-1 gap-4">
        {/* Title */}
        <TextField_text
          label={t("RequestForms_students_create_modal_title_label")}
          name="request_form_title"
          className="col-span-1"
          object={requestFormCreateObject}
          setObject={setRequestFormCreateObject}
          validation={validationErrors.request_form_title}
        />
        {/* Description */}
        <TextField_multiline
          label={t("RequestForms_students_create_modal_description_label")}
          name="request_form_description"
          className="col-span-1"
          object={requestFormCreateObject}
          setObject={setRequestFormCreateObject}
          validation={validationErrors.request_form_description}
          maxRows={4}
        />
        {/* File */}
        <Custom_FileFields
          file={requestFormFile}
          setFile={setRequestFormFile}
          fileName={requestFormFileName}
          setFileName={setRequestFormFileName}
          fileLabel={t("RequestForms_students_create_modal_file_label")}
          fileSizeNoticeMessage={t(
            "RequestForms_students_create_modal_file_fileSizeNotice_message"
          )}
        />
        {/* Submit button */}
        <Info_submit_button
          text={t("RequestForms_students_create_modal_submit_button_title")}
          successText={t(
            "RequestForms_students_create_modal_submit_success_message"
          )}
          icon="fa-solid fa-folder"
          isSubmitting={isSubmitting}
          isSuccess={isCreateSuccess}
          onClickFunction={setObjectAndSubmit}
        />
      </div>
    </Custom_Modal>
  );
};

export default RequestForms_modal_create;