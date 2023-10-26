import { useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import {
  TextField_multiline,
  TextField_select,
  TextField_text,
} from "../../../../custom/Custom_TextFields";
import { Major } from "../../../../../interfaces/common.interface";
import Custom_Modal from "../../../../custom/Custom_Modal";
import FileResetButton from "../../../../misc/common/FileResetButton.component";
import Info_submit_button from "../../../Buttons/Info_submit_button.component";
import { getData } from "../../../../../functions/fetchFromAPI.function";
import { handleClubCreate } from "../../../../../functions/Admin/Clubs/Admin_clubs.function";
import { handle_image_change } from "../../../../../functions/fields/handleFieldChanges.function";
import {
  Major_Name,
  Major_Name_German,
  Major_Name_Korean,
  Major_Name_Thai,
} from "../../../../../constants/Majors.constant";
import { API_ENDPOINT } from "../../../../../constants/ENDPOINTS";

// Contexts //
import { useContext_Majors } from "../../../../../context/Majors.context";
import { useContext_Clubs } from "../../../../../context/Clubs.context";

interface CurrentComponentProp {
  open: boolean;
  onModalClose: any;
}

const Admin_club_modal_create = (props: CurrentComponentProp) => {
  const { open, onModalClose } = props;

  const { setClubs } = useContext_Clubs();
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

  const [clubCreateObject, setClubCreateObject] = useState({
    club_name: "",
    club_major: 0,
    club_teacher: [0],
    club_description: "",
    club_image: "",
    club_status: 1,
    club_capacity: 45,
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
  const [clubCreateImage, setClubCreateImage] = useState(null);
  const [clubCreateImageName, setClubCreateImageName] = useState("");

  const [imagePreview, setImagePreview] = useState("");
  const [fileSizeNotice, setFileSizeNotice] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);

  const handleImageCancel = () => {
    setImagePreview("");
    setClubCreateImage(null);
    setClubCreateImageName("");
    setFileSizeNotice(false);
  };
  const handleModalClose = () => {
    setClubCreateObject({
      club_name: "",
      club_major: 0,
      club_teacher: [0],
      club_description: "",
      club_image: "",
      club_status: 1,
      club_capacity: 45,
    });
    setValidationErrors({
      club_name: "",
      club_major: "",
      club_teacher: "",
      club_status: "",
      club_description: "",
      club_image: "",
      club_capacity: "",
    });
    handleImageCancel();

    setIsSubmitting(false);
    setIsCreateSuccess(false);

    onModalClose();
  };

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const submissionStatus = await handleClubCreate(
      clubCreateObject,
      clubCreateImage,
      clubCreateImageName,
      setValidationErrors
    );

    if (submissionStatus) {
      getData(`${API_ENDPOINT}/api/v1/club/getAll`, (result: any) => {
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
      title={t("Admin_Clubs_create_modal_header")}
      altIcon="fa-solid fa-circle-check text-green-500"
      altTitle={t("Admin_Clubs_create_modal_submit_success_message")}
      useAltTitle={isCreateSuccess}
      overflow>
      <div className="grid grid-cols-1 gap-4">
        {/* Club image */}
        <div className="flex flex-col gap-1">
          {clubCreateImage ? (
            <div className="border border-standardBlack border-opacity-25 rounded-xl w-full sm:w-[500px] h-auto overflow-auto">
              <div className="relative">
                <FileResetButton functionToRun={handleImageCancel} />
                <label htmlFor="announcement_image">
                  <div className="flex justify-center items-center h-full">
                    <img src={imagePreview} className="w-full h-auto" />
                  </div>
                  <input
                    type="file"
                    name="announcement_image"
                    id="announcement_image"
                    accept=".jpg, .jpeg, .png"
                    hidden
                    onChange={(event) => {
                      handle_image_change(
                        event,
                        setImagePreview,
                        setClubCreateImage,
                        setFileSizeNotice,
                        setClubCreateImageName
                      );
                    }}
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className="border border-standardBlack border-opacity-25 rounded-xl w-full min-h-[200px] overflow-auto">
              <label htmlFor="announcement_image">
                <div className="flex flex-row justify-center items-center gap-4 w-full h-full">
                  <i className="fa-solid fa-image text-4xl"></i>
                  <h1 className="text-xl">
                    {t("Admin_Clubs_crud_modal_file_label")}
                  </h1>
                </div>
                <input
                  type="file"
                  name="announcement_image"
                  id="announcement_image"
                  accept=".jpg, .jpeg, .png"
                  hidden
                  onChange={(event) => {
                    handle_image_change(
                      event,
                      setImagePreview,
                      setClubCreateImage,
                      setFileSizeNotice,
                      setClubCreateImageName
                    );
                  }}
                />
              </label>
            </div>
          )}
          {fileSizeNotice && (
            <h1 className="text-sm text-red-500 mb-2">
              {t("Admin_Clubs_crud_modal_file_fileSizeNotice_message")}
            </h1>
          )}
        </div>
        {/* Club name */}
        <TextField_text
          label={t("Admin_Clubs_crud_modal_name_label")}
          name="club_name"
          className="col-span-1"
          object={clubCreateObject}
          setObject={setClubCreateObject}
          value={clubCreateObject.club_name}
          validation={validationErrors.club_name}
        />
        <div className="grid grid-cols-2 gap-4">
          {/* Club major */}
          <TextField_select
            label={t("Admin_Clubs_crud_modal_major_label")}
            name="club_major"
            className="col-span-1"
            object={clubCreateObject}
            setObject={setClubCreateObject}
            value={clubCreateObject.club_major}
            validation={validationErrors.club_major}>
            <option value="0">
              {t("Admin_Clubs_crud_modal_major_option1")}
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
          {/* Club capacity */}
          <TextField_text
            label={t("Admin_Clubs_crud_modal_capacity_label")}
            name="club_capacity"
            className="col-span-1"
            object={clubCreateObject}
            setObject={setClubCreateObject}
            value={clubCreateObject.club_capacity}
            validation={validationErrors.club_capacity}
          />
        </div>
        {/* Club description */}
        <TextField_multiline
          label={t("Admin_Clubs_crud_modal_description_label")}
          name="club_description"
          className="col-span-1"
          maxRows={4}
          object={clubCreateObject}
          setObject={setClubCreateObject}
          value={clubCreateObject.club_description}
          validation={validationErrors.club_description}
        />
        <Info_submit_button
          text={t("Admin_Clubs_create_modal_submit_button_title")}
          icon="fa-solid fa-plus"
          isSubmitting={isSubmitting}
          onClickFunction={() => {
            setObjectAndSubmit();
          }}
        />
      </div>
    </Custom_Modal>
  );
};

export default Admin_club_modal_create;
