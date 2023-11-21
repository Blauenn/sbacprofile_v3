import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Club } from "../../../../interfaces/common.interface";
import {
  table_content_style,
  table_header_style,
  table_parent_style,
} from "../../../../constants/styles/tables.style";
import Clubs_table_row from "./Clubs_table_row.component";

interface CurrentComponentProp {
  clubs: Club[];
}

const Clubs_table = (props: CurrentComponentProp) => {
  const { clubs } = props;

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
          <th className={table_header_style}>{t("Clubs_table_header_name")}</th>
          <th className={`${table_header_style} | hidden md:table-cell`}>
            {t("Clubs_table_header_major")}
          </th>
          <th className={`${table_header_style} | hidden sm:table-cell`}>
            {t("Clubs_table_header_teachers")}
          </th>
          <th className={`${table_header_style} | hidden md:table-cell`}>
            {t("Clubs_table_header_capacity")}
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
              <Clubs_table_row club={club} index={index} />
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
                t("Clubs_table_noClubs_message")
              )}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Clubs_table;
