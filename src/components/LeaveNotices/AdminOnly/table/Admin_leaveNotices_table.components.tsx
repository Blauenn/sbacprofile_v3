import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LeaveNotice } from "../../../../interfaces/common.interface";
import Admin_leaveNotices_table_row from "./Admin_leaveNotices_table_row.component";
import Loading from "../../../misc/Loading.component";
import {
  table_content_style,
  table_header_style,
  table_parent_style,
} from "../../../../constants/styles/tables.style";

interface CurrentComponentProp {
  leaveNotices: LeaveNotice[];
}

const Admin_leaveNotices_table = (props: CurrentComponentProp) => {
  const { leaveNotices } = props;

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (leaveNotices.length > 0) {
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
          {leaveNotices.map((leaveNotice: LeaveNotice, index: number) => (
            <React.Fragment key={leaveNotice.leave_notice_ID}>
              <Admin_leaveNotices_table_row
                leaveNotice={leaveNotice}
                index={index}
              />
            </React.Fragment>
          ))}
        </tbody>
      </table>
    );
  } else {
    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <table className="border border-standardBlack border-opacity-25">
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
              <tr>
                <td className={table_content_style}>
                  {t("Admin_LeaveNotices_table_noLeaveNotices_message")}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </>
    );
  }
};

export default Admin_leaveNotices_table;
