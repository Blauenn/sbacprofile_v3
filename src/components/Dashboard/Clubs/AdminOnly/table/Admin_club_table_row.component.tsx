import { useState } from "react";
import { style_table_content } from "../../../../../constants/styles/tables.style";
import {
  MajorNameAbbreviation,
  MajorToBackgroundColor,
} from "../../../../../constants/Majors.constant";
import {
  get_clubMember_count_from_ID,
  get_teacher_name_from_ID,
} from "../../../../../functions/getFromID.function";
import Table_button from "../../../../table/Table_button.component";
import {
  Club,
  ClubMembership,
  Teacher,
} from "../../../../../interfaces/common.interface";
import Admin_club_modal_update from "../modal/Admin_club_modal_update.component";

interface CurrentComponentProp {
  club: Club;
  index: number;
  clubMemberships: ClubMembership;
  teachers: Teacher;
}

const Admin_club_table_row = (props: CurrentComponentProp) => {
  const { club, index, clubMemberships, teachers } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <tr className={index % 2 === 1 ? "bg-gray-200" : ""}>
      {/* Club name */}
      <td className={style_table_content}>{club.club_name}</td>
      {/* Club major */}
      <td
        className={`${style_table_content} | hidden md:table-cell`}>
        {MajorNameAbbreviation[club.club_major]}
      </td>
      {/* Club teacher */}
      <td className={`${style_table_content}`}>
        {club.club_teacher.teachers[0] != 0 ? (
          club.club_teacher.teachers.map(
            (teacher: number, index: number, array: number[]) => (
              <h1 key={teacher}>
                {get_teacher_name_from_ID(teacher, teachers)}
                {index === array.length - 1 ? null : ", "}
              </h1>
            )
          )
        ) : (
          <h1 className="opacity-50">No teacher</h1>
        )}
      </td>
      {/* Club member count */}
      <td
        className={`${style_table_content} font-family-monospace | hidden md:table-cell`}>
        {get_clubMember_count_from_ID(club.club_ID, clubMemberships)}/
        {club.club_capacity}
      </td>
      {/* Buttons */}
      <td className={style_table_content}>
        <Admin_club_modal_update
          club={club}
          open={modalOpen}
          onModalClose={onModalClose}
        />
        <Table_button
          text="Edit"
          color={MajorToBackgroundColor[club.club_major]}
          functionToRun={() => {
            setModalOpen(true);
          }}
        />
      </td>
    </tr>
  );
};

export default Admin_club_table_row;
