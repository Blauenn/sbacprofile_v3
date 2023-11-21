import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import {
  TextField_multiline,
  TextField_select,
  TextField_text,
} from "../../../custom/Custom_TextFields";
import Custom_Modal from "../../../custom/Custom_Modal";
import {
  Club,
  ClubManager,
  Major,
} from "../../../../interfaces/common.interface";
import {
  get_teacher_image_from_ID,
  get_teacher_major_from_ID,
  get_teacher_name_from_ID,
} from "../../../../functions/getFromID.function";
import {
  handleClubManagerCRUD,
  handleClubUpdate,
} from "../../../../functions/Clubs/Admin_clubs.function";
import { handle_image_change } from "../../../../functions/fields/handleFieldChanges.function";
import { head_access_only } from "../../../../functions/permissionChecks.function";
import Info_submit_button from "../../Buttons/Info_submit_button.component";
import FileResetButton from "../../../misc/common/FileResetButton.component";
import Clubs_modal_update_teachers from "./Clubs_modal_update_teachers.component";
import {
  Major_Name,
  Major_Name_German,
  Major_Name_Korean,
  Major_Name_Thai,
  Major_To_Background_Color,
} from "../../../../constants/Majors.constant";
import { CDN_ENDPOINT } from "../../../../constants/ENDPOINTS";
import { hover_transition } from "../../../../constants/styles/transitions.style";

// Contexts //
import { useContext_Account } from "../../../../context/Account.context";
import { useContext_Clubs } from "../../../../context/Clubs.context";
import { useContext_Majors } from "../../../../context/Majors.context";
import { useContext_Teachers } from "../../../../context/Teachers.context";
import { arrays_equality_check } from "../../../../functions/stringManipulation.function";

interface CurrentComponentProp {
  club: Club;
  open: boolean;
  onModalClose: () => void;
}

const Clubs_modal_update = (props: CurrentComponentProp) => {
  const { club, open, onModalClose } = props;

  const { userInfo } = useContext_Account();
  const { fetchClubs, clubManagers, fetchClubManagers } = useContext_Clubs();
  const { majors, fetchMajors } = useContext_Majors();
  const { teachers, fetchTeachers } = useContext_Teachers();

  const { t } = useTranslation();

  const [originalClubTeachers, setOriginalClubTeachers] = useState<number[]>(
    []
  );
  const [clubTeachers, setClubTeachers] = useState<number[]>([]);

  useEffect(() => {
    if (majors.length === 0) {
      fetchMajors();
    }
    if (teachers.length === 0) {
      fetchTeachers();
    }
    if (clubManagers.length === 0) {
      fetchClubManagers();
    }

    const currentClubTeachers = clubManagers
      .filter(
        (clubManager: ClubManager) =>
          clubManager.club_manager_club_ID === club.club_ID
      )
      .map((clubManager: ClubManager) => clubManager.club_manager_teacher_ID);
    setOriginalClubTeachers(currentClubTeachers);
    setClubTeachers(currentClubTeachers);
  }, [clubManagers, club.club_ID]);

  const currentMajor = head_access_only(userInfo.profile_position)
    ? userInfo.profile_major
    : club.club_major;

  const [teacherModalOpen, setTeacherModalOpen] = useState(false);
  const onTeacherModalClose = () => {
    setTeacherModalOpen(false);
  };

  const [clubUpdateObject, setClubUpdateObject] = useState({
    club_ID: club.club_ID,
    club_name: club.club_name,
    club_major: currentMajor,
    club_status: club.club_status,
    club_description: club.club_description,
    club_image: club.club_image,
    club_capacity: club.club_capacity,
  });
  const [validationErrors, setValidationErrors] = useState({
    club_ID: "",
    club_name: "",
    club_major: "",
    club_status: "",
    club_description: "",
    club_image: "",
    club_capacity: "",
  });
  const [clubUpdateImage, setClubUpdateImage] = useState(null);
  const [clubUpdateImageName, setClubUpdateImageName] = useState("");

  const [imagePreview, setImagePreview] = useState("");
  const [fileSizeNotice, setFileSizeNotice] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  const handleImageCancel = () => {
    setImagePreview("");
    setClubUpdateImage(null);
    setClubUpdateImageName("");
    setFileSizeNotice(false);
  };
  const handleModalClose = () => {
    setClubUpdateObject({
      club_ID: club.club_ID,
      club_name: club.club_name,
      club_major: currentMajor,
      club_status: club.club_status,
      club_description: club.club_description,
      club_image: club.club_image,
      club_capacity: club.club_capacity,
    });
    setValidationErrors({
      club_ID: "",
      club_name: "",
      club_major: "",
      club_status: "",
      club_description: "",
      club_image: "",
      club_capacity: "",
    });
    handleImageCancel();

    setIsSubmitting(false);
    setIsUpdateSuccess(false);

    onModalClose();
  };

  const originalImageName = club.club_image.replace(
    /^\/assets\/profilePic\/clubs\//,
    ""
  );
  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    // Check if the image is updated or not. //
    let imageNameToUpdate;
    if (clubUpdateImage) {
      imageNameToUpdate = clubUpdateImageName;
    } else {
      imageNameToUpdate = originalImageName;
    }

    const updatedClubUpdateObject = {
      club_ID: clubUpdateObject.club_ID,
      club_name: clubUpdateObject.club_name,
      club_major: clubUpdateObject.club_major,
      club_status: clubUpdateObject.club_status,
      club_description: clubUpdateObject.club_description,
      club_image: clubUpdateObject.club_image,
      club_capacity: clubUpdateObject.club_capacity,
    };

    const submissionStatus = await handleClubUpdate(
      updatedClubUpdateObject,
      clubUpdateImage,
      imageNameToUpdate,
      setValidationErrors
    );

    if (submissionStatus) {
      fetchClubs();

      if (!arrays_equality_check(originalClubTeachers, clubTeachers)) {
        const clubTeachersSubmissionStatus = await handleClubManagerCRUD(
          clubUpdateObject.club_ID,
          originalClubTeachers,
          clubTeachers
        );

        if (clubTeachersSubmissionStatus) {
          fetchClubManagers();

          setIsUpdateSuccess(true);
        } else {
          setIsUpdateSuccess(false);
        }
      } else {
        setIsUpdateSuccess(true);
      }
    } else {
      setIsUpdateSuccess(false);
    }

    setIsSubmitting(false);
  };

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-pencil"
      title={t("Clubs_update_modal_header")}
      overflow>
      <div className="grid grid-cols-1 gap-4">
        {/* Club image */}
        <div className="flex flex-col gap-1">
          {clubUpdateImage ? (
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
                        setClubUpdateImage,
                        setFileSizeNotice,
                        setClubUpdateImageName
                      );
                    }}
                  />
                </label>
              </div>
            </div>
          ) : club.club_image !== "/assets/profilePic/clubs/" ? (
            <div className="border border-standardBlack border-opacity-25 rounded-xl w-full sm:w-[500px] h-auto overflow-auto">
              <div className="relative">
                <label htmlFor="announcement_image">
                  <div className="flex justify-center items-center h-full">
                    <img src={`${CDN_ENDPOINT}${club.club_image}`} />
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
                        setClubUpdateImage,
                        setFileSizeNotice,
                        setClubUpdateImageName
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
                    {t("Clubs_crud_modal_file_label")}
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
                      setClubUpdateImage,
                      setFileSizeNotice,
                      setClubUpdateImageName
                    );
                  }}
                />
              </label>
            </div>
          )}
          {fileSizeNotice && (
            <h1 className="text-sm text-red-500 mb-2">
              {t("Clubs_crud_modal_file_fileSizeNotice_message")}
            </h1>
          )}
        </div>
        {/* Club name */}
        <TextField_text
          label={t("Clubs_crud_modal_name_label")}
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
            label={t("Clubs_crud_modal_major_label")}
            name="club_major"
            className="col-span-1"
            object={clubUpdateObject}
            setObject={setClubUpdateObject}
            value={clubUpdateObject.club_major}
            validation={validationErrors.club_major}
            disabled={head_access_only(userInfo.profile_position)}>
            <option value="0">{t("Clubs_crud_modal_major_option1")}</option>
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
            label={t("Clubs_crud_modal_capacity_label")}
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
          label={t("Clubs_crud_modal_status_label")}
          name="club_status"
          className="col-span-1"
          object={clubUpdateObject}
          setObject={setClubUpdateObject}
          value={clubUpdateObject.club_status}
          validation={validationErrors.club_status}>
          <option value="0">{t("Clubs_crud_modal_status_option1")}</option>
          <option value="1">{t("Clubs_crud_modal_status_option2")}</option>
          <option value="2">{t("Clubs_crud_modal_status_option3")}</option>
          <option value="3">{t("Clubs_crud_modal_status_option4")}</option>
        </TextField_select>
        {/* Club description */}
        <TextField_multiline
          label={t("Clubs_crud_modal_description_label")}
          name="club_description"
          className="col-span-1"
          maxRows={4}
          object={clubUpdateObject}
          setObject={setClubUpdateObject}
          value={clubUpdateObject.club_description}
          validation={validationErrors.club_description}
        />
        {/* Club teachers */}
        <div className="flex flex-col gap-4 my-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-md font-semibold opacity-50">
              {t("Clubs_update_modal_teachers_label")}
            </h1>
            {clubTeachers.length !== 0 ? (
              <div className="grid sm:grid-cols-2 gap-2">
                {clubTeachers.map((teacher: number) => (
                  <div
                    key={teacher}
                    className="flex flex-row justify-between items-center gap-4 border border-standardBlack border-opacity-25 rounded-xl p-2">
                    <div className="flex flex-row items-center gap-4">
                      <img
                        src={`${CDN_ENDPOINT}${get_teacher_image_from_ID(
                          teacher,
                          teachers
                        )}`}
                        className={`w-[40px] h-[40px] rounded-full ${
                          Major_To_Background_Color[
                            get_teacher_major_from_ID(teacher, teachers)
                          ]
                        }`}
                      />
                      <h1 className="line-clamp-1">
                        {get_teacher_name_from_ID(teacher, teachers)}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h1 className="font-semibold opacity-50 mb-4">
                {t("Clubs_crud_modal_noTeachers_message")}
              </h1>
            )}
          </div>
          <Clubs_modal_update_teachers
            club={club}
            clubTeachers={clubTeachers}
            setClubTeachers={setClubTeachers}
            open={teacherModalOpen}
            onModalClose={onTeacherModalClose}
          />
          <button
            type="button"
            onClick={() => {
              setTeacherModalOpen(true);
            }}
            className={`border border-primary hover:bg-primary hover:text-white text-primary rounded-full px-6 py-2 ${hover_transition}`}>
            <i className={`fa-solid fa-chalkboard-user me-4`}></i>
            {t("Clubs_update_modal_teacher_label")}
          </button>
        </div>
        <Info_submit_button
          text={t("Clubs_update_modal_submit_button_title")}
          successText={t("Clubs_update_modal_submit_success_message")}
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

export default Clubs_modal_update;
