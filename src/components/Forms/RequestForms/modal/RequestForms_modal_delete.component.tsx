import { useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../custom/Custom_Modal";
import { RequestForm } from "../../../../interfaces/common.interface";
import Info_submit_button from "../../../Dashboard/Buttons/Info_submit_button.component";

// Contexts //
import { useContext_RequestForms } from "../../../../context/RequestForms.context";
import { handleRequestFormDelete } from "../../../../functions/Forms/RequestForms/RequestForms.function";

interface CurrentComponentProp {
  requestForm: RequestForm;
  open: boolean;
  onModalClose: () => void;
}

const RequestForms_modal_delete = (props: CurrentComponentProp) => {
  const { requestForm, open, onModalClose } = props;

  const { fetchRequestForms } = useContext_RequestForms();

  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  const handleModalClose = () => {
    setIsSubmitting(false);
    setIsDeleteSuccess(false);

    onModalClose();
  };

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const submissionStatus = await handleRequestFormDelete(
      requestForm.request_form_ID
    );

    if (submissionStatus) {
      fetchRequestForms();

      setIsSubmitting(false);
      setIsDeleteSuccess(true);

      handleModalClose();
    } else {
      setIsSubmitting(false);
      setIsDeleteSuccess(false);
    }

    setIsDeleteSuccess(true);
  };

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-trash-can"
      title={t("RequestForms_students_delete_modal_header")}>
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-4">
          <h1 className="opacity-50">
            {t("RequestForms_students_delete_modal_message")}
          </h1>
          <div className="flex flex-col gap-1 mb-2 border rounded-xl p-4">
            <h1 className="text-2xl">{requestForm.request_form_title}</h1>
            <h1 className="text-lg opacity-50">
              {requestForm.request_form_description}
            </h1>
          </div>
          {/* Submit button */}
          <Info_submit_button
            text={t("RequestForms_students_delete_modal_submit_button_title")}
            successText={t(
              "RequestForms_students_delete_modal_submit_success_message"
            )}
            icon="fa-solid fa-trash-can"
            color="border-red-500 hover:bg-red-500 text-red-500"
            isSubmitting={isSubmitting}
            isSuccess={isDeleteSuccess}
            onClickFunction={setObjectAndSubmit}
          />
        </div>
      </div>
    </Custom_Modal>
  );
};

export default RequestForms_modal_delete;
