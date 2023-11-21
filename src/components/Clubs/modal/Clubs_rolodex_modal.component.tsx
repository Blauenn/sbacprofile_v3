import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../custom/Custom_Modal";
import {
  Club,
  ClubManager,
  ClubMembership,
} from "../../../interfaces/common.interface";
import { student_access_only } from "../../../functions/permissionChecks.function";
import Clubs_rolodex_modal_join from "./Clubs_rolodex_modal_join.component";
import Info_create_button from "../../Dashboard/Buttons/Info_create_button.component";
import Club_rolodex_avatar from "../Club_rolodex_avatar.component";
import {
  get_teacher_image_from_ID,
  get_teacher_major_from_ID,
} from "../../../functions/getFromID.function";
import {
  Major_To_Background_Color_Hover,
  Major_To_Border_Color,
  Major_To_Text_Color,
} from "../../../constants/Majors.constant";
import { CDN_ENDPOINT } from "../../../constants/ENDPOINTS";

// Contexts //
import { useContext_Account } from "../../../context/Account.context";
import { useContext_Students } from "../../../context/Students.context";
import { useContext_Teachers } from "../../../context/Teachers.context";

interface CurrentComponentProp {
  club: Club;
  currentClubTeachers: ClubManager[];
  currentClubMembers: ClubMembership[];
  open: boolean;
  onModalClose: () => void;
}

const Clubs_rolodex_modal = (props: CurrentComponentProp) => {
  const { club, currentClubMembers, currentClubTeachers, open, onModalClose } =
    props;

  const { userInfo } = useContext_Account();
  const { students, fetchStudents } = useContext_Students();
  const { teachers, fetchTeachers } = useContext_Teachers();

  const { t } = useTranslation();

  useEffect(() => {
    if (students.length === 0) {
      fetchStudents();
    }
    if (teachers.length === 0) {
      fetchTeachers();
    }
  }, []);

  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const onJoinModalClose = () => {
    setJoinModalOpen(false);
  };

  return (
    <Custom_Modal
      open={open}
      onModalClose={onModalClose}
      title={club.club_name}
      overflow>
      <div className="grid grid-cols-1 gap-8">
        {/* Club image */}
        <div className="flex justify-center w-full">
          {club.club_image !== "" &&
          club.club_image !== "/assets/profilePic/clubs/" ? (
            <img
              className="border border-standardBlack border-opacity-25 rounded-xl w-full sm:w-[500px] h-auto overflow-auto"
              src={`${CDN_ENDPOINT}${club.club_image}`}
            />
          ) : null}
        </div>
        {/* Club title and description */}
        <div className="flex flex-col gap-2">
          <h1
            className={`text-2xl font-semibold ${
              Major_To_Text_Color[club.club_major]
            }`}>
            {club.club_name}
          </h1>
          <h1 className="opacity-50">{club.club_description}</h1>
        </div>
        {/* Club teachers and students */}
        <div className="flex flex-col gap-4 border rounded-xl px-4 py-6">
          {/* Teachers */}
          <div className="flex flex-col gap-2">
            <h1 className="text-md font-semibold opacity-50">
              {t("Clubs_modal_teachers_title")}
            </h1>
            <div className="flex -space-x-4">
              {currentClubTeachers.map((clubManager: ClubManager) => (
                <Club_rolodex_avatar
                  key={clubManager.club_manager_ID}
                  imageURL={get_teacher_image_from_ID(
                    clubManager.club_manager_teacher_ID,
                    teachers
                  )}
                  profileMajor={get_teacher_major_from_ID(
                    clubManager.club_manager_teacher_ID,
                    teachers
                  )}
                />
              ))}
            </div>
          </div>
          {/* Students */}
          <div className="flex flex-col gap-2">
            <h1 className="text-md font-semibold opacity-50">
              {t("Clubs_modal_members_title")}
            </h1>
            <div className="flex -space-x-4">
              {currentClubMembers.map((clubMembership: ClubMembership) => (
                <Club_rolodex_avatar
                  key={clubMembership.club_membership_ID}
                  imageURL={get_teacher_image_from_ID(
                    clubMembership.club_membership_student_ID,
                    teachers
                  )}
                  profileMajor={get_teacher_major_from_ID(
                    clubMembership.club_membership_student_ID,
                    teachers
                  )}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Club join button */}
        {student_access_only(userInfo.profile_position) ? (
          <>
            <Clubs_rolodex_modal_join
              club={club}
              open={joinModalOpen}
              onModalClose={onJoinModalClose}
            />
            <Info_create_button
              text={t("Clubs_modal_joinClub_button_title")}
              icon="fa-solid fa-right-from-bracket"
              color={`${Major_To_Border_Color[club.club_major]} ${
                Major_To_Text_Color[club.club_major]
              } ${Major_To_Background_Color_Hover[club.club_major]}`}
              setModalOpen={() => {
                setJoinModalOpen(true);
              }}
              fullWidth
            />
          </>
        ) : null}
      </div>
    </Custom_Modal>
  );
};

export default Clubs_rolodex_modal;
