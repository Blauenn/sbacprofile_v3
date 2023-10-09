import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Announcement } from "../../../../../interfaces/common.interface";
import Table_button_download from "../../../../table/Table_button_download.component";
import { table_content_style } from "../../../../../constants/styles/tables.style";
import { CDN_ENDPOINT } from "../../../../../constants/ENDPOINTS";
import Table_button from "../../../../table/Table_button.component";
import {
  change_to_locale_date,
  get_day_from_date,
} from "../../../../../functions/getDates.function";
import Admin_announcement_modal_update from "../modal/Admin_announcement_modal_update.component";
import { Day_Colors } from "../../../../../constants/Misc.constant";
import { get_announcement_status_text } from "../../../../../functions/Admin/Announcements/Admin_announcements.function";

interface CurrentComponentProp {
  announcement: Announcement;
  index: number;
}

const Admin_announcement_table_row = (props: CurrentComponentProp) => {
  const { announcement, index } = props;

  const { t } = useTranslation();

  const dayColor_createDateTime =
    Day_Colors[get_day_from_date(announcement.announcement_create_datetime)];
  const localeDate_createDateTime = change_to_locale_date(
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
        <td className={`${table_content_style} | hidden sm:table-cell`}>
          {get_announcement_status_text(announcement.announcement_status)}
        </td>
        {/* Announcement title */}
        <td className={`${table_content_style}`}>
          {announcement.announcement_title}
        </td>
        {/* Announcement description */}
        <td className={`${table_content_style} max-w-1/5 | hidden sm:table-cell`}>
          <h1 className="line-clamp-2">
            {announcement.announcement_description}
          </h1>
        </td>
        {/* Announcement create datetime */}
        <td
          className={`${table_content_style} ${dayColor_createDateTime} | hidden md:table-cell`}>
          {localeDate_createDateTime}
        </td>
        {/* Announcement view and image */}
        <td className={`${table_content_style}`}>
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
