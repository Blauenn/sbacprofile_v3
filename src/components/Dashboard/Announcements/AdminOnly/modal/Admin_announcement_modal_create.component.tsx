import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FileIcon } from "react-file-icon";
import { Modal, TextField } from "@mui/material";
import { Announcement } from "../../../../../interfaces/common.interface";
import {
  handleFileInputChange,
  handleInputChange,
} from "../../../../../functions/fields/handleFieldChanges.function";
import ModalCloseButton from "../../../../misc/common/ModalCloseButton.component";
import Info_submit_button from "../../../Buttons/Info_submit_button.component";
import Info_addSuccess_message from "../../../Buttons/Info_addSuccess_message.component";
import { style_modal_parent } from "../../../../../constants/styles/modal.style";

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
      announcement_image: "",
      announcement_datetime: "",
    });
  const [announcementFile, setAnnouncementFile] = useState(null);
  const [announcementFileName, setAnnouncementFileName] = useState("");
  const [fileSizeNotice, setFileSizeNotice] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);

  const handleModalClose = () => {
    setAnnouncementAddObject({
      announcement_title: "",
      announcement_description: "",
      announcement_image: "",
      announcement_datetime: "",
    });
    setAnnouncementFile(null);
    setAnnouncementFileName("");
    setFileSizeNotice(false);
    onModalClose();
  };

  const setObjectAndSubmit = () => {
    setIsSubmitting(true);
    console.log(announcementAddObject);
    console.log(announcementFile);
    console.log(announcementFileName);
    setIsCreateSuccess(true);
    setIsSubmitting(false);
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
              {/* Announcement title */}
              <TextField
                label={t("Admin_Announcements_create_modal_title_label")}
                name="announcement_title"
                className="col-span-1"
                onChange={(event) => {
                  handleInputChange(
                    event,
                    announcementAddObject,
                    setAnnouncementAddObject
                  );
                }}
              />
              {/* Announcement description */}
              <TextField
                label={t("Admin_Announcements_create_modal_description_label")}
                name="announcement_description"
                className="col-span-1"
                multiline
                maxRows={4}
                onChange={(event) => {
                  handleInputChange(
                    event,
                    announcementAddObject,
                    setAnnouncementAddObject
                  );
                }}
              />
              {/* Announcement files */}
              <div className="flex flex-col gap-2">
                <div className="border border-standardBlack border-opacity-25 rounded-xl w-full h-[100px]">
                  <label htmlFor="announcement_attached_file">
                    {announcementFile ? (
                      <>
                        <div className="flex flex-row justify-center items-center gap-4 w-full h-full px-8">
                          <div className="w-[50px]">
                            <FileIcon
                              extension={announcementFileName.split(".").pop()}
                              color="pink"
                            />
                          </div>
                          <h1 className="text-xl truncate">
                            {announcementFileName}
                          </h1>
                        </div>
                        <input
                          type="file"
                          name="announcement_attached_file"
                          id="announcement_attached_file"
                          hidden
                          onChange={(event) => {
                            handleFileInputChange(
                              'input[name="announcement_attached_file"]',
                              event,
                              setAnnouncementFile,
                              setAnnouncementFileName,
                              setFileSizeNotice
                            );
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <div className="flex flex-row justify-center items-center gap-4 w-full h-full">
                          <i className="fa-solid fa-folder text-4xl"></i>
                          <h1 className="text-xl">
                            {t("Admin_Announcements_create_modal_file_label")}
                          </h1>
                        </div>
                        <input
                          type="file"
                          name="announcement_attached_file"
                          id="announcement_attached_file"
                          hidden
                          onChange={(event) => {
                            handleFileInputChange(
                              'input[name="announcement_attached_file"]',
                              event,
                              setAnnouncementFile,
                              setAnnouncementFileName,
                              setFileSizeNotice
                            );
                          }}
                        />
                      </>
                    )}
                  </label>
                </div>
                {fileSizeNotice && (
                  <h1 className="text-sm text-red-500 mb-2">
                    {t(
                      "Admin_Announcements_create_modal_file_fileSizeNotice_message"
                    )}
                  </h1>
                )}
              </div>
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
