import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LeaveNotice } from "../../../../interfaces/common.interface";
import { get_student_major_from_ID } from "../../../../functions/getFromID.function";
import Head_leaveNotices_table_row from "./Head_leaveNotices_table_row.component";
import {
  table_content_style,
  table_header_style,
  table_parent_style,
} from "../../../../constants/styles/tables.style";

// Contexts //
import { useContext_Account } from "../../../../context/Account.context";
import { useContext_LeaveNotices } from "../../../../context/LeaveNotices.context";
import { useContext_Students } from "../../../../context/Students.context";

const Head_leaveNotices_table = () => {
  const { userInfo } = useContext_Account();
  const { leaveNotices, fetchLeaveNotices } = useContext_LeaveNotices();
  const { students, fetchStudents } = useContext_Students();

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (leaveNotices.length === 0) {
      fetchLeaveNotices();
    }
    if (students.length === 0) {
      fetchStudents();
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const filteredLeaveNotices = [...leaveNotices]
    .reverse()
    .filter((leaveNotice: LeaveNotice) => {
      return (
        get_student_major_from_ID(
          leaveNotice.leave_notice_student_ID,
          students
        ) === userInfo.profile_major
      );
    });

  return (
    <table className={table_parent_style}>
      <thead>
        <tr>
          <th className={`${table_header_style} | hidden lg:table-cell`}>
            {t("Admin_LeaveNotices_table_header_ID")}
          </th>
          <th className={`${table_header_style} | hidden xl:table-cell`}>
            {t("Admin_LeaveNotices_table_header_submitDate")}
          </th>
          <th className={`${table_header_style} | hidden md:table-cell`}>
            {t("Admin_LeaveNotices_table_header_type")}
          </th>
          <th className={table_header_style}>
            {t("Admin_LeaveNotices_table_header_startDate")}
          </th>
          <th className={table_header_style}>
            {t("Admin_LeaveNotices_table_header_endDate")}
          </th>
          <th className={`${table_header_style} | hidden sm:table-cell`}>
            {t("Admin_LeaveNotices_table_header_status")}
          </th>
          <th className={table_header_style}>
            <i className="fa-solid fa-pencil"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredLeaveNotices.length > 0 ? (
          filteredLeaveNotices.map(
            (leaveNotice: LeaveNotice, index: number) => (
              <React.Fragment key={leaveNotice.leave_notice_ID}>
                <Head_leaveNotices_table_row
                  leaveNotice={leaveNotice}
                  index={index}
                />
              </React.Fragment>
            )
          )
        ) : (
          <td className={table_content_style}>
            {isLoading ? (
              <>
                <i className="fa-solid fa-spinner animate-spin me-2"></i>
                {t("Loading_message")}
              </>
            ) : (
              t("Admin_LeaveNotices_table_noLeaveNotices_message")
            )}
          </td>
        )}
      </tbody>
    </table>
  );
};

export default Head_leaveNotices_table;
