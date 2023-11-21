import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LeaveNotice } from "../../../../interfaces/common.interface";
import {
  table_content_style,
  table_header_style,
  table_parent_style,
} from "../../../../constants/styles/tables.style";
import LeaveNotices_table_row from "./LeaveNotices_table_row.component";

interface CurrentComponentProp {
  leaveNotices: LeaveNotice[];
}

const LeaveNotices_table = (props: CurrentComponentProp) => {
  const { leaveNotices } = props;

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <table className={table_parent_style}>
      <thead>
        <tr>
          <th className={`${table_header_style}`}>#</th>
          <th className={`${table_header_style} | hidden md:table-cell`}>
            {t("LeaveNotices_table_header_student")}
          </th>
          <th className={`${table_header_style} | hidden md:table-cell`}>
            {t("LeaveNotices_table_header_type")}
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
        {leaveNotices.length > 0 ? (
          leaveNotices.map((leaveNotice: LeaveNotice, index: number) => (
            <React.Fragment key={leaveNotice.leave_notice_ID}>
              <LeaveNotices_table_row
                leaveNotice={leaveNotice}
                index={leaveNotices.length - index}
              />
            </React.Fragment>
          ))
        ) : (
          <tr>
            <td className={table_content_style}>
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin me-2"></i>
                  {t("Loading_message")}
                </>
              ) : (
                t("LeaveNotices_table_noLeaveNotices_message")
              )}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default LeaveNotices_table;
