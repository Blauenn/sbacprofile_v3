import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Club } from "../../../../../interfaces/common.interface";
import Admin_club_table_row from "./Admin_clubs_table_row.component";
import {
  table_content_style,
  table_header_style,
  table_parent_style,
} from "../../../../../constants/styles/tables.style";

// Contexts //
import { useContext_Clubs } from "../../../../../context/Clubs.context";

const Admin_club_table = () => {
  const { clubs, fetchClubs } = useContext_Clubs();

  const { t } = useTranslation();

  useEffect(() => {
    if (clubs.length === 0) {
      fetchClubs();
    }
  }, []);

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
          <th className={table_header_style}>
            {t("Admin_Clubs_table_header_name")}
          </th>
          <th className={`${table_header_style} | hidden md:table-cell`}>
            {t("Admin_Clubs_table_header_major")}
          </th>
          <th className={`${table_header_style} | hidden sm:table-cell`}>
            {t("Admin_Clubs_table_header_teachers")}
          </th>
          <th className={`${table_header_style} | hidden md:table-cell`}>
            {t("Admin_Clubs_table_header_capacity")}
          </th>
          <th className={table_header_style}>
            <i className="fa-solid fa-pencil"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        {clubs.length > 0 ? (
          clubs.map((club: Club, index: number) => (
            <React.Fragment key={club.club_ID}>
              <Admin_club_table_row club={club} index={index} />
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
              t("Admin_Clubs_table_noClubs_message")
            )}
          </td>
        )}
      </tbody>
    </table>
  );
};

export default Admin_club_table;
