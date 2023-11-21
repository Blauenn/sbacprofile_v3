import { useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { Classroom } from "../../../../interfaces/common.interface";
import {
  get_student_count_from_classroom,
  get_teacher_name_from_ID,
} from "../../../../functions/getFromID.function";
import Table_button from "../../../table/Table_button.component";
import Admin_classroom_modal_update from "../modal/Admin_classrooms_modal_update.component";
import {
  Level_Name,
  Level_Name_German,
  Level_Name_Korean,
  Level_Name_Thai,
} from "../../../../constants/Levels.constant";
import {
  Major_Name_Abbreviation,
  Major_To_Background_Color,
} from "../../../../constants/Majors.constant";
import { table_content_style } from "../../../../constants/styles/tables.style";

// Contexts //
import { useContext_Students } from "../../../../context/Students.context";
import { useContext_Teachers } from "../../../../context/Teachers.context";

interface CurrentComponentProp {
  classroom: Classroom;
  index: number;
}

const Admin_classrooms_table_row = (props: CurrentComponentProp) => {
  const { classroom, index } = props;

  const { t } = useTranslation();

  const { students, fetchStudents } = useContext_Students();
  const { teachers, fetchTeachers } = useContext_Teachers();

  useEffect(() => {
    if (students.length === 0) {
      fetchStudents();
    }
    if (teachers.length === 0) {
      fetchTeachers();
    }
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <tr className={index % 2 === 1 ? "bg-gray-200" : ""}>
      {/* Classroom */}
      <td className={`${table_content_style}`}>
        {i18n.language === "th"
          ? `${Level_Name_Thai[classroom.classroom_level]}/${
              classroom.classroom_class
            }`
          : i18n.language === "ko"
          ? `${Level_Name_Korean[classroom.classroom_level]}/${
              classroom.classroom_class
            }`
          : i18n.language === "de"
          ? `${Level_Name_German[classroom.classroom_level]}/${
              classroom.classroom_class
            }`
          : `${Level_Name[classroom.classroom_level]}/${
              classroom.classroom_class
            }`}
      </td>
      {/* Classroom major */}
      <td className={`${table_content_style} | hidden xl:table-cell`}>
        {Major_Name_Abbreviation[classroom.classroom_major]}
      </td>
      {/* Classroom student count */}
      <td className={`${table_content_style} | hidden sm:table-cell`}>
        {get_student_count_from_classroom(
          classroom.classroom_level,
          classroom.classroom_class,
          students
        )}
      </td>
      {/* Classroom homeroom teacher */}
      {classroom.classroom_homeroom_teacher != 0 ? (
        <td className={`${table_content_style} | hidden xl:table-cell`}>
          {get_teacher_name_from_ID(
            classroom.classroom_homeroom_teacher,
            teachers
          )}
        </td>
      ) : (
        <td
          className={`${table_content_style} opacity-50 | hidden xl:table-cell`}>
          {t("Admin_Classrooms_table_content_noTeachers_message")}
        </td>
      )}
      <td className={table_content_style}>
        <div className="flex gap-x-2">
          {/* Update button */}
          <Admin_classroom_modal_update
            classroom={classroom}
            open={modalOpen}
            onModalClose={onModalClose}
          />
          <Table_button
            icon="fa-solid fa-pencil"
            color={Major_To_Background_Color[classroom.classroom_major]}
            functionToRun={() => {
              setModalOpen(true);
            }}
          />
        </div>
      </td>
    </tr>
  );
};

export default Admin_classrooms_table_row;
