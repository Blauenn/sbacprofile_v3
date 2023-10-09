import React from "react";
import { useTranslation } from "react-i18next";
import { LeaveNotice } from "../../../../interfaces/common.interface";
import { UserInfo } from "../../../../interfaces/account.interface";
import Student_leaveNotices_table_row from "./Student_leaveNotices_table_row.component";
import {
  table_content_style,
  table_header_style,
  table_parent_style,
} from "../../../../constants/styles/tables.style";

interface CurrentComponentProp {
  leaveNotices: LeaveNotice[];
  userInfo: UserInfo;
}

const Student_leaveNotices_table = (props: CurrentComponentProp) => {
  const { leaveNotices, userInfo } = props;

  const { t } = useTranslation();

  // Only get leave notices that has been made by the current user. //
  const selfLeaveNotices = leaveNotices.filter(
    (leaveNotice: LeaveNotice) =>
      leaveNotice.leave_notice_student_ID === userInfo.profile_ID
  );

  return (
    <table className={table_parent_style}>
      <thead>
        <tr>
          <th className={`${table_header_style} | hidden md:table-cell`}>
            {t("LeaveNotices_table_header_submitDate")}
          </th>
          <th className={`${table_header_style} | hidden md:table-cell`}>
            {t("LeaveNotices_table_header_type")}
          </th>
          <th className={`${table_header_style}`}>
            {t("LeaveNotices_table_header_startDate")}
          </th>
          <th className={`${table_header_style}`}>
            {t("LeaveNotices_table_header_endDate")}
          </th>
          <th className={`${table_header_style} | hidden sm:table-cell`}>
            {t("LeaveNotices_table_header_status")}
          </th>
          <th className={`${table_header_style}`}>
            <i className="fa-solid fa-pencil"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        {selfLeaveNotices.length > 0 ? (
          [...selfLeaveNotices]
            .reverse()
            .map((leaveNotice: LeaveNotice, index: number) => (
              <React.Fragment key={leaveNotice.leave_notice_ID}>
                <Student_leaveNotices_table_row
                  leaveNotice={leaveNotice}
                  index={index}
                />
              </React.Fragment>
            ))
        ) : (
          <tr>
            <td className={table_content_style}>
              {t("LeaveNotices_table_noLeaveNotices_message")}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Student_leaveNotices_table;
