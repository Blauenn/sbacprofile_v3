import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Announcement } from "../../../../../interfaces/common.interface";
import Loading from "../../../../misc/Loading.component";
import Admin_announcements_table_row from "./Admin_announcements_table_row.component";
import {
  table_content_style,
  table_header_style,
  table_parent_style,
} from "../../../../../constants/styles/tables.style";

interface CurrentComponentProp {
  announcements: any;
}

const Admin_announcements_table = (props: CurrentComponentProp) => {
  const { announcements } = props;

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (announcements?.length > 0) {
    return (
      <table className={table_parent_style}>
        <thead>
          <tr>
            <th className={`${table_header_style} | hidden sm:table-cell`}>
              {t("Admin_Announcements_table_header_status")}
            </th>
            <th className={`${table_header_style}`}>
              {t("Admin_Announcements_table_header_title")}
            </th>
            <th className={`${table_header_style} | hidden sm:table-cell`}>
              {t("Admin_Announcements_table_header_description")}
            </th>
            <th className={`${table_header_style} | hidden md:table-cell`}>
              <i className="fa-solid fa-clock"></i>
            </th>
            <th className={`${table_header_style}`}>
              <i className="fa-solid fa-pencil"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {announcements
            .reverse()
            .map((announcement: Announcement, index: number) => (
              <React.Fragment key={announcement.announcement_ID}>
                <Admin_announcements_table_row
                  announcement={announcement}
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
          <table className={table_parent_style}>
            <thead>
              <tr>
                <th className={`${table_header_style} | hidden sm:table-cell`}>
                  {t("Admin_Announcements_table_header_status")}
                </th>
                <th className={`${table_header_style}`}>
                  {t("Admin_Announcements_table_header_title")}
                </th>
                <th className={`${table_header_style} | hidden sm:table-cell`}>
                  {t("Admin_Announcements_table_header_description")}
                </th>
                <th className={`${table_header_style} | hidden md:table-cell`}>
                  <i className="fa-solid fa-clock"></i>
                </th>
                <th className={`${table_header_style}`}>
                  <i className="fa-solid fa-pencil"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={table_content_style}>
                  {t("Admin_Announcements_table_noAnnouncements_message")}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </>
    );
  }
};

export default Admin_announcements_table;