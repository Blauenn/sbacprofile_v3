import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { Announcement } from "../../../../../interfaces/common.interface";
import { Modal } from "@mui/material";
import { style_modal_parent_large } from "../../../../../constants/styles/modal.style";
import ModalCloseButton from "../../../../misc/common/ModalCloseButton.component";
import {
  TextField_multiline,
  TextField_select,
  TextField_text,
} from "../../../../custom/Custom_TextFields";
import { useState } from "react";

interface CurrentComponentProp {
  open: boolean;
  onModalClose: any;
  announcement: Announcement;
}

const Admin_announcement_modal_update = (props: CurrentComponentProp) => {
  const { open, onModalClose, announcement } = props;

  const { t } = useTranslation();

  const [announcementsToUpdate, setAnnouncementsToUpdate] =
    useState<Announcement>({
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

  const handleModalClose = () => {
    setAnnouncementsToUpdate({
      announcement_ID: announcement.announcement_ID,
      announcement_status: announcement.announcement_status,
      announcement_title: announcement.announcement_title,
      announcement_description: announcement.announcement_description,
      announcement_create_datetime: announcement.announcement_create_datetime,
      announcement_image: announcement.announcement_image,
    });
    onModalClose();
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
                  {/* Announcement status */}
                  <TextField_select
                    label={t("Admin_Announcements_crud_modal_status_label")}
                    name="announcement_status"
                    className="col-span-1"
                    object={announcementsToUpdate}
                    setObject={setAnnouncementsToUpdate}
                    value={announcementsToUpdate.announcement_status}
                    validation={validationErrors.announcement_status}>
                    <option value="1">{t("Admin_Announcements_crud_modal_status_option1")}</option>
                    <option value="2">{t("Admin_Announcements_crud_modal_status_option2")}</option>
                  </TextField_select>
                  {/* Announcement title */}
                  <TextField_text
                    label={t("Admin_Announcements_crud_modal_title_label")}
                    name="announcement_title"
                    className="col-span-1"
                    object={announcementsToUpdate}
                    setObject={setAnnouncementsToUpdate}
                    value={announcementsToUpdate.announcement_title}
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
                    object={announcementsToUpdate}
                    setObject={setAnnouncementsToUpdate}
                    value={announcementsToUpdate.announcement_description}
                    validation={validationErrors.announcement_description}
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
