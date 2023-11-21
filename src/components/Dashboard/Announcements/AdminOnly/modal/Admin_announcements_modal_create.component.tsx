import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TextField_multiline,
  TextField_text,
} from "../../../../custom/Custom_TextFields";
import Custom_Modal from "../../../../custom/Custom_Modal";
import { handle_image_change } from "../../../../../functions/fields/handleFieldChanges.function";
import { handleAnnouncementCreate } from "../../../../../functions/Announcements/Admin_announcements.function";
import Info_submit_button from "../../../Buttons/Info_submit_button.component";
import FileResetButton from "../../../../misc/common/FileResetButton.component";

// Contexts //
import { useContext_Announcements } from "../../../../../context/Announcements.context";

interface CurrentComponentProp {
  open: boolean;
  onModalClose: () => void;
}

const Admin_announcements_modal_create = (props: CurrentComponentProp) => {
  const { open, onModalClose } = props;

  const { fetchAnnouncements } = useContext_Announcements();

  const { t } = useTranslation();

  const [announcementCreateObject, setAnnouncementCreateObject] = useState({
    announcement_title: "",
    announcement_description: "",
    announcement_status: 1,
    announcement_image: "",
    announcement_create_datetime: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    announcement_status: "",
    announcement_title: "",
    announcement_description: "",
  });
  const [announcementCreateImage, setAnnouncementCreateImage] = useState(null);
  const [announcementCreateImageName, setAnnouncementCreateImageName] =
    useState("");

  const [imagePreview, setImagePreview] = useState("");
  const [fileSizeNotice, setFileSizeNotice] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);

  const handleImageCancel = () => {
    setImagePreview("");
    setAnnouncementCreateImage(null);
    setAnnouncementCreateImageName("");
    setFileSizeNotice(false);
  };

  const handleModalClose = () => {
    setAnnouncementCreateObject({
      announcement_title: "",
      announcement_description: "",
      announcement_status: 1,
      announcement_image: "",
      announcement_create_datetime: "",
    });
    setValidationErrors({
      announcement_status: "",
      announcement_title: "",
      announcement_description: "",
    });
    setAnnouncementCreateImage(null);
    setAnnouncementCreateImageName("");

    setImagePreview("");
    setFileSizeNotice(false);

    setIsSubmitting(false);
    setIsCreateSuccess(false);

    onModalClose();
  };

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const submissionStatus = await handleAnnouncementCreate(
      announcementCreateObject,
      announcementCreateImage,
      announcementCreateImageName,
      setValidationErrors
    );

    if (submissionStatus) {
      fetchAnnouncements();

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
      title={t("Admin_Announcements_create_modal_header")}
      overflow>
      <div className="grid grid-cols-1 gap-4">
        {/* Announcement image */}
        <div className="flex flex-col gap-2">
          {announcementCreateImage ? (
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
                        setAnnouncementCreateImage,
                        setFileSizeNotice,
                        setAnnouncementCreateImageName
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
                      setAnnouncementCreateImage,
                      setFileSizeNotice,
                      setAnnouncementCreateImageName
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
        {/* Announcement title */}
        <TextField_text
          label={t("Admin_Announcements_crud_modal_title_label")}
          name="announcement_title"
          className="col-span-1"
          object={announcementCreateObject}
          setObject={setAnnouncementCreateObject}
          value={announcementCreateObject.announcement_title}
          validation={validationErrors.announcement_title}
        />
        {/* Announcement description */}
        <TextField_multiline
          label={t("Admin_Announcements_crud_modal_description_label")}
          name="announcement_description"
          className="col-span-1"
          maxRows={4}
          object={announcementCreateObject}
          setObject={setAnnouncementCreateObject}
          value={announcementCreateObject.announcement_description}
          validation={validationErrors.announcement_description}
        />
        {/* Submit button */}
        <Info_submit_button
          text={t("Admin_Announcements_create_modal_submit_button_title")}
          successText={t(
            "Admin_Announcements_create_modal_submit_success_message"
          )}
          icon="fa-solid fa-bullhorn"
          isSubmitting={isSubmitting}
          isSuccess={isCreateSuccess}
          onClickFunction={setObjectAndSubmit}
        />
      </div>
    </Custom_Modal>
  );
};

export default Admin_announcements_modal_create;
