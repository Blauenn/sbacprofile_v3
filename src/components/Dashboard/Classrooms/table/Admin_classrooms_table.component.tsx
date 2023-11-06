import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Classroom } from "../../../../interfaces/common.interface";
import Loading from "../../../misc/Loading.component";
import Admin_classrooms_table_row from "./Admin_classrooms_table_row.component";
import {
  table_content_style,
  table_header_style,
  table_parent_style,
} from "../../../../constants/styles/tables.style";

// Contexts //
import { useContext_Classrooms } from "../../../../context/Classrooms.context";
import { useContext_Students } from "../../../../context/Students.context";
import { useContext_Teachers } from "../../../../context/Teachers.context";

const Admin_classrooms_table = () => {
  const { classrooms } = useContext_Classrooms();
  const { students } = useContext_Students();
  const { teachers } = useContext_Teachers();
  
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  if (classrooms.length > 0) {
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
          {classrooms.map((classroom: Classroom, index: number) => (
            <React.Fragment key={classroom.classroom_ID}>
              <Admin_classrooms_table_row
                classroom={classroom}
                index={index}
                students={students}
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
          <table className={table_parent_style}>
            <thead>
              <tr>
                <th className={table_header_style}>
                  {t("Admin_Classrooms_table_header_class")}
                </th>
                <th className={`${table_header_style} | hidden sm:table-cell`}>
                  {t("Admin_Classrooms_table_header_major")}
                </th>
                <th className={table_header_style}>
                  {t("Admin_Classrooms_table_header_students")}
                </th>
                <th className={table_header_style}>
                  {t("Admin_Classrooms_table_header_teachers")}
                </th>
                <th className={table_header_style}>
                  <i className="fa-solid fa-pencil"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={table_content_style}>
                  {t("Admin_Classrooms_table_noClassrooms_message")}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </>
    );
  }
};

export default Admin_classrooms_table;
