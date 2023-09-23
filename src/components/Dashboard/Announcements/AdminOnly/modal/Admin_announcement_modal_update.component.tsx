import { useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { Modal } from "@mui/material";
import {
  TextField_multiline,
  TextField_select,
  TextField_text,
} from "../../../../custom/Custom_TextFields";
import { Announcement } from "../../../../../interfaces/common.interface";
import { handleImageChange } from "../../../../../functions/fields/handleFieldChanges.function";
import { getData } from "../../../../../functions/fetchFromAPI.function";
import FileResetButton from "../../../../misc/common/FileResetButton.component";
import Info_submit_button from "../../../Buttons/Info_submit_button.component";
import Info_success_message from "../../../Buttons/Info_success_message.component";
import ModalCloseButton from "../../../../misc/common/ModalCloseButton.component";
import { handleAnnouncementUpdate } from "../../../../../functions/Admin/Announcements/Admin_announcements.function";
import { API_ENDPOINT, CDN_ENDPOINT } from "../../../../../constants/ENDPOINTS";
import { style_modal_parent_large } from "../../../../../constants/styles/modal.style";

// Contexts //
import { useContext_Announcements } from "../../../../../context/Announcements.context";

interface CurrentComponentProp {
  open: boolean;
  onModalClose: any;
  announcement: Announcement;
}

const Admin_announcement_modal_update = (props: CurrentComponentProp) => {
  const { open, onModalClose, announcement } = props;

  const { setAnnouncements } = useContext_Announcements();

  const { t } = useTranslation();

  const [announcementUpdateObject, setAnnouncementsUpdateObject] =
    useState<Announcement>({
      announcement_ID: announcement.announcement_ID,
      announcement_status: announcement.announcement_status,
      announcement_title: announcement.announcement_title,
      announcement_description: announcement.announcement_description,
      announcement_create_datetime: announcement.announcement_create_datetime,
      announcement_image: announcement.announcement_image,
    });

  const [announcementImagePreview, setAnnouncementImagePreview] = useState("");
  const [announcementImage, setAnnouncementImage] = useState(null);
  const [announcementImageName, setAnnouncementImageName] = useState("");
  const [fileSizeNotice, setFileSizeNotice] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    announcement_ID: "",
    announcement_status: "",
    announcement_title: "",
    announcement_description: "",
    announcement_create_datetime: "",
    announcement_image: "",
  });

  const handleImageCancel = () => {
    setAnnouncementImagePreview("");
    setAnnouncementImage(null);
    setAnnouncementImageName("");
    setFileSizeNotice(false);
  };

  const handleModalClose = () => {
    setAnnouncementsUpdateObject({
      announcement_ID: announcement.announcement_ID,
      announcement_status: announcement.announcement_status,
      announcement_title: announcement.announcement_title,
      announcement_description: announcement.announcement_description,
      announcement_create_datetime: announcement.announcement_create_datetime,
      announcement_image: announcement.announcement_image,
    });
    setAnnouncementImagePreview("");
    setAnnouncementImage(null);
    setAnnouncementImageName("");
    setFileSizeNotice(false);
    setIsSubmitting(false);
    setIsUpdateSuccess(false);
    onModalClose();
  };

  const originalImageName = announcement.announcement_image.replace(
    /^\/assets\/files\/announcements\//,
    ""
  );

  const setObjectAndSubmit = () => {
    setIsSubmitting(true);

    // Check if the image is updated or not. //
    let imageNameToUpdate;

    if (announcementImage) {
      imageNameToUpdate = announcementImageName;
    } else {
      imageNameToUpdate = originalImageName;
    }

    handleAnnouncementUpdate(
      announcementUpdateObject,
      announcementImage,
      imageNameToUpdate,
      setValidationErrors,
      callback
    );
    setIsSubmitting(false);
  };

  const callback = (status: boolean) => {
    if (status) {
      setIsSubmitting(false);
      setIsUpdateSuccess(true);
      // Fetch announcements //
      getData(`${API_ENDPOINT}/api/v1/announcement/getAll`, (result: any) => {
        setAnnouncements(result);
      });
    } else {
      setIsSubmitting(false);
      setIsUpdateSuccess(false);
    }
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
                  {t("Admin_Announcements_update_modal_header")}
                </h1>
                <div className="grid grid-cols-1 gap-4">
                  {/* Announcement image */}
                  {announcementImage ? (
                    <div className="border border-standardBlack border-opacity-25 rounded-xl w-full sm:w-[500px] h-auto overflow-auto">
                      <div className="relative">
                        <FileResetButton functionToRun={handleImageCancel} />
                        <label htmlFor="announcement_image">
                          <div className="flex justify-center items-center h-full">
                            <img
                              src={announcementImagePreview}
                              className="w-full h-auto"
                            />
                          </div>
                          <input
                            type="file"
                            name="announcement_image"
                            id="announcement_image"
                            accept=".jpg, .jpeg, .png"
                            hidden
                            onChange={(event) => {
                              handleImageChange(
                                event,
                                setAnnouncementImagePreview,
                                setAnnouncementImage,
                                setAnnouncementImageName,
                                setFileSizeNotice
                              );
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  ) : announcement.announcement_image !== "" ? (
                    <div className="border border-standardBlack border-opacity-25 rounded-xl w-full sm:w-[500px] h-auto overflow-auto">
                      <div className="relative">
                        <FileResetButton functionToRun={handleImageCancel} />
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
                              handleImageChange(
                                event,
                                setAnnouncementImagePreview,
                                setAnnouncementImage,
                                setAnnouncementImageName,
                                setFileSizeNotice
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
                            handleImageChange(
                              event,
                              setAnnouncementImagePreview,
                              setAnnouncementImage,
                              setAnnouncementImageName,
                              setFileSizeNotice
                            );
                          }}
                        />
                      </label>
                    </div>
                  )}
                  {/* Announcement status */}
                  <TextField_select
                    label={t("Admin_Announcements_crud_modal_status_label")}
                    name="announcement_status"
                    className="col-span-1"
                    object={announcementUpdateObject}
                    setObject={setAnnouncementsUpdateObject}
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
                    setObject={setAnnouncementsUpdateObject}
                    value={announcementUpdateObject.announcement_title}
                    validation={validationErrors.announcement_title}
                  />
                  {/* Announcement description */}
                  <TextField_multiline
                    label={t(
                      "Admin_Announcements_crud_modal_description_label"
                    )}
                    name="announcement_description"
                    className="col-span-1"
                    maxRows={4}
                    object={announcementUpdateObject}
                    setObject={setAnnouncementsUpdateObject}
                    value={announcementUpdateObject.announcement_description}
                    validation={validationErrors.announcement_description}
                  />
                  {/* Submit button */}
                  <Info_submit_button
                    text={t(
                      "Admin_Announcements_update_modal_submit_button_title"
                    )}
                    icon="fa-solid fa-bullhorn"
                    isSubmitting={isSubmitting}
                    onClickFunction={setObjectAndSubmit}
                  />
                  {/* Success message */}
                  <Info_success_message
                    message={t(
                      "Admin_Announcements_update_modal_submit_success_message"
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

export default Admin_announcement_modal_update;
