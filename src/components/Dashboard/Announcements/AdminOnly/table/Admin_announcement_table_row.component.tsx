import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Announcement } from "../../../../../interfaces/common.interface";
import Table_button_download from "../../../../table/Table_button_download.component";
import { style_table_content } from "../../../../../constants/styles/tables.style";
import { CDN_ENDPOINT } from "../../../../../constants/ENDPOINTS";
import Table_button from "../../../../table/Table_button.component";
import {
  changeToLocaleDate,
  getDayFromDate,
} from "../../../../../functions/getDates.function";
import Admin_announcement_modal_update from "../modal/Admin_announcement_modal_update.component";
import { DayColors } from "../../../../../constants/Misc.constant";
import { get_announcement_status_text } from "../../../../../functions/Admin/Announcements/Admin_announcements.function";

interface CurrentComponentProp {
  announcement: Announcement;
  index: number;
}

const Admin_announcement_table_row = (props: CurrentComponentProp) => {
  const { announcement, index } = props;

  const { t } = useTranslation();

  const dayColor_createDateTime =
    DayColors[getDayFromDate(announcement.announcement_create_datetime)];
  const localeDate_createDateTime = changeToLocaleDate(
    announcement.announcement_create_datetime
  ).split(",")[0];

  const [modalOpen, setModalOpen] = useState(false);
  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <tr className={index % 2 === 1 ? "bg-gray-200" : ""}>
        {/* Announcement status */}
        <td className={`${style_table_content} | hidden sm:table-cell`}>
          {get_announcement_status_text(announcement.announcement_status)}
        </td>
        {/* Announcement title */}
        <td className={`${style_table_content}`}>
          {announcement.announcement_title}
        </td>
        {/* Announcement description */}
        <td className={`${style_table_content} max-w-1/5 | hidden sm:table-cell`}>
          <h1 className="line-clamp-2">
            {announcement.announcement_description}
          </h1>
        </td>
        {/* Announcement create datetime */}
        <td
          className={`${style_table_content} ${dayColor_createDateTime} | hidden md:table-cell`}>
          {localeDate_createDateTime}
        </td>
        {/* Announcement view and image */}
        <td className={`${style_table_content}`}>
          <div className="flex gap-x-2">
            <Admin_announcement_modal_update
              open={modalOpen}
              onModalClose={onModalClose}
              announcement={announcement}
            />
            <Table_button
              text={t("Admin_Announcements_table_content_button_update_title")}
              color="bg-primary"
              functionToRun={() => {
                setModalOpen(true);
              }}
            />
            {announcement.announcement_image !== "/assets/files/announcements/" ? (
              <Table_button_download
                icon="fa-solid fa-image"
                color="bg-primary"
                extraClass="hidden sm:block"
                url={`${CDN_ENDPOINT}${announcement.announcement_image}`}
              />
            ) : null}
          </div>
        </td>
      </tr>
    </>
  );
};

export default Admin_announcement_table_row;
