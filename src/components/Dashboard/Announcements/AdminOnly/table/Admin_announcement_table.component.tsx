import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Announcement } from "../../../../../interfaces/common.interface";
import Loading from "../../../../misc/Loading.component";
import Admin_announcement_table_row from "./Admin_announcement_table_row.component";
import {
  style_table_content,
  style_table_header,
  style_table_parent,
} from "../../../../../constants/styles/tables.style";

interface CurrentComponentProp {
  announcements: Announcement[];
}

const Admin_announcement_table = (props: CurrentComponentProp) => {
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
      <table className={style_table_parent}>
        <thead>
          <tr>
            <th className={`${style_table_header} | hidden sm:table-cell`}>
              {t("Admin_Announcements_table_header_status")}
            </th>
            <th className={`${style_table_header}`}>
              {t("Admin_Announcements_table_header_title")}
            </th>
            <th className={`${style_table_header}`}>
              {t("Admin_Announcements_table_header_description")}
            </th>
            <th className={`${style_table_header} | hidden md:table-cell`}>
              <i className="fa-solid fa-clock"></i>
            </th>
            <th className={`${style_table_header}`}>
              <i className="fa-solid fa-pencil"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {announcements
            .reverse()
            .map((announcement: Announcement, index: number) => (
              <React.Fragment key={announcement.announcement_ID}>
                <Admin_announcement_table_row
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
          <table className={style_table_parent}>
            <thead>
              <tr>
                <th className={`${style_table_header} | hidden sm:table-cell`}>
                  {t("Admin_Announcements_table_header_status")}
                </th>
                <th className={`${style_table_header}`}>
                  {t("Admin_Announcements_table_header_title")}
                </th>
                <th className={`${style_table_header}`}>
                  {t("Admin_Announcements_table_header_description")}
                </th>
                <th className={`${style_table_header} | hidden md:table-cell`}>
                  <i className="fa-solid fa-clock"></i>
                </th>
                <th className={`${style_table_header}`}>
                  <i className="fa-solid fa-pencil"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={style_table_content}>
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

export default Admin_announcement_table;
