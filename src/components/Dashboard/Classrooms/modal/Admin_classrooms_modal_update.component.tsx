import { useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { Classroom, Major, Teacher } from "../../../../interfaces/common.interface";
import Custom_Modal from "../../../custom/Custom_Modal";
import {
  TextField_select,
  TextField_text,
} from "../../../custom/Custom_TextFields";
import { handleClassroomUpdate } from "../../../../functions/Classrooms/Admin_classrooms.function";
import Info_submit_button from "../../Buttons/Info_submit_button.component";
import {
  Major_Name,
  Major_Name_German,
  Major_Name_Korean,
  Major_Name_Thai,
} from "../../../../constants/Majors.constant";

// Contexts //
import { useContext_Teachers } from "../../../../context/Teachers.context";
import { useContext_Majors } from "../../../../context/Majors.context";
import { useContext_Classrooms } from "../../../../context/Classrooms.context";

interface CurrentComponentProp {
  classroom: Classroom;
  open: boolean;
  onModalClose: () => void;
}

const Admin_classrooms_modal_update = (props: CurrentComponentProp) => {
  const { classroom, open, onModalClose } = props;

  const { fetchClassrooms } = useContext_Classrooms();
  const { teachers, fetchTeachers } = useContext_Teachers();
  const { majors, fetchMajors } = useContext_Majors();

  const { t } = useTranslation();

  useEffect(() => {
    if (majors.length === 0) {
      fetchMajors();
    }
    if (teachers.length === 0) {
      fetchTeachers();
    }
  }, []);

  const [classroomUpdateObject, setClassroomUpdateObject] = useState({
    classroom_ID: classroom.classroom_ID,
    classroom_level: classroom.classroom_level,
    classroom_class: classroom.classroom_class,
    classroom_major: classroom.classroom_major,
    classroom_homeroom_teacher: classroom.classroom_homeroom_teacher,
  });

  const [validationErrors, setValidationErrors] = useState({
    classroom_level: "",
    classroom_class: "",
    classroom_major: "",
    classroom_homeroom_teacher: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  const handleModalClose = () => {
    setClassroomUpdateObject({
      classroom_ID: classroom.classroom_ID,
      classroom_level: classroom.classroom_level,
      classroom_class: classroom.classroom_class,
      classroom_major: classroom.classroom_major,
      classroom_homeroom_teacher: classroom.classroom_homeroom_teacher,
    });
    setValidationErrors({
      classroom_level: "",
      classroom_class: "",
      classroom_major: "",
      classroom_homeroom_teacher: "",
    });

    setIsSubmitting(false);
    setIsUpdateSuccess(false);

    onModalClose();
  };

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const submissionStatus = await handleClassroomUpdate(
      classroomUpdateObject,
      setValidationErrors
    );

    if (submissionStatus) {
      fetchClassrooms();

      setIsSubmitting(false);
      setIsUpdateSuccess(true);
    } else {
      setIsSubmitting(false);
      setIsUpdateSuccess(false);
    }
  };

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-pencil"
      title={t("Admin_Classrooms_update_modal_header")}>
      <div className="grid grid-cols-1 gap-4">
        <div className="col-span-1 grid grid-cols-2 gap-4">
          {/* Classroom level */}
          <TextField_select
            label={t("Admin_Classrooms_crud_modal_level_label")}
            name="classroom_level"
            className="col-span-1"
            object={classroomUpdateObject}
            setObject={setClassroomUpdateObject}
            value={classroomUpdateObject.classroom_level}
            validation={validationErrors.classroom_level}>
            <option value="0">
              {t("Admin_Classrooms_crud_modal_level_option1")}
            </option>
            <option value="1">
              {t("Admin_Classrooms_crud_modal_level_option_lower1")}
            </option>
            <option value="2">
              {t("Admin_Classrooms_crud_modal_level_option_lower2")}
            </option>
            <option value="3">
              {t("Admin_Classrooms_crud_modal_level_option_lower3")}
            </option>
            <option value="4">
              {t("Admin_Classrooms_crud_modal_level_option_higher1")}
            </option>
            <option value="5">
              {t("Admin_Classrooms_crud_modal_level_option_higher2")}
            </option>
          </TextField_select>
          {/* Classroom class */}
          <TextField_text
            label={t("Admin_Classrooms_crud_modal_class_label")}
            name="classroom_class"
            className="col-span-1"
            object={classroomUpdateObject}
            setObject={setClassroomUpdateObject}
            value={classroomUpdateObject.classroom_class}
            validation={validationErrors.classroom_class}
          />
        </div>
        {/* Classroom major */}
        <TextField_select
          label={t("Admin_Classrooms_crud_modal_major_label")}
          name="classroom_major"
          className="col-span-1"
          object={classroomUpdateObject}
          setObject={setClassroomUpdateObject}
          value={classroomUpdateObject.classroom_major}
          validation={validationErrors.classroom_major}>
          <option value="0">Major</option>
          {majors.map((major: Major) => (
            <option key={major.major_ID} value={major.major_ID}>
              {i18n.language === "th"
                ? Major_Name_Thai[major.major_ID]
                : i18n.language === "ko"
                ? Major_Name_Korean[major.major_ID]
                : i18n.language === "de"
                ? Major_Name_German[major.major_ID]
                : Major_Name[major.major_ID]}
            </option>
          ))}
        </TextField_select>
        {/* Classroom homeroom teacher */}
        <TextField_select
          label={t("Admin_Classrooms_crud_modal_teachers_label")}
          name="classroom_homeroom_teacher"
          className="col-span-1"
          object={classroomUpdateObject}
          setObject={setClassroomUpdateObject}
          value={classroomUpdateObject.classroom_homeroom_teacher}
          validation={validationErrors.classroom_homeroom_teacher}>
          <option value="0">No teacher</option>
          {teachers.map((teacher: Teacher) => (
            <option key={teacher.teacher_ID} value={teacher.teacher_ID}>
              {teacher.teacher_ID} - {teacher.teacher_first_name}{" "}
              {teacher.teacher_last_name}
            </option>
          ))}
        </TextField_select>
        {/* Submit button */}
        <Info_submit_button
          text={t("Admin_Classrooms_update_modal_submit_button_title")}
          successText={t(
            "Admin_Classrooms_update_modal_submit_success_message"
          )}
          icon="fa-solid fa-pencil"
          isSubmitting={isSubmitting}
          isSuccess={isUpdateSuccess}
          onClickFunction={() => {
            setObjectAndSubmit();
          }}
        />
      </div>
    </Custom_Modal>
  );
};

export default Admin_classrooms_modal_update;
