import { useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";
import { Modal } from "@mui/material";
import { Major, Teacher } from "../../../../../interfaces/common.interface";
import { handleImageChange } from "../../../../../functions/fields/handleFieldChanges.function";
import { getData } from "../../../../../functions/fetchFromAPI.function";
import { handleTeacherUpdate } from "../../../../../functions/Admin/Teachers/Admin_teachers.function";
import Info_submit_button from "../../../Buttons/Info_submit_button.component";
import ModalCloseButton from "../../../../misc/common/ModalCloseButton.component";
import Info_addSuccess_message from "../../../Buttons/Info_success_message.component";
import { API_ENDPOINT, CDN_ENDPOINT } from "../../../../../constants/ENDPOINTS";
import {
  MajorName,
  MajorNameGerman,
  MajorNameKorean,
  MajorNameThai,
  MajorToBackgroundColor,
} from "../../../../../constants/Majors.constant";

// Contexts //
import { useContext_Majors } from "../../../../../context/Majors.context";
import { useContext_Teachers } from "../../../../../context/Teachers.context";
import { style_modal_parent_large } from "../../../../../constants/styles/modal.style";
import {
  TextField_select,
  TextField_text,
} from "../../../../custom/Custom_TextFields";

interface CurrentComponentProp {
  open: boolean;
  onModalClose: any;
  teacher: Teacher;
}

const Admin_teacher_modal_update = (props: CurrentComponentProp) => {
  const { open, onModalClose, teacher } = props;

  const { setTeachers } = useContext_Teachers();
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

  const [teacherToUpdate, setteacherToUpdate] = useState<Teacher>({
    primary_teacher_ID: teacher.primary_teacher_ID,
    teacher_ID: teacher.teacher_ID,
    teacher_position: teacher.teacher_position,
    teacher_first_name: teacher.teacher_first_name,
    teacher_last_name: teacher.teacher_last_name,
    teacher_nickname: teacher.teacher_nickname,
    teacher_first_name_thai: teacher.teacher_first_name_thai,
    teacher_last_name_thai: teacher.teacher_last_name_thai,
    teacher_nickname_thai: teacher.teacher_nickname_thai,
    teacher_gender: teacher.teacher_gender,
    teacher_major: teacher.teacher_major,
    teacher_phone: teacher.teacher_phone,
    teacher_line_ID: teacher.teacher_line_ID,
    teacher_image: teacher.teacher_image,
    teacher_email: teacher.teacher_email,
  });
  const [teacherUpdateImage, setteacherUpdateImage] = useState(null);
  const [teacherUpdateImageName, setteacherUpdateImageName] = useState("");
  const [fileSizeNotice, setFileSizeNotice] = useState(false);

  // To store any validation errors. //
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
  });

  const [imagePreview, setImagePreview] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  const handleModalClose = () => {
    setteacherToUpdate({
      primary_teacher_ID: teacher.primary_teacher_ID,
      teacher_ID: teacher.teacher_ID,
      teacher_position: teacher.teacher_position,
      teacher_first_name: teacher.teacher_first_name,
      teacher_last_name: teacher.teacher_last_name,
      teacher_nickname: teacher.teacher_nickname,
      teacher_first_name_thai: teacher.teacher_first_name_thai,
      teacher_last_name_thai: teacher.teacher_last_name_thai,
      teacher_nickname_thai: teacher.teacher_nickname_thai,
      teacher_major: teacher.teacher_major,
      teacher_gender: teacher.teacher_gender,
      teacher_phone: teacher.teacher_phone,
      teacher_line_ID: teacher.teacher_line_ID,
      teacher_image: teacher.teacher_image,
      teacher_email: teacher.teacher_email,
    });
    setteacherUpdateImage(null);
    setteacherUpdateImageName("");
    setFileSizeNotice(false);
    setImagePreview(null);
    onModalClose();
  };

  const callback = async () => {
    await getData(`${API_ENDPOINT}/api/v1/teacher/getAll`, (result: any) => {
      setTeachers(result);
    });

    setIsSubmitting(false);
    setIsUpdateSuccess(true);
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
            <div className={style_modal_parent_large}>
              <ModalCloseButton functionToRun={handleModalClose} />
              <div className="flex flex-col py-8 px-4 w-full lg:gap-x-4">
                <h1 className="text-2xl font-semibold mb-8">
                  <i className="fa-solid fa-pencil me-2"></i>
                  {t("Admin_Teachers_update_modal_header")}
                </h1>
                <div className="grid grid-cols-1 gap-4">
                  <div className="col-span-1 mb-4">
                    <div className="flex justify-center mx-12">
                      <label htmlFor="teacher_update_image">
                        {teacherUpdateImage ? (
                          <>
                            <div
                              className={`${
                                MajorToBackgroundColor[teacher.teacher_major]
                              } w-[120px] h-[120px] sm:w-[300px] sm:h-[300px] | rounded-full overflow-hidden`}>
                              <img
                                src={imagePreview || ""}
                                className="w-full | border border-standardBlack border-opacity-25"
                              />
                            </div>
                            <input
                              name="teacher_update_image"
                              id="teacher_update_image"
                              type="file"
                              accept=".jpg, .jpeg, .png"
                              hidden
                              onChange={(event) => {
                                handleImageChange(
                                  event,
                                  setImagePreview,
                                  setteacherUpdateImage,
                                  setteacherUpdateImageName,
                                  setFileSizeNotice
                                );
                              }}
                            />
                          </>
                        ) : (
                          // Show the current teacher image...
                          // if image is not uploaded. //
                          <>
                            <div
                              className={`${
                                MajorToBackgroundColor[teacher.teacher_major]
                              } w-[120px] h-[120px] sm:w-[300px] sm:h-[300px] | rounded-full overflow-hidden`}>
                              <img
                                src={`${CDN_ENDPOINT}${teacher.teacher_image}`}
                                className="w-full"
                              />
                            </div>
                            <input
                              name="teacher_update_image"
                              id="teacher_update_image"
                              type="file"
                              accept=".jpg, .jpeg, .png"
                              hidden
                              onChange={(event) => {
                                handleImageChange(
                                  event,
                                  setImagePreview,
                                  setteacherUpdateImage,
                                  setteacherUpdateImageName,
                                  setFileSizeNotice
                                );
                              }}
                            />
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="col-span-1 grid grid-cols-2 gap-4">
                    {/* Teacher ID */}
                    <TextField_text
                      label={t("Admin_Teachers_crud_modal_ID_label")}
                      name="teacher_ID"
                      className="col-span-1"
                      object={teacherToUpdate}
                      setObject={setteacherToUpdate}
                      value={teacherToUpdate.teacher_ID}
                      validation=""
                    />
                    {/* Teacher position */}
                    <TextField_select
                      // Disable if the user tries to demote the administrator. //
                      disabled={teacherToUpdate.teacher_position === 6}
                      label={t("Admin_Teachers_crud_modal_position_label")}
                      name="teacher_position"
                      className="col-span-1"
                      object={teacherToUpdate}
                      setObject={setteacherToUpdate}
                      value={teacherToUpdate.teacher_position}
                      validation="">
                      <option value="0">
                        {t("Admin_Teachers_crud_modal_position_option1")}
                      </option>
                      <option value="3">
                        {t("Admin_Teachers_crud_modal_position_option2")}
                      </option>
                      <option value="4">
                        {t("Admin_Teachers_crud_modal_position_option3")}
                      </option>
                      {teacherToUpdate.teacher_position === 6 ? (
                        <option value="6">
                          {t("Admin_Teachers_crud_modal_position_option4")}
                        </option>
                      ) : null}
                    </TextField_select>
                  </div>
                  {/* Teacher major */}
                  <TextField_select
                    label={t("Admin_Teachers_crud_modal_major_label")}
                    name="teacher_major"
                    className="col-span-1"
                    object={teacherToUpdate}
                    setObject={setteacherToUpdate}
                    value={teacherToUpdate.teacher_major}
                    validation="">
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
                  {/* Gender */}
                  <TextField_select
                    label={t("Admin_Teachers_crud_modal_gender_label")}
                    name="teacher_gender"
                    className="col-span-1"
                    object={teacherToUpdate}
                    setObject={setteacherToUpdate}
                    value={teacherToUpdate.teacher_gender}
                    validation="">
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
                      object={teacherToUpdate}
                      setObject={setteacherToUpdate}
                      value={teacherToUpdate.teacher_first_name}
                      validation=""
                    />
                    {/* Teacher English last name */}
                    <TextField_text
                      label={t("Admin_Teachers_crud_modal_lastName_label")}
                      name="teacher_last_name"
                      className="col-span-1"
                      object={teacherToUpdate}
                      setObject={setteacherToUpdate}
                      value={teacherToUpdate.teacher_last_name}
                      validation=""
                    />
                  </div>
                  <div className="col-span-1 grid grid-cols-2 gap-4">
                    {/* Teacher Thai first name */}
                    <TextField_text
                      label={t("Admin_Teachers_crud_modal_firstNameThai_label")}
                      name="teacher_first_name_thai"
                      className="col-span-1"
                      object={teacherToUpdate}
                      setObject={setteacherToUpdate}
                      value={teacherToUpdate.teacher_first_name_thai}
                      validation=""
                    />
                    {/* Teacher Thai last name */}
                    <TextField_text
                      label={t("Admin_Teachers_crud_modal_lastNameThai_label")}
                      name="teacher_last_name_thai"
                      className="col-span-1"
                      object={teacherToUpdate}
                      setObject={setteacherToUpdate}
                      value={teacherToUpdate.teacher_last_name_thai}
                      validation=""
                    />
                  </div>
                  <div className="col-span-1 grid grid-cols-2 gap-4 mb-4">
                    {/* Teacher English nickname */}
                    <TextField_text
                      label={t("Admin_Teachers_crud_modal_nickname_label")}
                      name="teacher_nickname"
                      className="col-span-1"
                      object={teacherToUpdate}
                      setObject={setteacherToUpdate}
                      value={teacherToUpdate.teacher_nickname}
                      validation=""
                    />
                    {/* Teacher Thai nickname */}
                    <TextField_text
                      label={t("Admin_Teachers_crud_modal_nicknameThai_label")}
                      name="teacher_nickname_thai"
                      className="col-span-1"
                      object={teacherToUpdate}
                      setObject={setteacherToUpdate}
                      value={teacherToUpdate.teacher_nickname_thai}
                      validation=""
                    />
                  </div>
                  {/* Teacher email */}
                  <TextField_text
                    label={t("Admin_Teachers_crud_modal_email_label")}
                    name="teacher_email"
                    className="col-span-1"
                    object={teacherToUpdate}
                    setObject={setteacherToUpdate}
                    value={teacherToUpdate.teacher_email}
                    validation=""
                  />
                  <div className="col-span-1 grid grid-cols-2 gap-4 mb-4">
                    {/* Teacher phone */}
                    <TextField_text
                      label={t("Admin_Teachers_crud_modal_phone_label")}
                      name="teacher_phone"
                      className="col-span-1"
                      object={teacherToUpdate}
                      setObject={setteacherToUpdate}
                      value={teacherToUpdate.teacher_phone}
                      validation=""
                    />
                    {/* Teacher Line ID */}
                    <TextField_text
                      label={t("Admin_Teachers_crud_modal_lineID_label")}
                      name="teacher_line_ID"
                      className="col-span-1"
                      object={teacherToUpdate}
                      setObject={setteacherToUpdate}
                      value={teacherToUpdate.teacher_line_ID}
                      validation=""
                    />
                  </div>
                  <Info_submit_button
                    text={t("Admin_Teachers_update_modal_submit_button_title")}
                    icon="fa-solid fa-pencil"
                    isSubmitting={isSubmitting}
                    onClickFunction={() => {
                      setIsSubmitting(true);
                      handleTeacherUpdate(
                        teacherToUpdate,
                        teacherUpdateImage,
                        setValidationErrors,
                        setIsSubmitting,
                        setIsUpdateSuccess,
                        callback
                      );
                    }}
                  />
                  {/* Success message */}
                  <Info_addSuccess_message
                    message={t(
                      "Admin_Teachers_update_modal_submit_success_message"
                    )}
                    isSuccess={isUpdateSuccess}
                  />
                </div>
              </div>
            </div>
          </Modal>
        </>,
        modal
      )
    : null;
};

export default Admin_teacher_modal_update;
