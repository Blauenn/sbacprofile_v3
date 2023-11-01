import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Student } from "../../../../../interfaces/common.interface";
import Loading from "../../../../misc/Loading.component";
import Admin_students_table_row from "./Admin_students_table_row.component";
import {
  table_content_style,
  table_header_style,
  table_parent_style,
} from "../../../../../constants/styles/tables.style";

interface CurrentComponentProp {
  filteredStudents: any;
}

const Admin_students_table = (props: CurrentComponentProp) => {
  const { filteredStudents } = props;

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const sortedStudents = filteredStudents.sort((a: any, b: any) => {
    if (a.student_major !== b.student_major) {
      return a.student_major - b.student_major; // Sort by major //
    } else if (a.student_level !== b.student_level) {
      return a.student_level - b.student_level; // Sort by level //
    } else if (a.student_class !== b.student_class) {
      return a.student_class.localeCompare(b.student_class); // Sort by class //
    } else {
      return a.student_ID - b.student_ID; // Sort by ID //
    }
  });

  if (sortedStudents?.length > 0) {
    const sortedStudentsByMajor: { [major: string]: Student[] } = {};

    // Group by major //
    sortedStudents.forEach((student: Student) => {
      const { student_major } = student;
      if (!sortedStudentsByMajor[student_major]) {
        sortedStudentsByMajor[student_major] = [];
      }
      sortedStudentsByMajor[student_major].push(student);
    });

    return (
      <table className={table_parent_style}>
        <thead>
          <tr>
            <th className={`${table_header_style} | hidden md:table-cell`}>
              {t("Admin_Students_table_header_studentID")}
            </th>
            <th className={`${table_header_style} | hidden lg:table-cell`}>
              {t("Admin_Students_table_header_image")}
            </th>
            <th className={`${table_content_style} table-cell sm:hidden`}>
              {t("Admin_Students_table_header_name")}
            </th>
            <th className={`${table_header_style} | hidden sm:table-cell`}>
              {t("Admin_Students_table_header_firstName")}
            </th>
            <th className={`${table_header_style} | hidden sm:table-cell`}>
              {t("Admin_Students_table_header_lastName")}
            </th>
            <th className={`${table_header_style} | hidden 2xl:table-cell`}>
              {t("Admin_Students_table_header_firstNameThai")}
            </th>
            <th className={`${table_header_style} | hidden 2xl:table-cell`}>
              {t("Admin_Students_table_header_lastNameThai")}
            </th>
            <th className={table_header_style}>
              <i className="fa-solid fa-pencil"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map((student: Student, index: number) => (
            <React.Fragment key={student.primary_student_ID}>
              <Admin_students_table_row student={student} index={index} />
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
                  {t("Admin_Students_table_header_studentID")}
                </th>
                <th className={`${table_header_style} | hidden lg:table-cell`}>
                  {t("Admin_Students_table_header_image")}
                </th>
                <th className={`${table_content_style} table-cell sm:hidden`}>
                  {t("Admin_Students_table_header_name")}
                </th>
                <th className={`${table_header_style} hidden sm:table-cell`}>
                  {t("Admin_Students_table_header_firstName")}
                </th>
                <th className={`${table_header_style} hidden sm:table-cell`}>
                  {t("Admin_Students_table_header_lastName")}
                </th>
                <th className={`${table_header_style} hidden 2xl:table-cell`}>
                  {t("Admin_Students_table_header_firstNameThai")}
                </th>
                <th className={`${table_header_style} hidden 2xl:table-cell`}>
                  {t("Admin_Students_table_header_lastNameThai")}
                </th>
                <th className={table_header_style}>
                  <i className="fa-solid fa-pencil"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={table_content_style}>
                  {t("Admin_Students_table_noStudents_message")}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </>
    );
  }
};

export default Admin_students_table;
