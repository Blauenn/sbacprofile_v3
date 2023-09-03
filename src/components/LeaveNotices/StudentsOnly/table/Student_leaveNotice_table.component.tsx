import React from "react";
import { useTranslation } from "react-i18next";
import { LeaveNotice } from "../../../../interfaces/common.interface";
import { UserInfo } from "../../../../interfaces/account.interface";
import Student_leaveNotice_table_row from "./Student_leaveNotice_table_row.component";
import {
  style_table_content,
  style_table_header,
  style_table_parent,
} from "../../../../constants/styles/tables.style";

interface CurrentComponentProp {
  leaveNotices: LeaveNotice[];
  userInfo: UserInfo;
}

const Student_leaveNotice_table = (props: CurrentComponentProp) => {
  const { leaveNotices, userInfo } = props;

  const { t } = useTranslation();

  // Only get leave notices that has been made by the current user. //
  const selfLeaevNotices = leaveNotices.filter(
    (leaveNotice: LeaveNotice) =>
      leaveNotice.leave_notice_student_ID === userInfo.profile_ID
  );

  return (
    <table className={style_table_parent}>
      <thead>
        <tr>
          <th className={`${style_table_header} | hidden md:table-cell`}>
            {t("LeaveNotices_students_table_header_submitDate")}
          </th>
          <th className={`${style_table_header} | hidden md:table-cell`}>
            {t("LeaveNotices_students_table_header_type")}
          </th>
          <th className={`${style_table_header}`}>
            {t("LeaveNotices_students_table_header_startDate")}
          </th>
          <th className={`${style_table_header}`}>
            {t("LeaveNotices_students_table_header_endDate")}
          </th>
          <th className={`${style_table_header} | hidden sm:table-cell`}>
            {t("LeaveNotices_students_table_header_status")}
          </th>
          <th className={`${style_table_header}`}>
            <i className="fa-solid fa-pencil"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        {selfLeaevNotices.length > 0 ? (
          [...selfLeaevNotices]
            .reverse()
            .map((leaveNotice: LeaveNotice, index: number) => (
              <React.Fragment key={leaveNotice.leave_notice_ID}>
                <Student_leaveNotice_table_row
                  leaveNotice={leaveNotice}
                  index={index}
                />
              </React.Fragment>
            ))
        ) : (
          <tr>
            <td className={style_table_content}>
              {t("LeaveNotices_students_table_noLeaveNotices_message")}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Student_leaveNotice_table;
