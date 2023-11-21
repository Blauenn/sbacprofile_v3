import { useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { Club, ClubManager } from "../../../../interfaces/common.interface";
import {
    get_clubMember_count_from_ID,
    get_teacher_name_from_ID,
    get_teacher_name_thai_from_ID,
} from "../../../../functions/getFromID.function";
import Table_button from "../../../table/Table_button.component";
import Clubs_modal_update from "../modal/Clubs_modal_update.component";
import Clubs_modal_delete from "../modal/Clubs_modal_delete.component";
import {
    Major_Name_Abbreviation,
    Major_To_Background_Color,
} from "../../../../constants/Majors.constant";
import { table_content_style } from "../../../../constants/styles/tables.style";

// Contexts //
import { useContext_Clubs } from "../../../../context/Clubs.context";
import { useContext_Teachers } from "../../../../context/Teachers.context";

interface CurrentComponentProp {
  club: Club;
  index: number;
}

const Clubs_table_row = (props: CurrentComponentProp) => {
  const { club, index } = props;

  const {
    clubMemberships,
    fetchClubMemberships,
    clubManagers,
    fetchClubManagers,
  } = useContext_Clubs();
  const { teachers, fetchTeachers } = useContext_Teachers();

  const { t } = useTranslation();

  useEffect(() => {
    if (clubMemberships.length === 0) {
      fetchClubMemberships();
    }
    if (clubManagers.length === 0) {
      fetchClubManagers();
    }
    if (teachers.length === 0) {
      fetchTeachers();
    }
  }, []);

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const onUpdateModalClose = () => {
    setUpdateModalOpen(false);
  };
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const onDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const club_member_count = get_clubMember_count_from_ID(
    club.club_ID,
    clubMemberships
  );

  const clubTeachers = clubManagers.filter(
    (clubManager: ClubManager) =>
      clubManager.club_manager_club_ID === club.club_ID
  );

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
        {clubTeachers.length !== 0 ? (
          clubTeachers.map(
            (clubManager: ClubManager, index: number, array: number[]) => (
              <h1 key={clubManager.club_manager_teacher_ID}>
                {i18n.language === "th"
                  ? get_teacher_name_thai_from_ID(
                      clubManager.club_manager_teacher_ID,
                      teachers
                    )
                  : get_teacher_name_from_ID(
                      clubManager.club_manager_teacher_ID,
                      teachers
                    )}
                {index === array.length - 1 ? null : ", "}
              </h1>
            )
          )
        ) : (
          <h1 className="opacity-50">
            {t("Clubs_table_content_teachers_noTeachers_message")}
          </h1>
        )}
      </td>
      {/* Club member count */}
      <td
        className={`${table_content_style} font-family-monospace | hidden md:table-cell`}>
        {club_member_count}/{club.club_capacity}
      </td>
      {/* Buttons */}
      <td className={table_content_style}>
        <div className="flex gap-x-2">
          {/* Update button */}
          <Clubs_modal_update
            club={club}
            open={updateModalOpen}
            onModalClose={onUpdateModalClose}
          />
          <Table_button
            icon="fa-solid fa-pencil"
            color={Major_To_Background_Color[club.club_major]}
            functionToRun={() => {
              setUpdateModalOpen(true);
            }}
          />
          {/* Delete button */}
          <Clubs_modal_delete
            club={club}
            club_member_count={club_member_count}
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

export default Clubs_table_row;
