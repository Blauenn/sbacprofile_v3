import { Modal } from "@mui/material";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { Classroom } from "../../../../interfaces/common.interface";
import ModalCloseButton from "../../../misc/common/ModalCloseButton.component";
import { style_modal_parent } from "../../../../constants/styles/modal.style";

interface CurrentComponentProp {
  classroom: Classroom;
  open: boolean;
  onModalClose: any;
}

const Admin_classroom_modal_update = (props: CurrentComponentProp) => {
  const { classroom, open, onModalClose } = props;

  const { t } = useTranslation();

  const handleModalClose = () => {
    onModalClose();
  };

  const modal = document.getElementById("modal");

  return modal
    ? createPortal(
        <>
          <Modal
            open={open}
            onClose={handleModalClose}
            className="flex justify-center items-center"
            sx={{ backdropFilter: "blur(2px)" }}>
            <div className={style_modal_parent}>
              <ModalCloseButton functionToRun={handleModalClose} />
              <div className="flex flex-col py-8 px-4 w-full lg:gap-x-4">
                <h1 className="text-2xl font-semibold mb-8">
                  <i className="fa-solid fa-pencil me-2"></i>
                  {t("Admin_Classrooms_update_modal_header")}
                </h1>
                <div className="grid grid-cols-1 gap-4">
                    TODO: Please build this
                </div>
              </div>
            </div>
          </Modal>
        </>,
        modal
      )
    : null;
};

export default Admin_classroom_modal_update;
