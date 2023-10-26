import { useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { LeaveNotice } from "../../../../interfaces/common.interface";
import {
  change_to_date,
  change_to_locale_date,
  get_day_from_date,
} from "../../../../functions/getDates.function";
import { get_text_from_status_table } from "../../../../functions/LeaveNotices/LeaveNotices.function";
import { Day_Colors } from "../../../../constants/Misc.constant";
import Table_button from "../../../table/Table_button.component";
import Table_button_download from "../../../table/Table_button_download.component";
import Head_leaveNotices_modal from "../modal/Head_leaveNotices_modal.component";
import {
  LeaveNotice_Choice,
  LeaveNotice_Choice_German,
  LeaveNotice_Choice_Korean,
  LeaveNotice_Choice_Thai,
} from "../../../../constants/LeaveNotices.constant";
import { CDN_ENDPOINT } from "../../../../constants/ENDPOINTS";
import { table_content_style } from "../../../../constants/styles/tables.style";

interface CurrentComponentProp {
  leaveNotice: LeaveNotice;
  index: number;
}

const Head_leaveNotices_table_row = (props: CurrentComponentProp) => {
  const { leaveNotice, index } = props;

  const { t } = useTranslation();

  const dayColor_startDateTime =
    Day_Colors[get_day_from_date(leaveNotice.leave_notice_start_datetime)];
  const dayColor_endDateTime =
    Day_Colors[get_day_from_date(leaveNotice.leave_notice_end_datetime)];

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
    <>
      <tr className={index % 2 === 1 ? "bg-gray-200" : ""}>
        {/* Leave notice ID */}
        <td
          className={`${table_content_style} font-family-monospace | hidden lg:table-cell`}>
          <h1>{leaveNotice.leave_notice_ID}</h1>
        </td>
        {/* Leave notice create datetime */}
        <td
          className={`${table_content_style} ${
            Day_Colors[
              get_day_from_date(leaveNotice.leave_notice_create_datetime)
            ]
          } | hidden xl:table-cell`}>
          <h1>
            {
              change_to_locale_date(
                leaveNotice.leave_notice_create_datetime
              ).split(",")[0]
            }
          </h1>
        </td>
        {/* Leave notice choice */}
        <td className={`${table_content_style} | hidden md:table-cell`}>
          {i18n.language === "th"
            ? LeaveNotice_Choice_Thai[leaveNotice.leave_notice_choice]
            : i18n.language === "ko"
            ? LeaveNotice_Choice_Korean[leaveNotice.leave_notice_choice]
            : i18n.language === "de"
            ? LeaveNotice_Choice_German[leaveNotice.leave_notice_choice]
            : LeaveNotice_Choice[leaveNotice.leave_notice_choice]}
        </td>
        {/* Leave notice for dates */}
        {dateToISOString_startDateTime === dateToISOString_endDateTime ? (
          <>
            {/* Leave notice start and end datetime altogether */}
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
                <h1 className={dayColor_endDateTime}>
                  {localeDate_endDateTime}
                </h1>
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
            <Head_leaveNotices_modal
              leaveNotice={leaveNotice}
              open={modalOpen}
              onModalClose={onModalClose}
            />
            <Table_button
              text={t("Admin_LeaveNotices_table_content_button_view_title")}
              color="bg-blue-500"
              functionToRun={() => {
                setModalOpen(true);
              }}
            />
            {/* View file button */}
            {leaveNotice.leave_notice_attached_file != "" ? (
              <Table_button_download
                text={t("Admin_LeaveNotices_table_content_button_file_title")}
                color="bg-purple-500"
                url={`${CDN_ENDPOINT}${leaveNotice.leave_notice_attached_file}`}
              />
            ) : null}
          </div>
        </td>
      </tr>
    </>
  );
};

export default Head_leaveNotices_table_row;
