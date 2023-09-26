import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../../custom/Custom_Modal";

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
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-pencil"
      title={t("Admin_Clubs_create_modal_header")}
      overflow={true}>
      <div className="grid grid-cols-1 gap-4">
        <h1>TODO: Please build this</h1>
      </div>
    </Custom_Modal>
  );
};

export default Admin_club_modal_create;
