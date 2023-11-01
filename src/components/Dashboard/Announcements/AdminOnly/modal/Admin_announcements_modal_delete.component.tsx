import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../../custom/Custom_Modal";
import Info_submit_button from "../../../Buttons/Info_submit_button.component";
import { useState } from "react";
import { handleAnnouncementDelete } from "../../../../../functions/Admin/Announcements/Admin_announcements.function";
import { getData } from "../../../../../functions/fetchFromAPI.function";
import { API_ENDPOINT } from "../../../../../constants/ENDPOINTS";
import { useContext_Announcements } from "../../../../../context/Announcements.context";

interface CurrentComponentProp {
  announcement: any;
  open: boolean;
  onModalClose: any;
}

const Admin_announcements_modal_delete = (props: CurrentComponentProp) => {
  const { announcement, open, onModalClose } = props;

  const { setAnnouncements } = useContext_Announcements();

  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  const handleModalClose = () => {
    onModalClose();
  };

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const submissionStatus = await handleAnnouncementDelete(
      announcement.announcement_ID
    );

    if (submissionStatus) {
      // Announcements //
      getData(`${API_ENDPOINT}/api/v1/announcement/getAll`, (result: any) => {
        setAnnouncements(result);
      });

      setIsSubmitting(false);
      setIsDeleteSuccess(true);

      handleModalClose();
    } else {
      setIsSubmitting(false);
      setIsDeleteSuccess(false);
    }
  };

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-trash-can"
      title={t("Admin_Announcements_delete_modal_header")}>
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-8">
          <h1 className="text-xl opacity-50">
            {t("Admin_Announcements_delete_modal_message")}
          </h1>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">{announcement.announcement_title}</h1>
            <h1 className="text-lg opacity-50">
              {announcement.announcement_description}
            </h1>
          </div>
          {/* Submit button */}
          <Info_submit_button
            text={t("Admin_Announcements_delete_modal_submit_button_title")}
            successText={t(
              "Admin_Announcements_delete_modal_submit_success_message"
            )}
            icon="fa-solid fa-trash-can"
            color="border-red-500 hover:bg-red-500 text-red-500"
            isSubmitting={isSubmitting}
            isSuccess={isDeleteSuccess}
            onClickFunction={setObjectAndSubmit}
          />
        </div>
      </div>
    </Custom_Modal>
  );
};

export default Admin_announcements_modal_delete;
