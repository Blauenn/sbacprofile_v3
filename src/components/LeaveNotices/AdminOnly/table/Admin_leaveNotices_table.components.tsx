import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LeaveNotice } from "../../../../interfaces/common.interface";
import Admin_leaveNotices_table_row from "./Admin_leaveNotices_table_row.component";
import {
  table_content_style,
  table_header_style,
  table_parent_style,
} from "../../../../constants/styles/tables.style";

// Contexts //
import { useContext_LeaveNotices } from "../../../../context/LeaveNotices.context";

const Admin_leaveNotices_table = () => {
  const { leaveNotices, fetchLeaveNotices } = useContext_LeaveNotices();

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (leaveNotices.length === 0) {
      fetchLeaveNotices();
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

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
            <i className="fa-solid fa-eye"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        {leaveNotices.length > 0 ? (
          [...leaveNotices]
            .reverse()
            .map((leaveNotice: LeaveNotice, index: number) => (
              <React.Fragment key={leaveNotice.leave_notice_ID}>
                <Admin_leaveNotices_table_row
                  leaveNotice={leaveNotice}
                  index={index}
                />
              </React.Fragment>
            ))
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

export default Admin_leaveNotices_table;
