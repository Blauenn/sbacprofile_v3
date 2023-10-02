import { useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../../custom/Custom_Modal";
import {
  TextField_multiline,
  TextField_select,
  TextField_text,
} from "../../../../custom/Custom_TextFields";
import { Major } from "../../../../../interfaces/common.interface";
import { getData } from "../../../../../functions/fetchFromAPI.function";
import Info_submit_button from "../../../Buttons/Info_submit_button.component";
import Info_addSuccess_message from "../../../Buttons/Info_success_message.component";
import { API_ENDPOINT } from "../../../../../constants/ENDPOINTS";
import {
  MajorName,
  MajorNameGerman,
  MajorNameKorean,
  MajorNameThai,
} from "../../../../../constants/Majors.constant";

// Contexts //
import { useContext_Clubs } from "../../../../../context/Clubs.context";
import { useContext_Majors } from "../../../../../context/Majors.context";
import { handleClubUpdate } from "../../../../../functions/Admin/Clubs/Admin_clubs.function";

interface CurrentComponentProp {
  club: any;
  open: boolean;
  onModalClose: any;
}

const Admin_club_modal_update = (props: CurrentComponentProp) => {
  const { club, open, onModalClose } = props;

  const { setClubs } = useContext_Clubs();
  const { majors, setMajors } = useContext_Majors();

  const { t } = useTranslation();

  const [clubUpdateObject, setClubUpdateObject] = useState({
    club_ID: club.club_ID,
    club_name: club.club_name,
    club_major: club.club_major,
    club_teacher: club.club_teacher,
    club_status: club.club_status,
    club_description: club.club_description,
    club_image: club.club_image,
    club_capacity: club.club_capacity,
  });

  const [validationErrors, setValidationErrors] = useState({
    club_ID: "",
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

  const handleModalClose = () => {
    setClubUpdateObject({
      club_ID: club.club_ID,
      club_name: club.club_name,
      club_major: club.club_major,
      club_teacher: club.club_teacher,
      club_status: club.club_status,
      club_description: club.club_description,
      club_image: club.club_image,
      club_capacity: club.club_capacity,
    });
    setValidationErrors({
      club_ID: "",
      club_name: "",
      club_major: "",
      club_teacher: "",
      club_status: "",
      club_description: "",
      club_image: "",
      club_capacity: "",
    });
    setIsSubmitting(false);
    setIsUpdateSuccess(false);
    onModalClose();
  };

  const setObjectAndSubmit = () => {
    setIsSubmitting(true);

    const updatedClubToUpdate = {
      club_ID: clubUpdateObject.club_ID,
      club_name: clubUpdateObject.club_name,
      club_major: parseInt(clubUpdateObject.club_major, 10),
      club_teacher: JSON.stringify(clubUpdateObject.club_teacher),
      club_status: parseInt(clubUpdateObject.club_status, 10),
      club_description: clubUpdateObject.club_description,
      club_image: clubUpdateObject.club_image,
      club_capacity: parseInt(clubUpdateObject.club_capacity, 10),
    };

    handleClubUpdate(
      updatedClubToUpdate,
      setValidationErrors,
      setIsSubmitting,
      setIsUpdateSuccess,
      callback
    );
  };

  const callback = async () => {
    await getData(`${API_ENDPOINT}/api/v1/club/getAll`, (result: any) => {
      // Change the value of the club_teacher from string into an object. //
      const remappedClub = result.map((club: any) => {
        const parsedTeacher = JSON.parse(club.club_teacher);
        return { ...club, club_teacher: parsedTeacher };
      });

      // Sort in alphabetical order. //
      const sortedResults = remappedClub.sort((a: any, b: any) => {
        return a.club_name.localeCompare(b.club_name);
      });

      setClubs(sortedResults);
    });

    setIsSubmitting(false);
    setIsUpdateSuccess(true);
  };

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-pencil"
      title={t("Admin_Clubs_update_modal_header")}>
      <div className="grid grid-cols-1 gap-4">
        {/* Club name */}
        <TextField_text
          label={t("Admin_Clubs_crud_modal_name_label")}
          name="club_name"
          className="col-span-1"
          object={clubUpdateObject}
          setObject={setClubUpdateObject}
          value={clubUpdateObject.club_name}
          validation={validationErrors.club_name}
        />
        <div className="grid grid-cols-2 gap-4">
          {/* Club major */}
          <TextField_select
            label={t("Admin_Clubs_crud_modal_major_label")}
            name="club_major"
            className="col-span-1"
            object={clubUpdateObject}
            setObject={setClubUpdateObject}
            value={clubUpdateObject.club_major}
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
            object={clubUpdateObject}
            setObject={setClubUpdateObject}
            value={clubUpdateObject.club_capacity}
            validation={validationErrors.club_capacity}
          />
        </div>
        {/* Club status */}
        <TextField_select
          label={t("Admin_Clubs_crud_modal_status_label")}
          name="club_status"
          className="col-span-1"
          object={clubUpdateObject}
          setObject={setClubUpdateObject}
          value={clubUpdateObject.club_status}
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
          object={clubUpdateObject}
          setObject={setClubUpdateObject}
          value={clubUpdateObject.club_description}
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
            setObjectAndSubmit();
          }}
        />
        {/* Success message */}
        <Info_addSuccess_message
          message={t("Admin_Clubs_update_modal_submit_success_message")}
          isSuccess={isUpdateSuccess}
        />
      </div>
    </Custom_Modal>
  );
};

export default Admin_club_modal_update;
