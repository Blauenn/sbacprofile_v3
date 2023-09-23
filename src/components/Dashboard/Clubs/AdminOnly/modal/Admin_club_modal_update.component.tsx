import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { Modal } from "@mui/material";
import {
  TextField_multiline,
  TextField_select,
  TextField_text,
} from "../../../../custom/Custom_TextFields";
import { Club, Major } from "../../../../../interfaces/common.interface";
import { getData } from "../../../../../functions/fetchFromAPI.function";
import ModalCloseButton from "../../../../misc/common/ModalCloseButton.component";
import Info_submit_button from "../../../Buttons/Info_submit_button.component";
import Info_addSuccess_message from "../../../Buttons/Info_success_message.component";
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
  club: Club;
  open: boolean;
  onModalClose: any;
}

const Admin_club_modal_update = (props: CurrentComponentProp) => {
  const { club, open, onModalClose } = props;

  const { majors, setMajors } = useContext_Majors();

  const { t } = useTranslation();

  const [clubToUpdate, setClubToUpdate] = useState({
    club_name: club.club_name,
    club_major: club.club_major,
    club_teacher: club.club_teacher,
    club_status: club.club_status,
    club_description: club.club_description,
    club_image: club.club_image,
    club_capacity: club.club_capacity,
  });

  const [validationErrors, setValidationErrors] = useState({
    club_name: "",
    club_major: "",
    club_teacher: "",
    club_status: "",
    club_description: "",
    club_image: "",
    club_capacity: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  useEffect(() => {
    // Majors //
    // Only fetch when empty //
    if (majors.length === 0) {
      getData(`${API_ENDPOINT}/api/v1/major/getAll`, (result: any) => {
        setMajors(result);
      });
    }
  }, []);

  const modal = document.getElementById("modal");

  const handleModalClose = () => {
    onModalClose();
  };

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
                  {t("Admin_Clubs_update_modal_header")}
                </h1>
                <div className="grid grid-cols-1 gap-4">
                  {/* Club name */}
                  <TextField_text
                    label={t("Admin_Clubs_crud_modal_name_label")}
                    name="club_name"
                    className="col-span-1"
                    object={clubToUpdate}
                    setObject={setClubToUpdate}
                    value={clubToUpdate.club_name}
                    validation={validationErrors.club_name}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    {/* Club major */}
                    <TextField_select
                      label={t("Admin_Clubs_crud_modal_major_label")}
                      name="club_major"
                      className="col-span-1"
                      object={clubToUpdate}
                      setObject={setClubToUpdate}
                      value={clubToUpdate.club_major}
                      validation={validationErrors.club_major}>
                      <option value="0">
                        {t("Admin_Clubs_crud_modal_major_option1")}
                      </option>
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
                    {/* Club capacity */}
                    <TextField_text
                      label={t("Admin_Clubs_crud_modal_capacity_label")}
                      name="club_capacity"
                      className="col-span-1"
                      object={clubToUpdate}
                      setObject={setClubToUpdate}
                      value={clubToUpdate.club_capacity}
                      validation={validationErrors.club_capacity}
                    />
                  </div>
                  {/* Club status */}
                  <TextField_select
                    label={t("Admin_Clubs_crud_modal_status_label")}
                    name="club_status"
                    className="col-span-1"
                    object={clubToUpdate}
                    setObject={setClubToUpdate}
                    value={clubToUpdate.club_status}
                    validation={validationErrors.club_status}>
                    <option value="0">
                      {t("Admin_Clubs_crud_modal_status_option1")}
                    </option>
                    <option value="1">
                      {t("Admin_Clubs_crud_modal_status_option2")}
                    </option>
                    <option value="2">
                      {t("Admin_Clubs_crud_modal_status_option3")}
                    </option>
                    <option value="3">
                      {t("Admin_Clubs_crud_modal_status_option4")}
                    </option>
                  </TextField_select>
                  {/* Club description */}
                  <TextField_multiline
                    label={t("Admin_Clubs_crud_modal_description_label")}
                    name="club_description"
                    className="col-span-1"
                    maxRows={4}
                    object={clubToUpdate}
                    setObject={setClubToUpdate}
                    value={clubToUpdate.club_description}
                    validation={validationErrors.club_description}
                  />
                  {/* Club teachers */}
                  {/* TODO: Remake the club teacher update system. */}
                  <div className="flex flex-col gap-2 my-4">
                    <h1 className="text-xl font-semibold">
                      {t("Admin_Clubs_update_modal_teachers_label")}
                    </h1>
                    <h1 className="text-lg opacity-50">To be constructed...</h1>
                  </div>
                  <Info_submit_button
                    text={t("Admin_Clubs_update_modal_submit_button_title")}
                    icon="fa-solid fa-pencil"
                    isSubmitting={isSubmitting}
                    onClickFunction={() => {
                      console.log(clubToUpdate);
                    }}
                  />
                  {/* Success message */}
                  <Info_addSuccess_message
                    message={t(
                      "Admin_Clubs_update_modal_submit_success_message"
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

export default Admin_club_modal_update;
