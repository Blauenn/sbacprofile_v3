import { useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../custom/Custom_Modal";
import { teacher_access_only } from "../../../../functions/permissionChecks.function";
import LeaveNotices_modal_content from "../../LeaveNotices_modal_content.component";
import LeaveNotices_evaluate_button from "../../LeaveNotices_evaluate_button.component";
import Teacher_leaveNotices_evaluate_modal from "./Teacher_leaveNotices_evaluate_modal.component";

// Contexts //
import { useContext_Account } from "../../../../context/Account.context";

interface CurrentComponentProp {
  leaveNotice: any;
  open: boolean;
  onModalClose: any;
}

const Teacher_leaveNotices_modal = (props: CurrentComponentProp) => {
  const { leaveNotice, open, onModalClose } = props;

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
      title={t("LeaveNotices_teachers_view_modal_header")}>
      <div className="flex flex-col w-full gap-4">
        <LeaveNotices_modal_content leaveNotice={leaveNotice} />
        {teacher_access_only(userInfo.profile_position) ? (
          <>
            <Teacher_leaveNotices_evaluate_modal
              leaveNotice={leaveNotice}
              open={evaluateModalOpen}
              onModalClose={onEvaluateModalClose}
            />
            <LeaveNotices_evaluate_button
              leaveNotice={leaveNotice}
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

export default Teacher_leaveNotices_modal;
