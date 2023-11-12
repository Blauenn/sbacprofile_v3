import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@mui/material";
import Custom_Modal from "../../custom/Custom_Modal";
import {
  ClubJoinRequest,
  ClubMembership,
} from "../../../interfaces/common.interface";
import {
  get_student_image_from_ID,
  get_student_major_from_ID,
  get_student_name_from_ID,
  get_teacher_image_from_ID,
  get_teacher_major_from_ID,
  get_teacher_name_from_ID,
} from "../../../functions/getFromID.function";
import { student_access_only } from "../../../functions/permissionChecks.function";
import Info_create_button from "../../Dashboard/Buttons/Info_create_button.component";
import Clubs_rolodex_modal_join from "./Clubs_rolodex_modal_join.component";
import {
  Major_To_Background_Color,
  Major_To_Background_Color_Hover,
  Major_To_Border_Color,
  Major_To_Text_Color,
} from "../../../constants/Majors.constant";
import { Default_Image } from "../../../constants/Misc.constant";
import { CDN_ENDPOINT } from "../../../constants/ENDPOINTS";

// Contexts //
import { useContext_Account } from "../../../context/Account.context";
import { useContext_Clubs } from "../../../context/Clubs.context";
import { useContext_Students } from "../../../context/Students.context";
import { useContext_Teachers } from "../../../context/Teachers.context";

interface CurrentComponentProp {
  club: any;
  open: boolean;
  onModalClose: any;
}

const Clubs_rolodex_modal = (props: CurrentComponentProp) => {
  const { club, open, onModalClose } = props;

  const { t } = useTranslation();

  const { userInfo } = useContext_Account();
  const {
    clubMemberships,
    fetchClubMemberships,
    clubJoinRequests,
    fetchClubJoinRequests,
  } = useContext_Clubs();
  const { students, fetchStudents } = useContext_Students();
  const { teachers, fetchTeachers } = useContext_Teachers();

  useEffect(() => {
    if (clubMemberships.length === 0) {
      fetchClubMemberships();
    }
    if (clubJoinRequests.length === 0) {
      fetchClubJoinRequests();
    }
    if (students.length === 0) {
      fetchStudents();
    }
    if (teachers.length === 0) {
      fetchTeachers();
    }
  }, []);

  let currentClub: ClubMembership[] = [];
  const clubMembers = () => {
    currentClub = clubMemberships.filter(
      (clubMembership: ClubMembership) =>
        clubMembership.club_membership_club_ID == club.club_ID
    );
    return currentClub.length !== 0;
  };

  const studentSelfClubCheck = () => {
    const clubMembershipCheck = clubMemberships.some(
      (clubMembership: ClubMembership) =>
        clubMembership.club_membership_student_ID === userInfo.profile_ID
    );

    // Student has a club membership. //
    if (clubMembershipCheck) {
      return true;
    }

    const clubJoinRequestCheck = clubJoinRequests.some(
      (clubJoinRequest: ClubJoinRequest) =>
        clubJoinRequest.club_join_request_student_ID === userInfo.profile_ID &&
        clubJoinRequest.club_join_request_status === 1
    );

    // Student has a club join request. //
    if (clubJoinRequestCheck) {
      return true;
    }

    // Student doesn't have a club membership or join request. //
    return false;
  };

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
        <div className="w-full flex justify-center">
          {club.club_image != "/assets/profilePic/clubs/" ? (
            <img
              className="border border-standardBlack border-opacity-25 rounded-xl w-full sm:w-[500px] h-auto overflow-auto"
              src={`${CDN_ENDPOINT}${club.club_image}`}
            />
          ) : null}
        </div>
        <div className="flex flex-col justify-start gap-4">
          <div className="flex flex-col gap-2">
            {/* Club name */}
            <h1
              className={`text-3xl font-bold mb-2 ${
                Major_To_Text_Color[club.club_major]
              }`}>
              {club.club_name}
            </h1>
            {/* Club description */}
            {club.club_description != "" ? (
              <p className="text-lg">{club.club_description}</p>
            ) : null}
          </div>
          {/* Club teachers */}
          <div>
            <h1 className="text-xl font-semibold mb-2">
              {t("Clubs_modal_teachers_title")}
            </h1>
            {club.club_teacher.teachers.length !== 0 ? (
              <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-4 gap-2">
                {club.club_teacher.teachers.map((teacher: number) => (
                  <div
                    key={teacher}
                    className="flex flex-row justify-between items-center gap-4 border border-standardBlack border-opacity-25 rounded-3xl px-2 py-1">
                    <div className="flex flex-row items-center gap-4">
                      <img
                        src={`${CDN_ENDPOINT}${get_teacher_image_from_ID(
                          teacher,
                          teachers
                        )}`}
                        className={`w-[40px] h-[40px] rounded-full ${
                          Major_To_Background_Color[
                            get_teacher_major_from_ID(teacher, teachers)
                          ]
                        }`}
                      />
                      <h1 className="font-semibold line-clamp-1">
                        {get_teacher_name_from_ID(teacher, teachers)}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h1 className="font-semibold opacity-50">
                {t("Clubs_modal_noTeachers_message")}
              </h1>
            )}
          </div>
          {/* Club members */}
          {clubMemberships ? (
            clubMembers() ? (
              <div className="mb-4">
                <h1 className="text-xl font-semibold mb-2">
                  {t("Clubs_modal_members_title")}{" "}
                  <h1 className="text-xl opacity-50 inline-block">
                    {`: ${currentClub.length}/${club.club_capacity}`}
                  </h1>
                </h1>
                <div className="flex flex-row -space-x-4">
                  {currentClub.map((clubMembership: ClubMembership) => (
                    <Tooltip
                      key={clubMembership.club_membership_ID}
                      title={get_student_name_from_ID(
                        clubMembership.club_membership_student_ID,
                        students
                      )}
                      placement="bottom"
                      arrow>
                      <div
                        className={`${
                          Major_To_Background_Color[
                            get_student_major_from_ID(
                              clubMembership.club_membership_student_ID,
                              students
                            )
                          ]
                        } w-[40px] h-[40px] rounded-full overflow-hidden`}>
                        <img
                          src={`${CDN_ENDPOINT}${get_student_image_from_ID(
                            clubMembership.club_membership_student_ID,
                            students
                          )}`}
                          className={`border-2 flex-shrink-0 ${
                            club
                              ? Major_To_Border_Color[
                                  get_student_major_from_ID(
                                    clubMembership.club_membership_student_ID,
                                    students
                                  )
                                ]
                              : "text-blue-500"
                          }`}
                          onError={(e) => {
                            e.currentTarget.src = Default_Image;
                          }}
                        />
                      </div>
                    </Tooltip>
                  ))}
                </div>
              </div>
            ) : (
              // If there's no student in this club. //
              <div className="mb-4">
                <h1 className="text-xl font-semibold mb-2">
                  {t("Clubs_modal_members_title")}
                </h1>
                <h1 className="font-semibold opacity-50">
                  {t("Clubs_modal_noMembers_message")}
                </h1>
              </div>
            )
          ) : null}
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
                color={
                  studentSelfClubCheck()
                    ? "border-gray-500 bg-gray-500 text-white"
                    : `${Major_To_Border_Color[club.club_major]} ${
                        Major_To_Text_Color[club.club_major]
                      } ${Major_To_Background_Color_Hover[club.club_major]}`
                }
                setModalOpen={() => {
                  setJoinModalOpen(true);
                }}
                disabled={studentSelfClubCheck()}
                fullWidth
              />
            </>
          ) : null}
        </div>
      </div>
    </Custom_Modal>
  );
};

export default Clubs_rolodex_modal;
