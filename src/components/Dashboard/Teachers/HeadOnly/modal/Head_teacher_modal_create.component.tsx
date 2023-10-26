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
import { getData } from "../../../../../functions/fetchFromAPI.function";
import {
  Major_Name,
  Major_Name_German,
  Major_Name_Korean,
  Major_Name_Thai,
} from "../../../../../constants/Majors.constant";
import { API_ENDPOINT } from "../../../../../constants/ENDPOINTS";

// Contexts //
import { useContext_Majors } from "../../../../../context/Majors.context";
import Info_submit_button from "../../../Buttons/Info_submit_button.component";
import { handleTeacherCreate } from "../../../../../functions/Admin/Teachers/Admin_teachers.function";
import { useContext_Teachers } from "../../../../../context/Teachers.context";
import { useContext_Account } from "../../../../../context/Account.context";

interface CurrentComponentProp {
  open: boolean;
  onModalClose: any;
}

const Head_teacher_modal_create = (props: CurrentComponentProp) => {
  const { open, onModalClose } = props;

  const { setTeachers } = useContext_Teachers();
  const { majors, setMajors } = useContext_Majors();
  const { userInfo } = useContext_Account();

  const { t } = useTranslation();

  useEffect(() => {
    // Majors //
    if (majors.length === 0) {
      getData(`${API_ENDPOINT}/api/v1/major/getAll`, (result: any) => {
        setMajors(result);
      });
    }
  }, []);

  const [teacherCreateObject, setTeacherCreateObject] = useState({
    teacher_ID: "",
    teacher_position: 0,
    teacher_first_name: "",
    teacher_last_name: "",
    teacher_nickname: "",
    teacher_first_name_thai: "",
    teacher_last_name_thai: "",
    teacher_nickname_thai: "",
    teacher_gender: 0,
    teacher_major: userInfo.profile_major,
    teacher_phone: "",
    teacher_line_ID: "",
    teacher_image: "",
    teacher_email: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    teacher_ID: "",
    teacher_position: "",
    teacher_first_name: "",
    teacher_last_name: "",
    teacher_nickname: "",
    teacher_first_name_thai: "",
    teacher_last_name_thai: "",
    teacher_nickname_thai: "",
    teacher_gender: "",
    teacher_major: "",
    teacher_phone: "",
    teacher_line_ID: "",
    teacher_email: "",
    teacher_image: "",
  });
  const [teacherCreateImage, setTeacherCreateImage] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);
  const [fileSizeNotice, setFileSizeNotice] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);

  const handleModalClose = () => {
    setTeacherCreateObject({
      teacher_ID: "",
      teacher_position: 0,
      teacher_first_name: "",
      teacher_last_name: "",
      teacher_nickname: "",
      teacher_first_name_thai: "",
      teacher_last_name_thai: "",
      teacher_nickname_thai: "",
      teacher_gender: 0,
      teacher_major: userInfo.profile_major,
      teacher_phone: "",
      teacher_line_ID: "",
      teacher_image: "",
      teacher_email: "",
    });
    setValidationErrors({
      teacher_ID: "",
      teacher_position: "",
      teacher_first_name: "",
      teacher_last_name: "",
      teacher_nickname: "",
      teacher_first_name_thai: "",
      teacher_last_name_thai: "",
      teacher_nickname_thai: "",
      teacher_gender: "",
      teacher_major: "",
      teacher_phone: "",
      teacher_line_ID: "",
      teacher_email: "",
      teacher_image: "",
    });
    setTeacherCreateImage(null);

    setImagePreview(null);
    setFileSizeNotice(false);

    setIsSubmitting(false);
    setIsCreateSuccess(false);

    onModalClose();
  };

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const submissionStatus = await handleTeacherCreate(
      teacherCreateObject,
      teacherCreateImage,
      setValidationErrors
    );

    if (submissionStatus) {
      await getData(`${API_ENDPOINT}/api/v1/teacher/getAll`, (result: any) => {
        setTeachers(result);
      });

      setIsSubmitting(false);
      setIsCreateSuccess(true);
    } else {
      setIsSubmitting(false);
      setIsCreateSuccess(false);
    }
  };

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-plus"
      title={t("Admin_Teachers_create_modal_header")}
      altIcon="fa-solid fa-circle-check text-green-500"
      altTitle={t("Admin_Teacher_create_modal_submit_success_message")}
      useAltTitle={isCreateSuccess}
      overflow>
      <div className="grid grid-cols-1 gap-4">
        <div className="col-span-1 mb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:gap-2 w-full">
            <div className="flex justify-center mx-12">
              <label htmlFor="teacher_create_image">
                <div className="flex flex-col items-center gap-2">
                  <ImageField_profile
                    imageObject={teacherCreateImage}
                    fieldName="teacher_create_image"
                    imagePreview={imagePreview || ""}
                    setImagePreview={setImagePreview}
                    setImage={setTeacherCreateImage}
                    setFileSizeNotice={setFileSizeNotice}
                  />
                  {fileSizeNotice && (
                    <h1 className="text-sm text-red-500 mb-2">
                      {t("fileSizeNotice_20MB")}
                    </h1>
                  )}
                  {validationErrors.teacher_image != "" ? (
                    <h1 className="text-sm text-red-500">
                      {validationErrors.teacher_image}
                    </h1>
                  ) : null}
                </div>
              </label>
            </div>
            <div className="flex flex-col justify-center gap-4">
              {/* Teacher position */}
              <TextField_select
                // Disable if the user tries to demote the administrator. //
                label={t("Admin_Teachers_crud_modal_position_label")}
                name="teacher_position"
                className="col-span-1"
                object={teacherCreateObject}
                setObject={setTeacherCreateObject}
                validation={validationErrors.teacher_position}>
                <option value="0">
                  {t("Admin_Teachers_crud_modal_position_option1")}
                </option>
                <option value="3">
                  {t("Admin_Teachers_crud_modal_position_option2")}
                </option>
                <option value="4">
                  {t("Admin_Teachers_crud_modal_position_option3")}
                </option>
              </TextField_select>
              {/* Teacher ID */}
              <TextField_text
                label={t("Admin_Teachers_crud_modal_ID_label")}
                name="teacher_ID"
                className="col-span-1"
                object={teacherCreateObject}
                setObject={setTeacherCreateObject}
                value={teacherCreateObject.teacher_ID}
                validation={validationErrors.teacher_ID}
              />
            </div>
          </div>
        </div>
        {/* Teacher major */}
        <TextField_select
          label={t("Admin_Teachers_crud_modal_major_label")}
          name="teacher_major"
          className="col-span-1"
          object={teacherCreateObject}
          setObject={setTeacherCreateObject}
          value={teacherCreateObject.teacher_major}
          validation={validationErrors.teacher_major}
          disabled>
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
        {/* Gender */}
        <TextField_select
          label={t("Admin_Teachers_crud_modal_gender_label")}
          name="teacher_gender"
          className="col-span-1"
          object={teacherCreateObject}
          setObject={setTeacherCreateObject}
          validation={validationErrors.teacher_gender}>
          <option value="0">
            {t("Admin_Teachers_crud_modal_gender_option1")}
          </option>
          <option value="2">
            {t("Admin_Teachers_crud_modal_gender_option2")}
          </option>
          <option value="3">
            {t("Admin_Teachers_crud_modal_gender_option3")}
          </option>
          <option value="1">
            {t("Admin_Teachers_crud_modal_gender_option4")}
          </option>
        </TextField_select>
        <div className="col-span-1 grid grid-cols-2 gap-4">
          {/* Teacher English first name */}
          <TextField_text
            label={t("Admin_Teachers_crud_modal_firstName_label")}
            name="teacher_first_name"
            className="col-span-1"
            object={teacherCreateObject}
            setObject={setTeacherCreateObject}
            validation={validationErrors.teacher_first_name}
          />
          {/* Teacher English last name */}
          <TextField_text
            label={t("Admin_Teachers_crud_modal_lastName_label")}
            name="teacher_last_name"
            className="col-span-1"
            object={teacherCreateObject}
            setObject={setTeacherCreateObject}
            validation={validationErrors.teacher_last_name}
          />
        </div>
        <div className="col-span-1 grid grid-cols-2 gap-4">
          {/* Teacher Thai first name */}
          <TextField_text
            label={t("Admin_Teachers_crud_modal_firstNameThai_label")}
            name="teacher_first_name_thai"
            className="col-span-1"
            object={teacherCreateObject}
            setObject={setTeacherCreateObject}
            validation={validationErrors.teacher_first_name_thai}
          />
          {/* Teacher Thai last name */}
          <TextField_text
            label={t("Admin_Teachers_crud_modal_lastNameThai_label")}
            name="teacher_last_name_thai"
            className="col-span-1"
            object={teacherCreateObject}
            setObject={setTeacherCreateObject}
            validation={validationErrors.teacher_last_name_thai}
          />
        </div>
        <div className="col-span-1 grid grid-cols-2 gap-4 mb-4">
          {/* Teacher English nickname */}
          <TextField_text
            label={t("Admin_Teachers_crud_modal_nickname_label")}
            name="teacher_nickname"
            className="col-span-1"
            object={teacherCreateObject}
            setObject={setTeacherCreateObject}
            validation={validationErrors.teacher_nickname}
          />
          {/* Teacher Thai nickname */}
          <TextField_text
            label={t("Admin_Teachers_crud_modal_nicknameThai_label")}
            name="teacher_nickname_thai"
            className="col-span-1"
            object={teacherCreateObject}
            setObject={setTeacherCreateObject}
            validation={validationErrors.teacher_nickname_thai}
          />
        </div>
        {/* Teacher email */}
        <TextField_text
          label={t("Admin_Teachers_crud_modal_email_label")}
          name="teacher_email"
          className="col-span-1"
          object={teacherCreateObject}
          setObject={setTeacherCreateObject}
          validation={validationErrors.teacher_email}
        />
        <div className="col-span-1 grid grid-cols-2 gap-4 mb-4">
          {/* Teacher phone */}
          <TextField_text
            label={t("Admin_Teachers_crud_modal_phone_label")}
            name="teacher_phone"
            className="col-span-1"
            object={teacherCreateObject}
            setObject={setTeacherCreateObject}
            validation={validationErrors.teacher_phone}
          />
          {/* Teacher Line ID */}
          <TextField_text
            label={t("Admin_Teachers_crud_modal_lineID_label")}
            name="teacher_line_ID"
            className="col-span-1"
            object={teacherCreateObject}
            setObject={setTeacherCreateObject}
            validation={validationErrors.teacher_line_ID}
          />
        </div>
        {/* Submit button */}
        <Info_submit_button
          text={t("Admin_Teachers_create_modal_submit_button_title")}
          icon="fa-solid fa-pencil"
          isSubmitting={isSubmitting}
          onClickFunction={() => {
            setObjectAndSubmit();
          }}
        />
      </div>
    </Custom_Modal>
  );
};

export default Head_teacher_modal_create;
