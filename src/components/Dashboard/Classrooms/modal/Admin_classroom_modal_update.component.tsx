import { useTranslation } from "react-i18next";
import { Classroom } from "../../../../interfaces/common.interface";
import Custom_Modal from "../../../custom/Custom_Modal";
import { LevelName } from "../../../../constants/Levels.constant";

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

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-pencil"
      title={t("Admin_Classrooms_update_modal_header")}>
      <div className="grid grid-cols-1 gap-4">
        <h1>
          {LevelName[classroom.classroom_level]}/{classroom.classroom_class}
        </h1>
      </div>
    </Custom_Modal>
  );
};

export default Admin_classroom_modal_update;
