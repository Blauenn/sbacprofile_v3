import { useState } from "react";
import { Announcement } from "../../../../../interfaces/common.interface";
import {
  change_to_locale_date,
  get_day_from_date,
} from "../../../../../functions/getDates.function";
import Table_button_download from "../../../../table/Table_button_download.component";
import Table_button from "../../../../table/Table_button.component";
import Admin_announcement_modal_update from "../modal/Admin_announcements_modal_update.component";
import { get_announcement_status_icon } from "../../../../../functions/Admin/Announcements/Admin_announcements.function";
import Admin_announcements_modal_delete from "../modal/Admin_announcements_modal_delete.component";
import { table_content_style } from "../../../../../constants/styles/tables.style";
import { Day_Colors } from "../../../../../constants/Misc.constant";
import { CDN_ENDPOINT } from "../../../../../constants/ENDPOINTS";

interface CurrentComponentProp {
  announcement: Announcement;
  index: number;
}

const Admin_announcements_table_row = (props: CurrentComponentProp) => {
  const { announcement, index } = props;

  const dayColor_createDateTime =
    Day_Colors[get_day_from_date(announcement.announcement_create_datetime)];
  const localeDate_createDateTime = change_to_locale_date(
    announcement.announcement_create_datetime
  ).split(",")[0];

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const onUpdateModalClose = () => {
    setUpdateModalOpen(false);
  };
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const onDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  return (
    <tr className={index % 2 === 1 ? "bg-gray-200" : ""}>
      {/* Announcement status */}
      <td className={`${table_content_style} | hidden sm:table-cell`}>
        <div className="ms-4">
          <i
            className={get_announcement_status_icon(
              announcement.announcement_status
            )}></i>
        </div>
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
        <div className="flex gap-x-4">
          {announcement.announcement_image !==
          "/assets/files/announcements/" ? (
            <Table_button_download
              icon="fa-solid fa-image"
              color="bg-primary"
              extraClass="hidden sm:block"
              url={`${CDN_ENDPOINT}${announcement.announcement_image}`}
            />
          ) : null}
          <div className="flex gap-x-2">
            {/* Update button */}
            <Admin_announcement_modal_update
              open={updateModalOpen}
              onModalClose={onUpdateModalClose}
              announcement={announcement}
            />
            <Table_button
              icon="fa-solid fa-pencil"
              color="bg-yellow-500"
              functionToRun={() => {
                setUpdateModalOpen(true);
              }}
            />
            {/* Delete button */}
            <Admin_announcements_modal_delete
              announcement={announcement}
              open={deleteModalOpen}
              onModalClose={onDeleteModalClose}
            />
            <Table_button
              icon="fa-solid fa-trash-can"
              color="bg-red-500"
              functionToRun={() => {
                setDeleteModalOpen(true);
              }}
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Admin_announcements_table_row;
