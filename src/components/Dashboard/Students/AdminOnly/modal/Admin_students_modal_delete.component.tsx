import { useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../../custom/Custom_Modal";
import { getData } from "../../../../../functions/fetchFromAPI.function";
import { handleStudentDelete } from "../../../../../functions/Admin/Students/Admin_students.function";
import Info_submit_button from "../../../Buttons/Info_submit_button.component";
import { API_ENDPOINT, CDN_ENDPOINT } from "../../../../../constants/ENDPOINTS";

// Contexts //
import { useContext_Students } from "../../../../../context/Students.context";
import { Major_To_Background_Color } from "../../../../../constants/Majors.constant";

interface CurrentComponentProp {
  student: any;
  open: boolean;
  onModalClose: any;
}

const Admin_students_modal_delete = (props: CurrentComponentProp) => {
  const { student, open, onModalClose } = props;

  const { setStudents, setStudentCount } = useContext_Students();

  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  const handleModalClose = () => {
    onModalClose();
  };

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const submissionStatus = await handleStudentDelete(
      student.primary_student_ID
    );

    if (submissionStatus) {
      // Students //
      getData(`${API_ENDPOINT}/api/v1/student/getAll`, (result: any) => {
        setStudents(result);
        setStudentCount(result.length);
      });

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
      title={t("Admin_Students_delete_modal_header")}>
      <div className="flex flex-col gap-8 w-full">
        <h1 className="text-xl opacity-50">
          {t("Admin_Students_delete_modal_message")}
        </h1>
        <div className="flex flex-row items-center gap-4">
          <img
            className={`w-[120px] h-[120px] rounded-full ${
              Major_To_Background_Color[student.student_major]
            }`}
            src={`${CDN_ENDPOINT}${student.student_image}`}
          />
          <h1 className="text-2xl font-semibold">
            {student.student_first_name} {student.student_last_name}
          </h1>
        </div>
        {/* Submit button */}
        <Info_submit_button
          text={t("Admin_Students_delete_modal_submit_button_title")}
          successText={t("Admin_Students_delete_modal_submit_success_message")}
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

export default Admin_students_modal_delete;
