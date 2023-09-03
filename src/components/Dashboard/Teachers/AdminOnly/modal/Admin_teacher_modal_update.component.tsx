import { useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";
import { Modal, TextField } from "@mui/material";
import { Major, Teacher } from "../../../../../interfaces/common.interface";
import {
  handleImageChange,
  handleInputChange,
} from "../../../../../functions/fields/handleFieldChanges.function";
import { getData } from "../../../../../functions/fetchFromAPI.function";
import { handleTeacherUpdate } from "../../../../../functions/Admin/Teachers/Admin_teachers.function";
import Info_submit_button from "../../../Buttons/Info_submit_button.component";
import ModalCloseButton from "../../../../misc/common/ModalCloseButton.component";
import Info_addSuccess_message from "../../../Buttons/Info_addSuccess_message.component";
import { API_ENDPOINT, CDN_ENDPOINT } from "../../../../../constants/ENDPOINTS";
import {
  MajorName,
  MajorNameThai,
} from "../../../../../constants/Majors.constant";

// Contexts //
import { useContext_Majors } from "../../../../../context/Majors.context";
import { useContext_Teachers } from "../../../../../context/Teachers.context";
import { style_modal_parent } from "../../../../../constants/styles/modal.style";

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
            <div className={style_modal_parent}>
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
                            <img
                              src={imagePreview || ""}
                              className="w-[120px] h-[120px] sm:w-[300px] sm:h-[300px] rounded-full | border border-standardBlack border-opacity-25"
                            />
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
                            <img
                              src={`${CDN_ENDPOINT}${teacher.teacher_image}`}
                              className="w-[120px] h-[120px] sm:w-[300px] sm:h-[300px] rounded-full"
                            />
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
                    <TextField
                      label={t("Admin_Teachers_crud_modal_ID_label")}
                      name="teacher_ID"
                      className="col-span-1"
                      onChange={(event) => {
                        handleInputChange(
                          event,
                          teacherToUpdate,
                          setteacherToUpdate
                        );
                      }}
                      value={teacherToUpdate.teacher_ID}
                    />
                    {/* Teacher position */}
                    <TextField
                      label={t("Admin_Teachers_crud_modal_position_label")}
                      name="teacher_position"
                      className="col-span-1"
                      onChange={(event) => {
                        handleInputChange(
                          event,
                          teacherToUpdate,
                          setteacherToUpdate
                        );
                      }}
                      select
                      SelectProps={{ native: true }}
                      value={teacherToUpdate.teacher_position}>
                      <option value="0">
                        {t("Admin_Teachers_crud_modal_position_option1")}
                      </option>
                      <option value="1">
                        {t("Admin_Teachers_crud_modal_position_option2")}
                      </option>
                      <option value="2">
                        {t("Admin_Teachers_crud_modal_position_option3")}
                      </option>
                    </TextField>
                  </div>
                  {/* Teacher major */}
                  <TextField
                    label={t("Admin_Teachers_crud_modal_major_label")}
                    name="teacher_major"
                    className="col-span-1"
                    onChange={(event) => {
                      handleInputChange(
                        event,
                        teacherToUpdate,
                        setteacherToUpdate
                      );
                    }}
                    select
                    SelectProps={{ native: true }}
                    value={teacherToUpdate.teacher_major}>
                    <option value="0">Major</option>
                    {majors.map((major: Major) => (
                      <option key={major.major_ID} value={major.major_ID}>
                        {i18n.language === "th"
                          ? MajorNameThai[major.major_ID]
                          : MajorName[major.major_ID]}
                      </option>
                    ))}
                  </TextField>
                  {/* Gender */}
                  <TextField
                    label={t("Admin_Teachers_crud_modal_gender_label")}
                    name="teacher_gender"
                    className="col-span-1"
                    onChange={(event) => {
                      handleInputChange(
                        event,
                        teacherToUpdate,
                        setteacherToUpdate
                      );
                    }}
                    select
                    SelectProps={{ native: true }}
                    value={teacherToUpdate.teacher_gender}>
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
                  </TextField>
                  <div className="col-span-1 grid grid-cols-2 gap-4">
                    {/* Teacher English first name */}
                    <TextField
                      label={t("Admin_Teachers_crud_modal_firstName_label")}
                      name="teacher_first_name"
                      className="col-span-1"
                      onChange={(event) => {
                        handleInputChange(
                          event,
                          teacherToUpdate,
                          setteacherToUpdate
                        );
                      }}
                      value={teacherToUpdate.teacher_first_name}
                    />
                    {/* Teacher English last name */}
                    <TextField
                      label={t("Admin_Teachers_crud_modal_lastName_label")}
                      name="teacher_last_name"
                      className="col-span-1"
                      onChange={(event) => {
                        handleInputChange(
                          event,
                          teacherToUpdate,
                          setteacherToUpdate
                        );
                      }}
                      value={teacherToUpdate.teacher_last_name}
                    />
                  </div>
                  <div className="col-span-1 grid grid-cols-2 gap-4">
                    {/* Teacher Thai first name */}
                    <TextField
                      label={t("Admin_Teachers_crud_modal_firstNameThai_label")}
                      name="teacher_first_name_thai"
                      className="col-span-1"
                      onChange={(event) => {
                        handleInputChange(
                          event,
                          teacherToUpdate,
                          setteacherToUpdate
                        );
                      }}
                      value={teacherToUpdate.teacher_first_name_thai}
                    />
                    {/* Teacher Thai last name */}
                    <TextField
                      label={t("Admin_Teachers_crud_modal_lastNameThai_label")}
                      name="teacher_last_name_thai"
                      className="col-span-1"
                      onChange={(event) => {
                        handleInputChange(
                          event,
                          teacherToUpdate,
                          setteacherToUpdate
                        );
                      }}
                      value={teacherToUpdate.teacher_last_name_thai}
                    />
                  </div>
                  <div className="col-span-1 grid grid-cols-2 gap-4 mb-4">
                    {/* Teacher English nickname */}
                    <TextField
                      label={t("Admin_Teachers_crud_modal_nickname_label")}
                      name="teacher_nickname"
                      className="col-span-1"
                      onChange={(event) => {
                        handleInputChange(
                          event,
                          teacherToUpdate,
                          setteacherToUpdate
                        );
                      }}
                      value={teacherToUpdate.teacher_nickname}
                    />
                    {/* Teacher Thai nickname */}
                    <TextField
                      label={t("Admin_Teachers_crud_modal_nicknameThai_label")}
                      name="teacher_nickname_thai"
                      className="col-span-1"
                      onChange={(event) => {
                        handleInputChange(
                          event,
                          teacherToUpdate,
                          setteacherToUpdate
                        );
                      }}
                      value={teacherToUpdate.teacher_nickname_thai}
                    />
                  </div>
                  {/* Teacher email */}
                  <TextField
                    label={t("Admin_Teachers_crud_modal_email_label")}
                    name="teacher_email"
                    className="col-span-1"
                    onChange={(event) => {
                      handleInputChange(
                        event,
                        teacherToUpdate,
                        setteacherToUpdate
                      );
                    }}
                    value={teacherToUpdate.teacher_email}
                  />
                  <div className="col-span-1 grid grid-cols-2 gap-4 mb-4">
                    {/* Teacher phone */}
                    <TextField
                      label={t("Admin_Teachers_crud_modal_phone_label")}
                      name="teacher_phone"
                      className="col-span-1"
                      onChange={(event) => {
                        handleInputChange(
                          event,
                          teacherToUpdate,
                          setteacherToUpdate
                        );
                      }}
                      value={teacherToUpdate.teacher_phone}
                    />
                    {/* Teacher Line ID */}
                    <TextField
                      label={t("Admin_Teachers_crud_modal_lineID_label")}
                      name="teacher_line_ID"
                      className="col-span-1"
                      onChange={(event) => {
                        handleInputChange(
                          event,
                          teacherToUpdate,
                          setteacherToUpdate
                        );
                      }}
                      value={teacherToUpdate.teacher_line_ID}
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
