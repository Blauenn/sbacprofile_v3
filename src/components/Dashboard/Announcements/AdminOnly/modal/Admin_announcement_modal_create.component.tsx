import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "@mui/material";
import { Announcement } from "../../../../../interfaces/common.interface";
import { handleImageChange } from "../../../../../functions/fields/handleFieldChanges.function";
import ModalCloseButton from "../../../../misc/common/ModalCloseButton.component";
import Info_submit_button from "../../../Buttons/Info_submit_button.component";
import Info_addSuccess_message from "../../../Buttons/Info_addSuccess_message.component";
import { style_modal_parent } from "../../../../../constants/styles/modal.style";
import FileResetButton from "../../../../misc/common/FileResetButton.component";
import { handleAnnouncementCreate } from "../../../../../functions/Admin/Announcements/Admin_announcements.function";
import {
  TextField_multiline,
  TextField_text,
} from "../../../../custom/Custom_TextFields";

interface CurrentComponentProp {
  open: boolean;
  onModalClose: any;
}

const Admin_announcement_modal_create = (props: CurrentComponentProp) => {
  const { open, onModalClose } = props;

  const { t } = useTranslation();

  const [announcementAddObject, setAnnouncementAddObject] =
    useState<Announcement>({
      announcement_title: "",
      announcement_description: "",
      announcement_status: 1,
      announcement_image: "",
      announcement_create_datetime: "",
    });
  const [announcementImagePreview, setAnnouncementImagePreview] = useState("");
  const [announcementImage, setAnnouncementImage] = useState(null);
  const [announcementImageName, setAnnouncementImageName] = useState("");
  const [fileSizeNotice, setFileSizeNotice] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    announcement_title: "",
    announcement_description: "",
  });

  const handleImageCancel = () => {
    setAnnouncementImagePreview("");
    setAnnouncementImage(null);
    setAnnouncementImageName("");
    setFileSizeNotice(false);
  };

  const handleModalClose = () => {
    setAnnouncementAddObject({
      announcement_title: "",
      announcement_description: "",
      announcement_status: 1,
      announcement_image: "",
      announcement_create_datetime: "",
    });
    setAnnouncementImagePreview("");
    setAnnouncementImage(null);
    setAnnouncementImageName("");
    setFileSizeNotice(false);
    setIsSubmitting(false);
    setIsCreateSuccess(false);
    onModalClose();
  };

  const setObjectAndSubmit = () => {
    setIsSubmitting(true);
    handleAnnouncementCreate(
      announcementAddObject,
      announcementImage,
      announcementImageName,
      setValidationErrors,
      callback
    );
    setIsSubmitting(false);
  };

  const callback = (status: boolean) => {
    if (status) {
      setIsSubmitting(false);
      setIsCreateSuccess(true);
      console.log("Success");
    } else {
      setIsSubmitting(false);
      setIsCreateSuccess(false);
      console.log("Failed");
    }
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
              {t("Admin_Announcements_create_modal_header")}
            </h1>
            <div className="grid grid-cols-1 gap-4">
              {/* Announcement image */}
              <div className="flex flex-col gap-2">
                {announcementImage ? (
                  <div className="border border-standardBlack border-opacity-25 rounded-xl w-full h-auto overflow-auto">
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
                {fileSizeNotice && (
                  <h1 className="text-sm text-red-500 mb-2">
                    {t(
                      "Admin_Announcements_crud_modal_file_fileSizeNotice_message"
                    )}
                  </h1>
                )}
              </div>
              {/* Announcement title */}
              <TextField_text
                label={t("Admin_Announcements_crud_modal_title_label")}
                name="announcement_title"
                className="col-span-1"
                object={announcementAddObject}
                setObject={setAnnouncementAddObject}
                value={announcementAddObject.announcement_title}
                validation={validationErrors.announcement_title}
              />
              {/* Announcement description */}
              <TextField_multiline
                label={t("Admin_Announcements_crud_modal_description_label")}
                name="announcement_description"
                className="col-span-1"
                maxRows={4}
                object={announcementAddObject}
                setObject={setAnnouncementAddObject}
                value={announcementAddObject.announcement_description}
                validation={validationErrors.announcement_description}
              />
              {/* Submit button */}
              <Info_submit_button
                text={t("Admin_Announcements_create_modal_submit_button_title")}
                icon="fa-solid fa-bullhorn"
                isSubmitting={isSubmitting}
                onClickFunction={setObjectAndSubmit}
              />
              {/* Success message */}
              <Info_addSuccess_message
                message={t(
                  "Admin_Announcements_create_modal_submit_success_message"
                )}
                isSuccess={isCreateSuccess}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Admin_announcement_modal_create;
