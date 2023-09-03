import { useTranslation } from "react-i18next";
import { Modal } from "@mui/material";
import ModalCloseButton from "../../../../misc/common/ModalCloseButton.component";
import { style_modal_parent } from "../../../../../constants/styles/modal.style";

interface CurrentComponentProp {
  open: boolean;
  onModalClose: any;
}

const Admin_club_modal_create = (props: CurrentComponentProp) => {
  const { open, onModalClose } = props;

  const { t } = useTranslation();

  const handleModalClose = () => {
    onModalClose();
  };

  return (
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
              <i className="fa-solid fa-plus me-2"></i>
              {t("Admin_Clubs_create_modal_header")}
            </h1>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Admin_club_modal_create;
