import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Teacher } from "../../../../../interfaces/common.interface";
import Loading from "../../../../misc/Loading.component";
import {
  table_content_style,
  table_header_style,
  table_parent_style,
} from "../../../../../constants/styles/tables.style";
import Head_teacher_table_row from "./Head_teacher_table_row.component";

interface CurrentComponentProp {
  filteredTeachers: Teacher[];
}

const Head_teacher_table = (props: CurrentComponentProp) => {
  const { filteredTeachers } = props;

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const sortedTeachers = filteredTeachers.sort((a: any, b: any) => {
    if (a.teacher_major !== b.teacher_major) {
      return a.teacher_major - b.teacher_major;
    } else {
      return a.teacher_ID - b.teacher_ID;
    }
  });

  if (sortedTeachers?.length > 0) {
    const sortedTeachersByMajor: { [major: string]: Teacher[] } = {};

    // Group by major //
    sortedTeachers.forEach((teacher: Teacher) => {
      const { teacher_major } = teacher;
      if (!sortedTeachersByMajor[teacher_major]) {
        sortedTeachersByMajor[teacher_major] = [];
      }
      sortedTeachersByMajor[teacher_major].push(teacher);
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
          {sortedTeachers.map((teacher: Teacher, index: number) => (
            <React.Fragment key={teacher.primary_teacher_ID}>
              <Head_teacher_table_row teacher={teacher} index={index} />
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
              <tr>
                <td className={table_content_style}>
                  {t("Admin_Teachers_table_noTeachers_message")}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </>
    );
  }
};

export default Head_teacher_table;
