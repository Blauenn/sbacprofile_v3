import { useState } from "react";
import { Student } from "../../../../../interfaces/common.interface";
import Table_button from "../../../../table/Table_button.component";
import Admin_student_modal_update from "../modal/Admin_students_modal_update.component";
import Admin_students_modal_delete from "../modal/Admin_students_modal_delete.component";
import { Major_To_Background_Color } from "../../../../../constants/Majors.constant";
import { Default_Image } from "../../../../../constants/Misc.constant";
import { CDN_ENDPOINT } from "../../../../../constants/ENDPOINTS";
import { table_content_style } from "../../../../../constants/styles/tables.style";

interface CurrentComponentProp {
  student: Student;
  index: number;
}

const Admin_students_table_row = (props: CurrentComponentProp) => {
  const { student, index } = props;

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const onUpdateModalClose = () => {
    setUpdateModalOpen(false);
  };
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const onDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  return (
    <tr className={index % 2 === 1 ? "bg-gray-200" : ""}>
      {/* Student ID */}
      <td
        className={`${table_content_style} font-family-monospace | hidden md:table-cell`}>
        {student.student_ID}
      </td>
      {/* Student image */}
      <td className={`${table_content_style} | hidden lg:table-cell`}>
        <div
          className={`flex justify-center items-center w-[50px] h-[50px] | ${
            Major_To_Background_Color[student.student_major]
          } rounded-full overflow-hidden`}>
          <img
            loading="lazy"
            src={`${CDN_ENDPOINT}${student.student_image}`}
            onError={(e) => {
              e.currentTarget.src = Default_Image;
            }}
          />
        </div>
      </td>
      {/* Student English names */}
      {/* Small screens */}
      <td className={`${table_content_style} table-cell px-2 sm:hidden`}>
        {student.student_first_name} {student.student_last_name}
      </td>
      {/* Larger screens */}
      {/* Student English names */}
      <td className={`${table_content_style} hidden sm:table-cell`}>
        {student.student_first_name}
      </td>
      <td className={`${table_content_style} hidden sm:table-cell`}>
        {student.student_last_name}
      </td>
      {/* Student Thai names */}
      <td className={`${table_content_style} hidden 2xl:table-cell`}>
        {student.student_first_name_thai}
      </td>
      <td className={`${table_content_style} hidden 2xl:table-cell`}>
        {student.student_last_name_thai}
      </td>
      <td className={table_content_style}>
        <div className="flex gap-x-2">
          {/* Update button */}
          <Admin_student_modal_update
            student={student}
            open={updateModalOpen}
            onModalClose={onUpdateModalClose}
          />
          <Table_button
            icon="fa-solid fa-pencil"
            color={Major_To_Background_Color[student.student_major]}
            functionToRun={() => {
              setUpdateModalOpen(true);
            }}
          />
          {/* Delete button */}
          <Admin_students_modal_delete
            student={student}
            open={deleteModalOpen}
            onModalClose={onDeleteModalClose}
          />
          <Table_button
            icon="fa-solid fa-trash-can"
            color="bg-red-500"
            functionToRun={() => {
              setDeleteModalOpen(true);
            }}
          />
        </div>
      </td>
    </tr>
  );
};

export default Admin_students_table_row;
