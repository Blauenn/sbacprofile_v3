import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Student } from "../../../../../interfaces/common.interface";
import Table_button from "../../../../table/Table_button.component";
import Admin_student_modal_update from "../modal/Admin_student_modal_update.component";
import { MajorToBackgroundColor } from "../../../../../constants/Majors.constant";
import { defaultImage } from "../../../../../constants/Misc.constant";
import { CDN_ENDPOINT } from "../../../../../constants/ENDPOINTS";
import { style_table_content } from "../../../../../constants/styles/tables.style";

interface CurrentComponentProp {
  student: Student;
  index: number;
}

const Admin_student_table_row = (props: CurrentComponentProp) => {
  const { student, index } = props;

  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);
  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <tr className={index % 2 === 1 ? "bg-gray-200" : ""}>
        {/* Student ID */}
        <td
          className={`${style_table_content} font-family-monospace | hidden md:table-cell`}>
          {student.student_ID}
        </td>
        {/* Student image */}
        <td className={`${style_table_content} | hidden lg:table-cell`}>
          <div className="">
            <img
              loading="lazy"
              src={`${CDN_ENDPOINT}${student.student_image}`}
              className="w-[50px] h-auto rounded-full"
              onError={(e) => {
                e.currentTarget.src = defaultImage;
              }}
            />
          </div>
        </td>
        {/* TODO: Add Thai name displays */}
        {/* Student English names */}
        {/* Small screens */}
        <td className={`${style_table_content} table-cell px-2 sm:hidden`}>
          {student.student_first_name} {student.student_last_name}
        </td>
        {/* Larger screens */}
        {/* Student English names */}
        <td className={`${style_table_content} hidden sm:table-cell`}>
          {student.student_first_name}
        </td>
        <td className={`${style_table_content} hidden sm:table-cell`}>
          {student.student_last_name}
        </td>
        {/* Student Thai names */}
        <td className={`${style_table_content} hidden 2xl:table-cell`}>
          {student.student_first_name_thai}
        </td>
        <td className={`${style_table_content} hidden 2xl:table-cell`}>
          {student.student_last_name_thai}
        </td>
        <td className={style_table_content}>
          <div className="flex gap-x-2">
            <Admin_student_modal_update
              open={modalOpen}
              onModalClose={onModalClose}
              student={student}
            />
            <Table_button
              text={t("Admin_Students_table_content_button_update_title")}
              color={MajorToBackgroundColor[student.student_major]}
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

export default Admin_student_table_row;
