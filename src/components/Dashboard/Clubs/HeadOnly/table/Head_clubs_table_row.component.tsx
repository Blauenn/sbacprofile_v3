import { useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import {
  get_clubMember_count_from_ID,
  get_teacher_name_from_ID,
  get_teacher_name_thai_from_ID,
} from "../../../../../functions/getFromID.function";
import Table_button from "../../../../table/Table_button.component";
import Head_club_modal_update from "../modal/Head_clubs_modal_update.component";
import {
  Major_Name_Abbreviation,
  Major_To_Background_Color,
} from "../../../../../constants/Majors.constant";
import { table_content_style } from "../../../../../constants/styles/tables.style";

interface CurrentComponentProp {
  club: any;
  index: number;
  clubMemberships: any;
  teachers: any;
}

const Head_clubs_table_row = (props: CurrentComponentProp) => {
  const { club, index, clubMemberships, teachers } = props;

  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);
  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <tr className={index % 2 === 1 ? "bg-gray-200" : ""}>
      {/* Club name */}
      <td className={table_content_style}>{club.club_name}</td>
      {/* Club major */}
      <td className={`${table_content_style} | hidden md:table-cell`}>
        {Major_Name_Abbreviation[club.club_major]}
      </td>
      {/* Club teachers */}
      <td className={`${table_content_style} | hidden sm:table-cell`}>
        {club.club_teacher.teachers[0] != 0 ? (
          club.club_teacher.teachers.map(
            (teacher: number, index: number, array: number[]) => (
              <h1 key={teacher}>
                {i18n.language === "th"
                  ? get_teacher_name_thai_from_ID(teacher, teachers)
                  : get_teacher_name_from_ID(teacher, teachers)}
                {index === array.length - 1 ? null : ", "}
              </h1>
            )
          )
        ) : (
          <h1 className="opacity-50">
            {t("Admin_Clubs_table_content_teachers_noTeachers_message")}
          </h1>
        )}
      </td>
      {/* Club member count */}
      <td
        className={`${table_content_style} font-family-monospace | hidden md:table-cell`}>
        {get_clubMember_count_from_ID(club.club_ID, clubMemberships)}/
        {club.club_capacity}
      </td>
      {/* Buttons */}
      <td className={table_content_style}>
        <div className="flex gap-x-2">
          {/* Update button */}
          <Head_club_modal_update
            club={club}
            open={modalOpen}
            onModalClose={onModalClose}
          />
          <Table_button
            icon="fa-solid fa-pencil"
            color={Major_To_Background_Color[club.club_major]}
            functionToRun={() => {
              setModalOpen(true);
            }}
          />
        </div>
      </td>
    </tr>
  );
};

export default Head_clubs_table_row;