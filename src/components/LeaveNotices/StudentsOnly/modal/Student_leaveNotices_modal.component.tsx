import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../custom/Custom_Modal";
import LeaveNotice_modal_content from "../../LeaveNotices_modal_content.component";

interface CurrentComponentProp {
  leaveNotice: any;
  open: boolean;
  onModalClose: any;
}

const Student_leaveNotices_modal = (props: CurrentComponentProp) => {
  const { leaveNotice, open, onModalClose } = props;

  const { t } = useTranslation();

  const handleModalClose = () => {
    onModalClose();
  };

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-flag"
      title={t("LeaveNotices_students_view_modal_header")}>
      <div className="flex flex-col w-full">
        <LeaveNotice_modal_content leaveNotice={leaveNotice} />
      </div>
    </Custom_Modal>
  );
};

export default Student_leaveNotices_modal;
