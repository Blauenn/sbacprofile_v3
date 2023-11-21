import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Teacher } from "../../../../../interfaces/common.interface";
import Admin_teachers_table_row from "./Admin_teachers_table_row.component";
import {
  table_content_style,
  table_header_style,
  table_parent_style,
} from "../../../../../constants/styles/tables.style";

interface CurrentComponentProp {
  filteredTeachers: Teacher[];
}

const Admin_teachers_table = (props: CurrentComponentProp) => {
  const { filteredTeachers } = props;

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const sortedTeachers = filteredTeachers.sort((a: Teacher, b: Teacher) => {
    if (a.teacher_major !== b.teacher_major) {
      return a.teacher_major - b.teacher_major;
    } else {
      return a.teacher_ID - b.teacher_ID;
    }
  });

  return (
    <table className={table_parent_style}>
      <thead>
        <tr>
          <th className={`${table_header_style} | hidden md:table-cell`}>
            {t("Admin_Teachers_table_header_studentID")}
          </th>
          <th className={`${table_header_style} | hidden lg:table-cell`}>
            {t("Admin_Teachers_table_header_image")}
          </th>
          <th className={`${table_content_style} table-cell sm:hidden`}>
            {t("Admin_Teachers_table_header_name")}
          </th>
          <th className={`${table_header_style} hidden sm:table-cell`}>
            {t("Admin_Teachers_table_header_firstName")}
          </th>
          <th className={`${table_header_style} hidden sm:table-cell`}>
            {t("Admin_Teachers_table_header_lastName")}
          </th>
          <th className={`${table_header_style} hidden 2xl:table-cell`}>
            {t("Admin_Teachers_table_header_firstNameThai")}
          </th>
          <th className={`${table_header_style} hidden 2xl:table-cell`}>
            {t("Admin_Teachers_table_header_lastNameThai")}
          </th>
          <th className={table_header_style}>
            <i className="fa-solid fa-pencil"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedTeachers.length > 0 ? (
          sortedTeachers.map((teacher: Teacher, index: number) => (
            <React.Fragment key={teacher.primary_teacher_ID}>
              <Admin_teachers_table_row teacher={teacher} index={index} />
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
              t("Admin_Teachers_table_noTeachers_message")
            )}
          </td>
        )}
      </tbody>
    </table>
  );
};

export default Admin_teachers_table;
