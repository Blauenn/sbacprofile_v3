import { useState } from "react";
import i18n from "i18next";
import {
  LevelName,
  LevelNameGerman,
  LevelNameKorean,
  LevelNameThai,
} from "../../../../constants/Levels.constant";
import {
  MajorNameAbbreviation,
  MajorToBackgroundColor,
} from "../../../../constants/Majors.constant";
import { style_table_content } from "../../../../constants/styles/tables.style";
import {
  get_student_count_from_classroom,
  get_teacher_name_from_ID,
} from "../../../../functions/getFromID.function";
import {
  Classroom,
  Student,
  Teacher,
} from "../../../../interfaces/common.interface";
import Table_button from "../../../table/Table_button.component";
import { useTranslation } from "react-i18next";
import Admin_classroom_modal_update from "../modal/Admin_classroom_modal_update.component";

interface CurrentComponentProp {
  classroom: Classroom;
  index: number;
  students: Student[];
  teachers: Teacher[];
}

const Admin_classroom_table_row = (props: CurrentComponentProp) => {
  const { classroom, index, students, teachers } = props;

  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);
  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <tr className={index % 2 === 1 ? "bg-gray-200" : ""}>
        {/* Classroom */}
        <td className={`${style_table_content}`}>
          {i18n.language === "th"
            ? `${LevelNameThai[classroom.classroom_level]}/${
                classroom.classroom_class
              }`
            : i18n.language === "ko"
            ? `${LevelNameKorean[classroom.classroom_level]}/${
                classroom.classroom_class
              }`
            : i18n.language === "de"
            ? `${LevelNameGerman[classroom.classroom_level]}/${
                classroom.classroom_class
              }`
            : `${LevelName[classroom.classroom_level]}/${
                classroom.classroom_class
              }`}
        </td>
        {/* Classroom major */}
        <td className={`${style_table_content} | hidden xl:table-cell`}>
          {MajorNameAbbreviation[classroom.classroom_major]}
        </td>
        {/* Classroom student count */}
        <td className={`${style_table_content} | hidden sm:table-cell`}>
          {get_student_count_from_classroom(
            classroom.classroom_level,
            classroom.classroom_class,
            students
          )}
        </td>
        {/* Classroom homeroom teacher */}
        {classroom.classroom_homeroom_teacher != 0 ? (
          <td className={`${style_table_content} | hidden xl:table-cell`}>
            {get_teacher_name_from_ID(
              classroom.classroom_homeroom_teacher,
              teachers
            )}
          </td>
        ) : (
          <td
            className={`${style_table_content} opacity-50 | hidden xl:table-cell`}>
            No teachers
          </td>
        )}
        <td className={style_table_content}>
          <div className="flex gap-x-2">
            <Admin_classroom_modal_update
              classroom={classroom}
              open={modalOpen}
              onModalClose={onModalClose}
            />
            <Table_button
              text={t("Admin_Classrooms_table_content_button_update_title")}
              color={MajorToBackgroundColor[classroom.classroom_major]}
              functionToRun={() => {
                setModalOpen(true);
              }}
            />
          </div>
        </td>
      </tr>
    </>
  );
};

export default Admin_classroom_table_row;
