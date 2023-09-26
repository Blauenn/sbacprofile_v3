import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserInfo } from "../../../../../interfaces/account.interface";
import { Club } from "../../../../../interfaces/common.interface";
import Loading from "../../../../misc/Loading.component";
import Admin_club_table_row from "./Admin_club_table_row.component";
import {
  style_table_content,
  style_table_header,
  style_table_parent,
} from "../../../../../constants/styles/tables.style";

interface CurrentComponentProp {
  fetchClubs: any;
  clubs: Club[];
  // TODO: Make this interface work. //
  clubMemberships: any;
  teachers: any;
  userInfo: UserInfo;
}

const Admin_club_table = (props: CurrentComponentProp) => {
  const { fetchClubs, clubs, clubMemberships, teachers, userInfo } = props;

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (clubs.length > 0) {
    return (
      <table className={style_table_parent}>
        <thead>
          <tr>
            <th className={style_table_header}>
              {t("Admin_Clubs_table_header_name")}
            </th>
            <th className={`${style_table_header} | hidden md:table-cell`}>
              {t("Admin_Clubs_table_header_major")}
            </th>
            <th className={`${style_table_header} | hidden sm:table-cell`}>
              {t("Admin_Clubs_table_header_teachers")}
            </th>
            <th className={`${style_table_header} | hidden md:table-cell`}>
              {t("Admin_Clubs_table_header_capacity")}
            </th>
            <th className={style_table_header}>
              <i className="fa-solid fa-pencil"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {clubs.map((club: Club, index: number) => (
            <React.Fragment key={club.club_ID}>
              <Admin_club_table_row
                club={club}
                index={index}
                clubMemberships={clubMemberships}
                teachers={teachers}
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
                <th className={style_table_header}>
                  {t("Admin_Clubs_table_header_name")}
                </th>
                <th className={`${style_table_header} | hidden md:table-cell`}>
                  {t("Admin_Clubs_table_header_major")}
                </th>
                <th className={style_table_header}>
                  {t("Admin_Clubs_table_header_teachers")}
                </th>
                <th className={`${style_table_header} | hidden md:table-cell`}>
                  {t("Admin_Clubs_table_header_capacity")}
                </th>
                <th className={style_table_header}>
                  <i className="fa-solid fa-pencil"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={style_table_content}>
                  {t("Admin_Clubs_table_noClubs_message")}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </>
    );
  }
};

export default Admin_club_table;
