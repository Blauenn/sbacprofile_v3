import { useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../../custom/Custom_Modal";
import { handleTeacherDelete } from "../../../../../functions/Admin/Teachers/Admin_teachers.function";
import Info_submit_button from "../../../Buttons/Info_submit_button.component";
import { ImageField_profile_image_styles } from "../../../../../constants/styles/image.style";
import { CDN_ENDPOINT } from "../../../../../constants/ENDPOINTS";

// Contexts //
import { useContext_Teachers } from "../../../../../context/Teachers.context";

interface CurrentComponentProp {
  teacher: any;
  open: boolean;
  onModalClose: any;
}

const Admin_teachers_modal_delete = (props: CurrentComponentProp) => {
  const { teacher, open, onModalClose } = props;

  const { fetchTeachers } = useContext_Teachers();

  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  const handleModalClose = () => {
    onModalClose();
  };

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const submissionStatus = await handleTeacherDelete(
      teacher.primary_teacher_ID
    );

    if (submissionStatus) {
      fetchTeachers();

      setIsSubmitting(false);
      setIsDeleteSuccess(true);

      handleModalClose();
    } else {
      setIsSubmitting(false);
      setIsDeleteSuccess(false);
    }
  };

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-trash-can"
      title={t("Admin_Teachers_delete_modal_header")}>
      <div className="flex flex-col gap-8 w-full">
        <h1 className="opacity-50">
          {t("Admin_Teachers_delete_modal_message")}
        </h1>
        <div className="flex flex-row items-center gap-4">
          <div className={`${ImageField_profile_image_styles} bg-primary`}>
            <img src={`${CDN_ENDPOINT}${teacher.teacher_image}`} />
          </div>
          <h1 className="text-2xl font-semibold">
            {teacher.teacher_first_name} {teacher.teacher_last_name}
          </h1>
        </div>
        {/* Submit button */}
        <Info_submit_button
          text={t("Admin_Teachers_delete_modal_submit_button_title")}
          successText={t("Admin_Teachers_delete_modal_submit_success_message")}
          icon="fa-solid fa-trash-can"
          color="border-red-500 hover:bg-red-500 text-red-500"
          isSubmitting={isSubmitting}
          isSuccess={isDeleteSuccess}
          onClickFunction={setObjectAndSubmit}
        />
      </div>
    </Custom_Modal>
  );
};

export default Admin_teachers_modal_delete;
