import { useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { LeaveNotice } from "../../../../interfaces/common.interface.ts";
import {
  change_to_date,
  change_to_locale_date,
  get_day_from_date,
} from "../../../../functions/getDates.function.ts";
import { get_text_from_status_table } from "../../../../functions/LeaveNotices/LeaveNotices.function.tsx";
import Table_button from "../../../table/Table_button.component.tsx";
import Table_button_download from "../../../table/Table_button_download.component.tsx";
import Teacher_leaveNotices_modal from "../modal/Teacher_leaveNotices_modal.component.tsx";
import {
  LeaveNotice_Choice,
  LeaveNotice_Choice_Thai,
} from "../../../../constants/LeaveNotices.constant.ts";
import { Day_Colors } from "../../../../constants/Misc.constant.ts";
import { CDN_ENDPOINT } from "../../../../constants/ENDPOINTS.ts";
import { table_content_style } from "../../../../constants/styles/tables.style.tsx";

interface CurrentComponentProp {
  leaveNotice: LeaveNotice;
  index: number;
}

const Teacher_leaveNotices_table_row = (props: CurrentComponentProp) => {
  const { leaveNotice, index } = props;

  const { t } = useTranslation();

  const dayColor_createDateTime =
    Day_Colors[get_day_from_date(leaveNotice.leave_notice_create_datetime)];
  const dayColor_startDateTime =
    Day_Colors[get_day_from_date(leaveNotice.leave_notice_start_datetime)];
  const dayColor_endDateTime =
    Day_Colors[get_day_from_date(leaveNotice.leave_notice_end_datetime)];

  const localeDate_createDateTime = change_to_locale_date(
    leaveNotice.leave_notice_create_datetime
  ).split(",")[0];
  const localeDate_startDateTime = change_to_locale_date(
    leaveNotice.leave_notice_start_datetime
  ).split(",")[0];
  const localeDate_endDateTime = change_to_locale_date(
    leaveNotice.leave_notice_end_datetime
  ).split(",")[0];

  const dateToISOString_startDateTime = change_to_date(
    leaveNotice.leave_notice_start_datetime
  )
    .toISOString()
    .split("T")[0];

  const dateToISOString_endDateTime = change_to_date(
    leaveNotice.leave_notice_end_datetime
  )
    .toISOString()
    .split("T")[0];

  const [modalOpen, setModalOpen] = useState(false);
  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <tr className={index % 2 === 1 ? "bg-gray-200" : ""}>
      {/* Leave notice submit date */}
      <td
        className={`${table_content_style} | hidden md:table-cell ${dayColor_createDateTime}`}>
        <h1>{localeDate_createDateTime}</h1>
      </td>
      {/* Leave notice choice */}
      <td className={`${table_content_style} | hidden md:table-cell`}>
        {i18n.language === "th"
          ? LeaveNotice_Choice_Thai[leaveNotice.leave_notice_choice]
          : LeaveNotice_Choice[leaveNotice.leave_notice_choice]}
      </td>
      {/* Leave notice for dates */}
      {dateToISOString_startDateTime === dateToISOString_endDateTime ? (
        <>
          {/* Leave notice start and end datetime altogether. */}
          <td
            className={`${table_content_style} text-center ${dayColor_startDateTime}`}
            colSpan={2}>
            <h1>{localeDate_startDateTime}</h1>
          </td>
        </>
      ) : (
        <>
          {/* Leave notice start and end datetime */}
          <td className={`${table_content_style}`} colSpan={2}>
            <div className="flex flex-row items-center gap-4">
              <h1 className={dayColor_startDateTime}>
                {localeDate_startDateTime}
              </h1>
              <i className="fa-solid fa-arrow-right opacity-50 | hidden sm:block"></i>
              <h1 className={dayColor_endDateTime}>{localeDate_endDateTime}</h1>
            </div>
          </td>
        </>
      )}
      {/* Leave notice status */}
      <td className={`${table_content_style} | hidden sm:table-cell`}>
        {get_text_from_status_table(leaveNotice, t)}
      </td>
      {/* Buttons */}
      <td className={table_content_style}>
        <div className="flex gap-x-2">
          {/* View info button */}
          <Teacher_leaveNotices_modal
            leaveNotice={leaveNotice}
            open={modalOpen}
            onModalClose={onModalClose}
          />
          <Table_button
            icon="fa-solid fa-check"
            color="bg-blue-500"
            functionToRun={() => {
              setModalOpen(true);
            }}
          />
          {/* View file button */}
          {leaveNotice.leave_notice_attached_file != "" ? (
            <Table_button_download
              icon="fa-solid fa-folder"
              color="bg-purple-500"
              url={`${CDN_ENDPOINT}${leaveNotice.leave_notice_attached_file}`}
            />
          ) : null}
        </div>
      </td>
    </tr>
  );
};

export default Teacher_leaveNotices_table_row;
