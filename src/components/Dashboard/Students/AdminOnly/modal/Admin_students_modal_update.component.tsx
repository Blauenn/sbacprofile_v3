import { useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import {
  TextField_select,
  TextField_text,
} from "../../../../custom/Custom_TextFields";
import Custom_Modal from "../../../../custom/Custom_Modal";
import { ImageField_profile } from "../../../../custom/Custom_ImageFields";
import { Major } from "../../../../../interfaces/common.interface";
import { handleStudentUpdate } from "../../../../../functions/Admin/Students/Admin_students.function";
import Info_submit_button from "../../../Buttons/Info_submit_button.component";
import {
  Major_Name,
  Major_Name_German,
  Major_Name_Korean,
  Major_Name_Thai,
} from "../../../../../constants/Majors.constant";

// Contexts //
import { useContext_Majors } from "../../../../../context/Majors.context";
import { useContext_Students } from "../../../../../context/Students.context";

interface CurrentComponentProp {
  student: any;
  open: boolean;
  onModalClose: any;
}

const Admin_students_modal_update = (props: CurrentComponentProp) => {
  const { student, open, onModalClose } = props;

  const { fetchStudents } = useContext_Students();
  const { majors, fetchMajors } = useContext_Majors();

  const { t } = useTranslation();

  useEffect(() => {
    if (majors.length === 0) {
      fetchMajors();
    }
  }, []);

  const [studentUpdateObject, setStudentUpdateObject] = useState({
    primary_student_ID: student.primary_student_ID,
    student_ID: student.student_ID,
    student_position: student.student_position,
    student_first_name: student.student_first_name,
    student_last_name: student.student_last_name,
    student_nickname: student.student_nickname,
    student_first_name_thai: student.student_first_name_thai,
    student_last_name_thai: student.student_last_name_thai,
    student_nickname_thai: student.student_nickname_thai,
    student_gender: student.student_gender,
    student_major: student.student_major,
    student_level: student.student_level,
    student_class: student.student_class,
    student_phone: student.student_phone,
    student_line_ID: student.student_line_ID,
    student_image: student.student_image,
    student_email: student.student_email,
  });
  const [validationErrors, setValidationErrors] = useState({
    student_ID: "",
    student_position: "",
    student_first_name: "",
    student_last_name: "",
    student_nickname: "",
    student_first_name_thai: "",
    student_last_name_thai: "",
    student_nickname_thai: "",
    student_gender: "",
    student_major: "",
    student_level: "",
    student_class: "",
    student_phone: "",
    student_line_ID: "",
    student_email: "",
  });
  const [studentUpdateImage, setStudentUpdateImage] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);
  const [fileSizeNotice, setFileSizeNotice] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  const handleModalClose = () => {
    setStudentUpdateObject({
      primary_student_ID: student.primary_student_ID,
      student_ID: student.student_ID,
      student_position: student.student_position,
      student_first_name: student.student_first_name,
      student_last_name: student.student_last_name,
      student_nickname: student.student_nickname,
      student_first_name_thai: student.student_first_name_thai,
      student_last_name_thai: student.student_last_name_thai,
      student_nickname_thai: student.student_nickname_thai,
      student_major: student.student_major,
      student_gender: student.student_gender,
      student_level: student.student_level,
      student_class: student.student_class,
      student_phone: student.student_phone,
      student_line_ID: student.student_line_ID,
      student_image: student.student_image,
      student_email: student.student_email,
    });
    setValidationErrors({
      student_ID: "",
      student_position: "",
      student_first_name: "",
      student_last_name: "",
      student_nickname: "",
      student_first_name_thai: "",
      student_last_name_thai: "",
      student_nickname_thai: "",
      student_gender: "",
      student_major: "",
      student_level: "",
      student_class: "",
      student_phone: "",
      student_line_ID: "",
      student_email: "",
    });
    setStudentUpdateImage(null);

    setImagePreview(null);
    setFileSizeNotice(false);

    setIsSubmitting(false);
    setIsUpdateSuccess(false);

    onModalClose();
  };

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const submissionStatus = await handleStudentUpdate(
      studentUpdateObject,
      studentUpdateImage,
      setValidationErrors
    );

    if (submissionStatus) {
      fetchStudents();

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
      title={t("Admin_Students_update_modal_header")}
      overflow>
      <div className="grid grid-cols-1 gap-4">
        <div className="col-span-1 mb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:gap-2 w-full">
            <div className="flex justify-center mx-12">
              <label htmlFor="student_update_image">
                <div className="flex flex-col items-center gap-2">
                  <ImageField_profile
                    imageObject={studentUpdateImage}
                    fieldName="student_update_image"
                    profile_image={student.student_image}
                    profile_major={student.student_major}
                    imagePreview={imagePreview || ""}
                    setImagePreview={setImagePreview}
                    setImage={setStudentUpdateImage}
                    setFileSizeNotice={setFileSizeNotice}
                  />
                  {fileSizeNotice && (
                    <h1 className="text-sm text-red-500 mb-2">
                      {t("fileSizeNotice_20MB")}
                    </h1>
                  )}
                </div>
              </label>
            </div>
            <div className="flex flex-col justify-center gap-4">
              {/* Student position */}
              <TextField_select
                label={t("Admin_Students_crud_modal_position_label")}
                name="student_position"
                className="col-span-1"
                object={studentUpdateObject}
                setObject={setStudentUpdateObject}
                value={studentUpdateObject.student_position}
                validation={validationErrors.student_position}>
                <option value="0">
                  {t("Admin_Students_crud_modal_position_option1")}
                </option>
                <option value="1">
                  {t("Admin_Students_crud_modal_position_option2")}
                </option>
                <option value="2">
                  {t("Admin_Students_crud_modal_position_option3")}
                </option>
              </TextField_select>
              {/* Student ID */}
              <TextField_text
                label={t("Admin_Students_crud_modal_ID_label")}
                name="student_ID"
                className="col-span-1"
                object={studentUpdateObject}
                setObject={setStudentUpdateObject}
                value={studentUpdateObject.student_ID}
                validation={validationErrors.student_ID}
              />
            </div>
          </div>
        </div>
        {/* Student major */}
        <TextField_select
          label={t("Admin_Students_crud_modal_major_label")}
          name="student_major"
          className="col-span-1"
          object={studentUpdateObject}
          setObject={setStudentUpdateObject}
          value={studentUpdateObject.student_major}
          validation={validationErrors.student_major}>
          <option value="0">
            {t("Admin_Students_crud_modal_major_label")}
          </option>
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
        <div className="col-span-1 grid grid-cols-2 gap-4 mb-4">
          {/* Student level */}
          <TextField_select
            label={t("Admin_Students_crud_modal_level_label")}
            name="student_level"
            className="col-span-1"
            object={studentUpdateObject}
            setObject={setStudentUpdateObject}
            value={studentUpdateObject.student_level}
            validation={validationErrors.student_level}>
            <option value="0">
              {t("Admin_Students_crud_modal_level_option1")}
            </option>
            <option value="1">
              {t("Admin_Students_crud_modal_level_option_lower1")}
            </option>
            <option value="2">
              {t("Admin_Students_crud_modal_level_option_lower2")}
            </option>
            <option value="3">
              {t("Admin_Students_crud_modal_level_option_lower3")}
            </option>
            <option value="4">
              {t("Admin_Students_crud_modal_level_option_higher1")}
            </option>
            <option value="5">
              {t("Admin_Students_crud_modal_level_option_higher2")}
            </option>
          </TextField_select>
          {/* Student class */}
          <TextField_text
            label={t("Admin_Students_crud_modal_class_label")}
            name="student_class"
            className="col-span-1"
            object={studentUpdateObject}
            setObject={setStudentUpdateObject}
            value={studentUpdateObject.student_class}
            validation={validationErrors.student_class}
          />
        </div>
        {/* Gender */}
        <TextField_select
          label={t("Admin_Students_crud_modal_gender_label")}
          name="student_gender"
          className="col-span-1"
          object={studentUpdateObject}
          setObject={setStudentUpdateObject}
          value={studentUpdateObject.student_gender}
          validation={validationErrors.student_gender}>
          <option value="0">
            {t("Admin_Students_crud_modal_gender_option1")}
          </option>
          <option value="2">
            {t("Admin_Students_crud_modal_gender_option2")}
          </option>
          <option value="3">
            {t("Admin_Students_crud_modal_gender_option3")}
          </option>
          <option value="1">
            {t("Admin_Students_crud_modal_gender_option4")}
          </option>
        </TextField_select>
        <div className="col-span-1 grid grid-cols-2 gap-4">
          {/* Student English first name */}
          <TextField_text
            label={t("Admin_Students_crud_modal_firstName_label")}
            name="student_first_name"
            className="col-span-1"
            object={studentUpdateObject}
            setObject={setStudentUpdateObject}
            value={studentUpdateObject.student_first_name}
            validation={validationErrors.student_first_name}
          />
          {/* Student English last name */}
          <TextField_text
            label={t("Admin_Students_crud_modal_lastName_label")}
            name="student_last_name"
            className="col-span-1"
            object={studentUpdateObject}
            setObject={setStudentUpdateObject}
            value={studentUpdateObject.student_last_name}
            validation={validationErrors.student_last_name}
          />
        </div>
        <div className="col-span-1 grid grid-cols-2 gap-4">
          {/* Student Thai first name */}
          <TextField_text
            label={t("Admin_Students_crud_modal_firstNameThai_label")}
            name="student_first_name_thai"
            className="col-span-1"
            object={studentUpdateObject}
            setObject={setStudentUpdateObject}
            value={studentUpdateObject.student_first_name_thai}
            validation={validationErrors.student_first_name_thai}
          />
          {/* Student Thai last name */}
          <TextField_text
            label={t("Admin_Students_crud_modal_lastNameThai_label")}
            name="student_last_name_thai"
            className="col-span-1"
            object={studentUpdateObject}
            setObject={setStudentUpdateObject}
            value={studentUpdateObject.student_last_name_thai}
            validation={validationErrors.student_last_name_thai}
          />
        </div>
        <div className="col-span-1 grid grid-cols-2 gap-4 mb-4">
          {/* Student English nickname */}
          <TextField_text
            label={t("Admin_Students_crud_modal_nickname_label")}
            name="student_nickname"
            className="col-span-1"
            object={studentUpdateObject}
            setObject={setStudentUpdateObject}
            value={studentUpdateObject.student_nickname}
            validation={validationErrors.student_nickname}
          />
          {/* Student Thai nickname */}
          <TextField_text
            label={t("Admin_Students_crud_modal_nicknameThai_label")}
            name="student_nickname_thai"
            className="col-span-1"
            object={studentUpdateObject}
            setObject={setStudentUpdateObject}
            value={studentUpdateObject.student_nickname_thai}
            validation={validationErrors.student_nickname_thai}
          />
        </div>
        {/* Student email */}
        <TextField_text
          label={t("Admin_Students_crud_modal_email_label")}
          name="student_email"
          className="col-span-1"
          object={studentUpdateObject}
          setObject={setStudentUpdateObject}
          value={studentUpdateObject.student_email}
          validation={validationErrors.student_email}
        />
        <div className="col-span-1 grid grid-cols-2 gap-4 mb-4">
          {/* Student phone */}
          <TextField_text
            label={t("Admin_Students_crud_modal_phone_label")}
            name="student_phone"
            className="col-span-1"
            object={studentUpdateObject}
            setObject={setStudentUpdateObject}
            value={studentUpdateObject.student_phone}
            validation={validationErrors.student_phone}
          />
          {/* Student Line ID */}
          <TextField_text
            label={t("Admin_Students_crud_modal_lineID_label")}
            name="student_line_ID"
            className="col-span-1"
            object={studentUpdateObject}
            setObject={setStudentUpdateObject}
            value={studentUpdateObject.student_line_ID}
            validation={validationErrors.student_line_ID}
          />
        </div>
        {/* Submit button */}
        <Info_submit_button
          text={t("Admin_Students_update_modal_submit_button_title")}
          successText={t("Admin_Students_update_modal_submit_success_message")}
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

export default Admin_students_modal_update;
