import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Student } from "../../../../../interfaces/common.interface";
import Head_students_table_row from "./Head_students_table_row.component";
import {
  table_content_style,
  table_header_style,
  table_parent_style,
} from "../../../../../constants/styles/tables.style";

// Contexts //
import { useContext_Account } from "../../../../../context/Account.context";
import { useContext_Students } from "../../../../../context/Students.context";

const Head_students_table = () => {
  const { userInfo } = useContext_Account();
  const { students, fetchStudents } = useContext_Students();

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (students.length === 0) {
      fetchStudents();
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  });

  const filteredStudents = students.filter((student: Student) => {
    return student.student_major === userInfo.profile_major;
  });

  useEffect(() => {}, []);

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
        {filteredStudents?.length > 0 ? (
          sortedStudents.map((student: Student, index: number) => (
            <React.Fragment key={student.primary_student_ID}>
              <Head_students_table_row student={student} index={index} />
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
              t("Admin_Students_table_noStudents_message")
            )}
          </td>
        )}
      </tbody>
    </table>
  );
};

export default Head_students_table;
