import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../custom/Custom_Modal";
import { LeaveNotice } from "../../../../interfaces/common.interface";

interface CurrentComponentProp {
  open: boolean;
  onModalClose: any;
  leaveNotice: LeaveNotice;
}

const Admin_leaveNotice_modal = (props: CurrentComponentProp) => {
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
      <div className="flex flex-col w-full bg-red-500">
        <div className="flex gap-4">
          <img src="" />
        </div>
        <div>
          <h1 className="text-xl">{leaveNotice.leave_notice_description}</h1>
        </div>
      </div>
    </Custom_Modal>
  );
};

export default Admin_leaveNotice_modal;
