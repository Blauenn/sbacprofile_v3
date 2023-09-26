import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Teacher } from "../../../../../interfaces/common.interface";
import Table_button from "../../../../table/Table_button.component";
import Admin_teacher_modal_update from "../modal/Admin_teacher_modal_update.component";
import { MajorToBackgroundColor } from "../../../../../constants/Majors.constant";
import { defaultImage } from "../../../../../constants/Misc.constant";
import { CDN_ENDPOINT } from "../../../../../constants/ENDPOINTS";
import { style_table_content } from "../../../../../constants/styles/tables.style";

interface CurrentComponentProp {
  teacher: Teacher;
  index: number;
}

const Admin_teacher_table_row = (props: CurrentComponentProp) => {
  const { teacher, index } = props;

  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);
  const onModalClose = () => {
    setModalOpen(false);
  };
  return (
    <>
      <tr className={index % 2 === 1 ? "bg-gray-200" : ""}>
        {/* Teacher ID */}
        <td
          className={`${style_table_content} font-family-monospace | hidden md:table-cell`}>
          {teacher.teacher_ID}
        </td>
        {/* Teacher image */}
        <td className={`${style_table_content} | hidden lg:table-cell`}>
          <div className="">
            <img
              loading="lazy"
              src={`${CDN_ENDPOINT}${teacher.teacher_image}`}
              className={`w-[50px] h-auto rounded-full ${
                MajorToBackgroundColor[teacher.teacher_major]
              }`}
              onError={(e) => {
                e.currentTarget.src = defaultImage;
              }}
            />
          </div>
        </td>
        {/* Small screens */}
        {/* Teacher English names */}
        <td className={`${style_table_content} table-cell px-2 sm:hidden`}>
          {teacher.teacher_first_name} {teacher.teacher_last_name}
        </td>
        {/* Larger screens */}
        {/* Teacher English names */}
        <td className={`${style_table_content} hidden sm:table-cell`}>
          {teacher.teacher_first_name}
        </td>
        <td className={`${style_table_content} hidden sm:table-cell`}>
          {teacher.teacher_last_name}
        </td>
        {/* Teacher Thai names */}
        <td className={`${style_table_content} hidden 2xl:table-cell`}>
          {teacher.teacher_first_name_thai}
        </td>
        <td className={`${style_table_content} hidden 2xl:table-cell`}>
          {teacher.teacher_last_name_thai}
        </td>
        <td className={style_table_content}>
          <div className="flex gap-x-2">
            <Admin_teacher_modal_update
              teacher={teacher}
              open={modalOpen}
              onModalClose={onModalClose}
            />
            <Table_button
              text={t("Admin_Teachers_table_content_button_update_title")}
              color={MajorToBackgroundColor[teacher.teacher_major]}
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

export default Admin_teacher_table_row;
