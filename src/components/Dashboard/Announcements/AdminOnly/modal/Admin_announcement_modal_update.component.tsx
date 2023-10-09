import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TextField_multiline,
  TextField_select,
  TextField_text,
} from "../../../../custom/Custom_TextFields";
import Custom_Modal from "../../../../custom/Custom_Modal";
import { handle_image_change } from "../../../../../functions/fields/handleFieldChanges.function";
import { getData } from "../../../../../functions/fetchFromAPI.function";
import { handleAnnouncementUpdate } from "../../../../../functions/Admin/Announcements/Admin_announcements.function";
import FileResetButton from "../../../../misc/common/FileResetButton.component";
import Info_submit_button from "../../../Buttons/Info_submit_button.component";
import { API_ENDPOINT, CDN_ENDPOINT } from "../../../../../constants/ENDPOINTS";

// Contexts //
import { useContext_Announcements } from "../../../../../context/Announcements.context";

interface CurrentComponentProp {
  open: boolean;
  onModalClose: any;
  announcement: any;
}

const Admin_announcement_modal_update = (props: CurrentComponentProp) => {
  const { open, onModalClose, announcement } = props;

  const { setAnnouncements } = useContext_Announcements();

  const { t } = useTranslation();

  const [announcementUpdateObject, setAnnouncementUpdateObject] = useState({
    announcement_ID: announcement.announcement_ID,
    announcement_status: announcement.announcement_status,
    announcement_title: announcement.announcement_title,
    announcement_description: announcement.announcement_description,
    announcement_create_datetime: announcement.announcement_create_datetime,
    announcement_image: announcement.announcement_image,
  });
  const [validationErrors, setValidationErrors] = useState({
    announcement_ID: "",
    announcement_status: "",
    announcement_title: "",
    announcement_description: "",
    announcement_create_datetime: "",
    announcement_image: "",
  });
  const [announcementImage, setAnnouncementImage] = useState(null);
  const [announcementImageName, setAnnouncementImageName] = useState("");

  const [imagePreview, setImagePreview] = useState("");
  const [fileSizeNotice, setFileSizeNotice] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  const handleImageCancel = () => {
    setImagePreview("");
    setAnnouncementImage(null);
    setAnnouncementImageName("");
    setFileSizeNotice(false);
  };

  const handleModalClose = () => {
    setAnnouncementUpdateObject({
      announcement_ID: announcement.announcement_ID,
      announcement_status: announcement.announcement_status,
      announcement_title: announcement.announcement_title,
      announcement_description: announcement.announcement_description,
      announcement_create_datetime: announcement.announcement_create_datetime,
      announcement_image: announcement.announcement_image,
    });
    setValidationErrors({
      announcement_ID: "",
      announcement_status: "",
      announcement_title: "",
      announcement_description: "",
      announcement_create_datetime: "",
      announcement_image: "",
    });
    setAnnouncementImage(null);
    setAnnouncementImageName("");

    setImagePreview("");
    setFileSizeNotice(false);

    setIsSubmitting(false);
    setIsUpdateSuccess(false);

    onModalClose();
  };

  const originalImageName = announcement.announcement_image.replace(
    /^\/assets\/files\/announcements\//,
    ""
  );

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    // Check if the image is updated or not. //
    let imageNameToUpdate;

    if (announcementImage) {
      imageNameToUpdate = announcementImageName;
    } else {
      imageNameToUpdate = originalImageName;
    }

    const submissionStatus = await handleAnnouncementUpdate(
      announcementUpdateObject,
      announcementImage,
      imageNameToUpdate,
      setValidationErrors
    );

    if (submissionStatus) {
      getData(`${API_ENDPOINT}/api/v1/announcement/getAll`, (result: any) => {
        setAnnouncements(result);
      });

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
      title={t("Admin_Announcements_update_modal_header")}
      altIcon="fa-solid fa-circle-check text-green-500"
      altTitle={t("Admin_Announcements_update_modal_submit_success_message")}
      useAltTitle={isUpdateSuccess}
      overflow>
      <div className="grid grid-cols-1 gap-4">
        {/* Announcement image */}
        <div className="flex flex-col gap-1">
          {announcementImage ? (
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
                        setAnnouncementImage,
                        setFileSizeNotice,
                        setAnnouncementImageName
                      );
                    }}
                  />
                </label>
              </div>
            </div>
          ) : announcement.announcement_image !==
            "/assets/files/announcements/" ? (
            <div className="border border-standardBlack border-opacity-25 rounded-xl w-full sm:w-[500px] h-auto overflow-auto">
              <div className="relative">
                <label htmlFor="announcement_image">
                  <div className="flex justify-center items-center h-full">
                    <img
                      src={`${CDN_ENDPOINT}${announcement.announcement_image}`}
                    />
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
                        setAnnouncementImage,
                        setFileSizeNotice,
                        setAnnouncementImageName
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
                    {t("Admin_Announcements_crud_modal_file_label")}
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
                      setAnnouncementImage,
                      setFileSizeNotice,
                      setAnnouncementImageName
                    );
                  }}
                />
              </label>
            </div>
          )}
          {fileSizeNotice && (
            <h1 className="text-sm text-red-500 mb-2">
              {t("Admin_Announcements_crud_modal_file_fileSizeNotice_message")}
            </h1>
          )}
        </div>
        {/* Announcement status */}
        <TextField_select
          label={t("Admin_Announcements_crud_modal_status_label")}
          name="announcement_status"
          className="col-span-1"
          object={announcementUpdateObject}
          setObject={setAnnouncementUpdateObject}
          value={announcementUpdateObject.announcement_status}
          validation={validationErrors.announcement_status}>
          <option value="1">
            {t("Admin_Announcements_crud_modal_status_option1")}
          </option>
          <option value="2">
            {t("Admin_Announcements_crud_modal_status_option2")}
          </option>
        </TextField_select>
        {/* Announcement title */}
        <TextField_text
          label={t("Admin_Announcements_crud_modal_title_label")}
          name="announcement_title"
          className="col-span-1"
          object={announcementUpdateObject}
          setObject={setAnnouncementUpdateObject}
          value={announcementUpdateObject.announcement_title}
          validation={validationErrors.announcement_title}
        />
        {/* Announcement description */}
        <TextField_multiline
          label={t("Admin_Announcements_crud_modal_description_label")}
          name="announcement_description"
          className="col-span-1"
          maxRows={4}
          object={announcementUpdateObject}
          setObject={setAnnouncementUpdateObject}
          value={announcementUpdateObject.announcement_description}
          validation={validationErrors.announcement_description}
        />
      </div>
      {/* Submit button */}
      <Info_submit_button
        text={t("Admin_Announcements_update_modal_submit_button_title")}
        icon="fa-solid fa-bullhorn"
        isSubmitting={isSubmitting}
        onClickFunction={() => {
          setObjectAndSubmit();
        }}
      />
    </Custom_Modal>
  );
};

export default Admin_announcement_modal_update;
