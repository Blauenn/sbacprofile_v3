import { useTranslation } from "react-i18next";
import {
  style_table_content,
  style_table_header,
  style_table_parent,
} from "../../../../constants/styles/tables.style";
import {
  Classroom,
  Major,
  Student,
  Teacher,
} from "../../../../interfaces/common.interface";
import Loading from "../../../misc/Loading.component";
import React, { useEffect, useState } from "react";
import Admin_classroom_table_row from "./Admin_classroom_table_row.component";

interface CurrentComponentProp {
  fetchClassrooms: any;
  classrooms: Classroom[];
  students: Student[];
  teachers: Teacher[];
  majors: Major[];
}

const Admin_classroom_table = (props: CurrentComponentProp) => {
  const { fetchClassrooms, classrooms, students, teachers, majors } = props;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const { t } = useTranslation();

  if (classrooms.length > 0) {
    return (
      <table className={style_table_parent}>
        <thead>
          <tr>
            <th className={style_table_header}>
              {t("Admin_Classrooms_table_header_class")}
            </th>
            <th className={`${style_table_header} | hidden xl:table-cell`}>
              {t("Admin_Classrooms_table_header_major")}
            </th>
            <th className={`${style_table_header} hidden sm:table-cell`}>
              {t("Admin_Classrooms_table_header_studentCount")}
            </th>
            <th className={`${style_table_header} hidden xl:table-cell`}>
              {t("Admin_Classrooms_table_header_teachers")}
            </th>
            <th className={style_table_header}>
              <i className="fa-solid fa-pencil"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {classrooms.map((classroom: Classroom, index: number) => (
            <React.Fragment key={classroom.classroom_ID}>
              <Admin_classroom_table_row classroom={classroom} index={index} students={students} teachers={teachers} />
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
                <th className={style_table_header}>
                  {t("Admin_Classrooms_table_header_class")}
                </th>
                <th className={`${style_table_header} | hidden sm:table-cell`}>
                  {t("Admin_Classrooms_table_header_major")}
                </th>
                <th className={style_table_header}>
                  {t("Admin_Classrooms_table_header_students")}
                </th>
                <th className={style_table_header}>
                  {t("Admin_Classrooms_table_header_teachers")}
                </th>
                <th className={style_table_header}>
                  <i className="fa-solid fa-pencil"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={style_table_content}>
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

export default Admin_classroom_table;
