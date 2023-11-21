import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LeaveNotice } from "../../../../interfaces/common.interface";
import Custom_Modal from "../../../custom/Custom_Modal";
import {
  head_access_only,
  teacher_access_only,
} from "../../../../functions/permissionChecks.function";
import LeaveNotices_modal_content from "./LeaveNotices_modal_content.component";
import LeaveNotices_modal_evaluate from "./evaluate/LeaveNotices_modal_evaluate.component";
import LeaveNotices_evaluate_button from "./evaluate/LeaveNotices_evaluate_button.component";

// Contexts //
import { useContext_Account } from "../../../../context/Account.context";

interface CurrentComponentProp {
  leaveNotice: LeaveNotice;
  open: boolean;
  onModalClose: () => void;
}

const LeaveNotices_modal = (props: CurrentComponentProp) => {
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
      title={t("LeaveNotices_teachers_view_modal_header")}
      overflow>
      <div className="flex flex-col w-full gap-4">
        <LeaveNotices_modal_content leaveNotice={leaveNotice} />
        {teacher_access_only(userInfo.profile_position) ||
        head_access_only(userInfo.profile_position) ? (
          <>
            <LeaveNotices_modal_evaluate
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

export default LeaveNotices_modal;
