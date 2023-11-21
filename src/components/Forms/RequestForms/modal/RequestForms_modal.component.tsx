import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../custom/Custom_Modal";
import { RequestForm } from "../../../../interfaces/common.interface";
import {
  head_access_only,
  teacher_access_only,
} from "../../../../functions/permissionChecks.function";
import RequestForms_modal_content from "./RequestForms_modal_content.component";

// Contexts //
import { useContext_Account } from "../../../../context/Account.context";
import RequestForms_modal_evaluate from "./evaluate/RequestForms_modal_evaluate.component";
import { useState } from "react";
import RequestForms_evaluate_button from "./evaluate/RequestForms_evaluate_button.component";

interface CurrentComponentProp {
  requestForm: RequestForm;
  open: boolean;
  onModalClose: () => void;
}

const RequestForms_modal = (props: CurrentComponentProp) => {
  const { requestForm, open, onModalClose } = props;

  const { userInfo } = useContext_Account();

  const { t } = useTranslation();

  const handleModalClose = () => {
    onModalClose();
  };

  const [evaluateModalOpen, setEvaluateModalOpen] = useState(false);
  const onEvaluateModalClose = () => {
    setEvaluateModalOpen(false);
  };

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-flag"
      title={t("RequestForms_students_view_modal_header")}
      overflow>
      <div className="flex flex-col w-full gap-4">
        <RequestForms_modal_content requestForm={requestForm} />
        {teacher_access_only(userInfo.profile_position) ||
        head_access_only(userInfo.profile_position) ? (
          <>
            <RequestForms_modal_evaluate
              requestForm={requestForm}
              open={evaluateModalOpen}
              onModalClose={onEvaluateModalClose}
            />
            <RequestForms_evaluate_button
              requestForm={requestForm}
              functionToRun={() => {
                setEvaluateModalOpen(true);
              }}
            />
          </>
        ) : null}
      </div>
    </Custom_Modal>
  );
};

export default RequestForms_modal;
