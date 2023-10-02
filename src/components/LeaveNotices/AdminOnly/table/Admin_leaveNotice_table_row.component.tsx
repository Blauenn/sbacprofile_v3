import { useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { LeaveNotice } from "../../../../interfaces/common.interface";
import {
  changeToDate,
  changeToLocaleDate,
  getDayFromDate,
} from "../../../../functions/getDates.function";
import { getTextFromStatus_Table } from "../../../../functions/LeaveNotice/LeaveNotice.function";
import { DayColors } from "../../../../constants/Misc.constant";
import {
  LeaveNoticeChoice,
  LeaveNoticeChoiceGerman,
  LeaveNoticeChoiceKorean,
  LeaveNoticeChoiceThai,
} from "../../../../constants/LeaveNotices.constant";
import Table_button from "../../../table/Table_button.component";
import Table_button_download from "../../../table/Table_button_download.component";
import Admin_leaveNotice_modal from "../modal/Admin_leaveNotice_modal.component";
import { CDN_ENDPOINT } from "../../../../constants/ENDPOINTS";
import { style_table_content } from "../../../../constants/styles/tables.style";

interface CurrentComponentProp {
  leaveNotice: LeaveNotice;
  index: number;
}

const Admin_leaveNotice_table_row = (props: CurrentComponentProp) => {
  const { leaveNotice, index } = props;

  const { t } = useTranslation();

  const dayColor_startDateTime =
    DayColors[getDayFromDate(leaveNotice.leave_notice_start_datetime)];
  const dayColor_endDateTime =
    DayColors[getDayFromDate(leaveNotice.leave_notice_end_datetime)];

  const localeDate_startDateTime = changeToLocaleDate(
    leaveNotice.leave_notice_start_datetime
  ).split(",")[0];
  const localeDate_endDateTime = changeToLocaleDate(
    leaveNotice.leave_notice_end_datetime
  ).split(",")[0];

  const dateToISOString_startDateTime = changeToDate(
    leaveNotice.leave_notice_start_datetime
  )
    .toISOString()
    .split("T")[0];

  const dateToISOString_endDateTime = changeToDate(
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
          className={`${style_table_content} font-family-monospace | hidden lg:table-cell`}>
          <h1>{leaveNotice.leave_notice_ID}</h1>
        </td>
        {/* Leave notice create datetime */}
        <td
          className={`${style_table_content} ${
            DayColors[getDayFromDate(leaveNotice.leave_notice_create_datetime)]
          } | hidden xl:table-cell`}>
          <h1>
            {
              changeToLocaleDate(
                leaveNotice.leave_notice_create_datetime
              ).split(",")[0]
            }
          </h1>
        </td>
        {/* Leave notice choice */}
        <td className={`${style_table_content} | hidden md:table-cell`}>
          {i18n.language === "th"
            ? LeaveNoticeChoiceThai[leaveNotice.leave_notice_choice]
            : i18n.language === "ko"
            ? LeaveNoticeChoiceKorean[leaveNotice.leave_notice_choice]
            : i18n.language === "de"
            ? LeaveNoticeChoiceGerman[leaveNotice.leave_notice_choice]
            : LeaveNoticeChoice[leaveNotice.leave_notice_choice]}
        </td>
        {/* Leave notice for dates */}
        {dateToISOString_startDateTime === dateToISOString_endDateTime ? (
          <>
            {/* Leave notice start and end datetime altogether */}
            <td
              className={`${style_table_content} text-center ${dayColor_startDateTime}`}
              colSpan={2}>
              <h1>{localeDate_startDateTime}</h1>
            </td>
          </>
        ) : (
          <>
            {/* Leave notice start and end datetime */}
            <td className={`${style_table_content}`} colSpan={2}>
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
        <td className={`${style_table_content} | hidden sm:table-cell`}>
          {getTextFromStatus_Table(leaveNotice, t)}
        </td>
        {/* Buttons */}
        <td className={style_table_content}>
          <div className="flex gap-x-2">
            {/* View info button */}
            <Admin_leaveNotice_modal
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

export default Admin_leaveNotice_table_row;
