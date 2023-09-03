import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LeaveNotice } from "../../../../interfaces/common.interface";
import Admin_leaveNotice_table_row from "./Admin_leaveNotice_table_row.component";
import Loading from "../../../misc/Loading.component";
import {
  style_table_content,
  style_table_header,
  style_table_parent,
} from "../../../../constants/styles/tables.style";

interface CurrentComponentProp {
  leaveNotices: LeaveNotice[];
}

const Admin_leaveNotice_table = (props: CurrentComponentProp) => {
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
      <table className={style_table_parent}>
        <thead>
          <tr>
            <th className={`${style_table_header} | hidden lg:table-cell`}>
              {t("Admin_LeaveNotices_table_header_ID")}
            </th>
            <th className={`${style_table_header} | hidden xl:table-cell`}>
              {t("Admin_LeaveNotices_table_header_submitDate")}
            </th>
            <th className={`${style_table_header} | hidden md:table-cell`}>
              {t("Admin_LeaveNotices_table_header_type")}
            </th>
            <th className={style_table_header}>
              {t("Admin_LeaveNotices_table_header_startDate")}
            </th>
            <th className={style_table_header}>
              {t("Admin_LeaveNotices_table_header_endDate")}
            </th>
            <th className={style_table_header}>
              {t("Admin_LeaveNotices_table_header_status")}
            </th>
            <th className={style_table_header}>
              <i className="fa-solid fa-pencil"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {leaveNotices.map((leaveNotice: LeaveNotice, index: number) => (
            <React.Fragment key={leaveNotice.leave_notice_ID}>
              <Admin_leaveNotice_table_row
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
                <th className={`${style_table_header} | hidden lg:table-cell`}>
                  {t("Admin_LeaveNotices_table_header_ID")}
                </th>
                <th className={`${style_table_header} | hidden xl:table-cell`}>
                  {t("Admin_LeaveNotices_table_header_submitDate")}
                </th>
                <th className={`${style_table_header} | hidden md:table-cell`}>
                  {t("Admin_LeaveNotices_table_header_type")}
                </th>
                <th className={style_table_header}>
                  {t("Admin_LeaveNotices_table_header_startDate")}
                </th>
                <th className={style_table_header}>
                  {t("Admin_LeaveNotices_table_header_endDate")}
                </th>
                <th className={style_table_header}>
                  {t("Admin_LeaveNotices_table_header_status")}
                </th>
                <th className={style_table_header}>
                  <i className="fa-solid fa-pencil"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={style_table_content}>
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

export default Admin_leaveNotice_table;
