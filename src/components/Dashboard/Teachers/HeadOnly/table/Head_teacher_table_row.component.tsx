import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Teacher } from "../../../../../interfaces/common.interface";
import Table_button from "../../../../table/Table_button.component";
import { Major_To_Background_Color } from "../../../../../constants/Majors.constant";
import { Default_Image } from "../../../../../constants/Misc.constant";
import { CDN_ENDPOINT } from "../../../../../constants/ENDPOINTS";
import { table_content_style } from "../../../../../constants/styles/tables.style";
import Head_teacher_modal_update from "../modal/Head_teacher_modal_update.component";

interface CurrentComponentProp {
  teacher: Teacher;
  index: number;
}

const Head_teacher_table_row = (props: CurrentComponentProp) => {
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
          className={`${table_content_style} font-family-monospace | hidden md:table-cell`}>
          {teacher.teacher_ID}
        </td>
        {/* Teacher image */}
        <td className={`${table_content_style} | hidden lg:table-cell`}>
          <div
            className={`flex justify-center items-center w-[50px] h-[50px] | ${
              Major_To_Background_Color[teacher.teacher_major]
            } rounded-full overflow-hidden`}>
            <img
              loading="lazy"
              src={`${CDN_ENDPOINT}${teacher.teacher_image}`}
              onError={(e) => {
                e.currentTarget.src = Default_Image;
              }}
            />
          </div>
        </td>
        {/* Small screens */}
        {/* Teacher English names */}
        <td className={`${table_content_style} table-cell px-2 sm:hidden`}>
          {teacher.teacher_first_name} {teacher.teacher_last_name}
        </td>
        {/* Larger screens */}
        {/* Teacher English names */}
        <td className={`${table_content_style} hidden sm:table-cell`}>
          {teacher.teacher_first_name}
        </td>
        <td className={`${table_content_style} hidden sm:table-cell`}>
          {teacher.teacher_last_name}
        </td>
        {/* Teacher Thai names */}
        <td className={`${table_content_style} hidden 2xl:table-cell`}>
          {teacher.teacher_first_name_thai}
        </td>
        <td className={`${table_content_style} hidden 2xl:table-cell`}>
          {teacher.teacher_last_name_thai}
        </td>
        <td className={table_content_style}>
          <div className="flex gap-x-2">
            <Head_teacher_modal_update
              teacher={teacher}
              open={modalOpen}
              onModalClose={onModalClose}
            />
            <Table_button
              text={t("Admin_Teachers_table_content_button_update_title")}
              color={Major_To_Background_Color[teacher.teacher_major]}
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

export default Head_teacher_table_row;
