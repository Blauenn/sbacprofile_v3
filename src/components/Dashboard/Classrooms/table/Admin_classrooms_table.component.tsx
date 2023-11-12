import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Classroom } from "../../../../interfaces/common.interface";
import Admin_classrooms_table_row from "./Admin_classrooms_table_row.component";
import {
  table_content_style,
  table_header_style,
  table_parent_style,
} from "../../../../constants/styles/tables.style";

// Contexts //
import { useContext_Classrooms } from "../../../../context/Classrooms.context";

const Admin_classrooms_table = () => {
  const { classrooms, fetchClassrooms } = useContext_Classrooms();

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (classrooms.length === 0) {
      fetchClassrooms();
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
          <th className={table_header_style}>
            {t("Admin_Classrooms_table_header_class")}
          </th>
          <th className={`${table_header_style} | hidden xl:table-cell`}>
            {t("Admin_Classrooms_table_header_major")}
          </th>
          <th className={`${table_header_style} hidden sm:table-cell`}>
            {t("Admin_Classrooms_table_header_studentCount")}
          </th>
          <th className={`${table_header_style} hidden xl:table-cell`}>
            {t("Admin_Classrooms_table_header_teachers")}
          </th>
          <th className={table_header_style}>
            <i className="fa-solid fa-pencil"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        {classrooms.length > 0 ? (
          classrooms.map((classroom: Classroom, index: number) => (
            <React.Fragment key={classroom.classroom_ID}>
              <Admin_classrooms_table_row classroom={classroom} index={index} />
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
              t("Admin_Classrooms_table_noClassrooms_message")
            )}
          </td>
        )}
      </tbody>
    </table>
  );
};

export default Admin_classrooms_table;
