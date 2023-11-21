import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Announcement } from "../../../../../interfaces/common.interface";
import Admin_announcements_table_row from "./Admin_announcements_table_row.component";
import {
  table_content_style,
  table_header_style,
  table_parent_style,
} from "../../../../../constants/styles/tables.style";

// Contexts //
import { useContext_Announcements } from "../../../../../context/Announcements.context";

const Admin_announcements_table = () => {
  const { announcements, fetchAnnouncements } = useContext_Announcements();

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (announcements.length === 0) {
      fetchAnnouncements();
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
        {announcements.length > 0 ? (
          [...announcements]
            .reverse()
            .map((announcement: Announcement, index: number) => (
              <React.Fragment key={announcement.announcement_ID}>
                <Admin_announcements_table_row
                  announcement={announcement}
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
              t("Admin_Announcements_table_noAnnouncements_message")
            )}
          </td>
        )}
      </tbody>
    </table>
  );
};

export default Admin_announcements_table;
