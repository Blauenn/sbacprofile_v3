import { useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { Modal } from "@mui/material";
import {
  TextField_select,
  TextField_text,
} from "../../../../custom/Custom_TextFields";
import { Major } from "../../../../../interfaces/common.interface";
import { getData } from "../../../../../functions/fetchFromAPI.function";
import ModalCloseButton from "../../../../misc/common/ModalCloseButton.component";
import Info_submit_button from "../../../Buttons/Info_submit_button.component";
import { API_ENDPOINT } from "../../../../../constants/ENDPOINTS";
import {
  MajorName,
  MajorNameGerman,
  MajorNameKorean,
  MajorNameThai,
} from "../../../../../constants/Majors.constant";
import { style_modal_parent } from "../../../../../constants/styles/modal.style";

// Contexts //
import { useContext_Majors } from "../../../../../context/Majors.context";

interface CurrentComponentProp {
  open: boolean;
  onModalClose: any;
}

const Admin_student_modal_create = (props: CurrentComponentProp) => {
  const { open, onModalClose } = props;

  const { majors, setMajors } = useContext_Majors();

  const { t } = useTranslation();

  useEffect(() => {
    // Majors //
    // Only fetch when empty //
    if (majors.length === 0) {
      getData(`${API_ENDPOINT}/api/v1/major/getAll`, (result: any) => {
        setMajors(result);
      });
    }
  }, []);

  const [studentToAdd, setStudentToAdd] = useState({
    student_ID: "",
    student_position: 0,
    student_first_name: "",
    student_last_name: "",
    student_nickname: "",
    student_first_name_thai: "",
    student_last_name_thai: "",
    student_nickname_thai: "",
    student_gender: 0,
    student_major: 0,
    student_level: 0,
    student_class: "",
    student_phone: "",
    student_line_ID: "",
    student_image: "",
    student_email: "",
  });
  const [studentAddImage, setStudentAddImage] = useState(null);
  const [studentAddImageName, setStudentAddImageName] = useState("");
  const [fileSizeNotice, setFileSizeNotice] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // To store any validation errors. //
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
              {t("Admin_Students_create_modal_header")}
            </h1>
            <div className="grid grid-cols-1 gap-4">
              <div className="col-span-1 grid grid-cols-2 gap-4">
                {/* Student ID */}
                <TextField_text
                  label={t("Admin_Students_crud_modal_ID_label")}
                  name="student_ID"
                  className="col-span-1"
                  object={studentToAdd}
                  setObject={setStudentToAdd}
                  value={studentToAdd.student_ID}
                  validation={validationErrors.student_ID}
                />
                {/* Student position */}
                <TextField_select
                  label={t("Admin_Students_crud_modal_position_label")}
                  name="student_position"
                  className="col-span-1"
                  object={studentToAdd}
                  setObject={setStudentToAdd}
                  value={studentToAdd.student_position}
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
              </div>
              {/* Student major */}
              <TextField_select
                label={t("Admin_Students_crud_modal_major_label")}
                name="student_major"
                className="col-span-1"
                object={studentToAdd}
                setObject={setStudentToAdd}
                value={studentToAdd.student_major}
                validation={validationErrors.student_major}>
                <option value="0">Major</option>
                {majors.map((major: Major) => (
                  <option key={major.major_ID} value={major.major_ID}>
                    {i18n.language === "th"
                      ? MajorNameThai[major.major_ID]
                      : i18n.language === "ko"
                      ? MajorNameKorean[major.major_ID]
                      : i18n.language === "de"
                      ? MajorNameGerman[major.major_ID]
                      : MajorName[major.major_ID]}
                  </option>
                ))}
              </TextField_select>
              <div className="col-span-1 grid grid-cols-2 gap-4 mb-4">
                {/* Student level */}
                <TextField_select
                  label={t("Admin_Students_crud_modal_level_label")}
                  name="student_level"
                  className="col-span-1"
                  object={studentToAdd}
                  setObject={setStudentToAdd}
                  value={studentToAdd.student_level}
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
                  object={studentToAdd}
                  setObject={setStudentToAdd}
                  value={studentToAdd.student_class}
                  validation={validationErrors.student_class}
                />
              </div>
              {/* Gender */}
              <TextField_select
                label={t("Admin_Students_crud_modal_gender_label")}
                name="student_gender"
                className="col-span-1"
                object={studentToAdd}
                setObject={setStudentToAdd}
                value={studentToAdd.student_gender}
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
                  object={studentToAdd}
                  setObject={setStudentToAdd}
                  value={studentToAdd.student_first_name}
                  validation={validationErrors.student_first_name}
                />
                {/* Student English last name */}
                <TextField_text
                  label={t("Admin_Students_crud_modal_lastName_label")}
                  name="student_last_name"
                  className="col-span-1"
                  object={studentToAdd}
                  setObject={setStudentToAdd}
                  value={studentToAdd.student_last_name}
                  validation={validationErrors.student_last_name}
                />
              </div>
              <div className="col-span-1 grid grid-cols-2 gap-4">
                {/* Student Thai first name */}
                <TextField_text
                  label={t("Admin_Students_crud_modal_firstNameThai_label")}
                  name="student_first_name_thai"
                  className="col-span-1"
                  object={studentToAdd}
                  setObject={setStudentToAdd}
                  value={studentToAdd.student_first_name_thai}
                  validation={validationErrors.student_first_name_thai}
                />
                {/* Student Thai last name */}
                <TextField_text
                  label={t("Admin_Students_crud_modal_lastNameThai_label")}
                  name="student_last_name_thai"
                  className="col-span-1"
                  object={studentToAdd}
                  setObject={setStudentToAdd}
                  value={studentToAdd.student_last_name_thai}
                  validation={validationErrors.student_last_name_thai}
                />
              </div>
              <div className="col-span-1 grid grid-cols-2 gap-4 mb-4">
                {/* Student English nickname */}
                <TextField_text
                  label={t("Admin_Students_crud_modal_nickname_label")}
                  name="student_nickname"
                  className="col-span-1"
                  object={studentToAdd}
                  setObject={setStudentToAdd}
                  value={studentToAdd.student_nickname}
                  validation={validationErrors.student_nickname}
                />
                {/* Student Thai nickname */}
                <TextField_text
                  label={t("Admin_Students_crud_modal_nicknameThai_label")}
                  name="student_nickname_thai"
                  className="col-span-1"
                  object={studentToAdd}
                  setObject={setStudentToAdd}
                  value={studentToAdd.student_nickname_thai}
                  validation={validationErrors.student_nickname_thai}
                />
              </div>
              {/* Student email */}
              <TextField_text
                label={t("Admin_Students_crud_modal_email_label")}
                name="student_email"
                className="col-span-1"
                object={studentToAdd}
                setObject={setStudentToAdd}
                value={studentToAdd.student_email}
                validation={validationErrors.student_email}
              />
              <div className="col-span-1 grid grid-cols-2 gap-4 mb-4">
                {/* Student phone */}
                <TextField_text
                  label={t("Admin_Students_crud_modal_phone_label")}
                  name="student_phone"
                  className="col-span-1"
                  object={studentToAdd}
                  setObject={setStudentToAdd}
                  value={studentToAdd.student_phone}
                  validation={validationErrors.student_phone}
                />
                {/* Student Line ID */}
                <TextField_text
                  label={t("Admin_Students_crud_modal_lineID_label")}
                  name="student_line_ID"
                  className="col-span-1"
                  object={studentToAdd}
                  setObject={setStudentToAdd}
                  value={studentToAdd.student_line_ID}
                  validation={validationErrors.student_line_ID}
                />
              </div>
              <Info_submit_button
                text={t("Admin_Students_create_modal_submit_button_title")}
                icon="fa-solid fa-graduation-cap"
                isSubmitting={isSubmitting}
                onClickFunction={() => {
                  console.log(studentToAdd);
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Admin_student_modal_create;
