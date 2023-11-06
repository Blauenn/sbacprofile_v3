import { useState } from "react";
import { Tooltip } from "@mui/material";
import { ClubMembership } from "../../../interfaces/common.interface";
import {
  get_student_image_from_ID,
  get_student_major_from_ID,
  get_student_name_from_ID,
  get_teacher_image_from_ID,
  get_teacher_name_from_ID,
} from "../../../functions/getFromID.function";
import Club_rolodex_modal from "../modal/Club_rolodex_modal.component";
import { Default_Image } from "../../../constants/Misc.constant";
import { CDN_ENDPOINT } from "../../../constants/ENDPOINTS";
import {
  Major_To_Background_Color,
  Major_To_Border_Color,
  Major_To_Text_Color,
} from "../../../constants/Majors.constant";
import { hover_transition } from "../../../constants/styles/transitions.style";

// Contexts //
import { useContext_Teachers } from "../../../context/Teachers.context";
import { useContext_Students } from "../../../context/Students.context";

interface CurrentComponentProp {
  club: any;
  clubMemberships: any;
}

const Club_rolodex_card = (props: CurrentComponentProp) => {
  const { club, clubMemberships } = props;

  const { students } = useContext_Students();
  const { teachers } = useContext_Teachers();

  let currentClub: any = [];
  const clubMembers = () => {
    currentClub = clubMemberships.filter(
      (clubMembership: ClubMembership) => clubMembership.club_ID == club.club_ID
    );

    return currentClub.length !== 0;
  };

  // Modal states //
  const [modalOpen, setModalOpen] = useState(false);
  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div
        className={`h-full relative flex flex-col bg-white shadow-sm rounded-xl overflow-hidden | ${hover_transition} hover:bg-slate-200 cursor-pointer`}
        onClick={() => setModalOpen(true)}>
        {club.club_image != "/assets/profilePic/clubs/default.jpg" ? (
          <div
            className="w-full h-[200px] bg-top bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${CDN_ENDPOINT}${club.club_image})`,
            }}></div>
        ) : null}
        <div className="flex flex-col gap-4 p-4">
          <h1
            className={`text-2xl font-semibold ${
              Major_To_Text_Color[club.club_major]
            }`}>
            {club.club_name}
          </h1>
          {/* Members icons */}
          <div className="flex flex-row gap-2 sm:gap-[2px] overflow-x-hidden">
            {/* Teachers */}
            <div className="flex flex-row -space-x-4">
              {club.club_teacher.teachers.length !== 0
                ? club.club_teacher.teachers.map((teacher: number) => (
                    <Tooltip
                      key={teacher}
                      title={get_teacher_name_from_ID(teacher, teachers)}
                      placement="bottom"
                      arrow>
                      <div
                        className={`${
                          Major_To_Background_Color[club.club_major]
                        } w-[40px] h-[40px] rounded-full overflow-hidden`}>
                        <img
                          src={`${CDN_ENDPOINT}${get_teacher_image_from_ID(
                            teacher,
                            teachers
                          )}`}
                          className={`border-2 flex-shrink-0 ${
                            Major_To_Border_Color[club.club_major]
                          }`}
                        />
                      </div>
                    </Tooltip>
                  ))
                : null}
            </div>
            {/* Students */}
            {clubMemberships ? (
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-row -space-x-4">
                  {clubMembers()
                    ? currentClub.map((clubMembership: ClubMembership) => (
                        <Tooltip
                          key={clubMembership.club_membership_ID}
                          title={get_student_name_from_ID(
                            clubMembership.club_student,
                            students
                          )}
                          placement="bottom"
                          arrow>
                          <div
                            className={`${
                              Major_To_Background_Color[
                                get_student_major_from_ID(
                                  clubMembership.club_student,
                                  students
                                )
                              ]
                            } w-[40px] h-[40px] rounded-full overflow-hidden`}>
                            <img
                              src={`${CDN_ENDPOINT}${get_student_image_from_ID(
                                clubMembership.club_student,
                                students
                              )}`}
                              className={`border-2 flex-shrink-0 ${
                                club
                                  ? Major_To_Border_Color[
                                      get_student_major_from_ID(
                                        clubMembership.club_student,
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
                      ))
                    : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Club_rolodex_modal
        club={club}
        open={modalOpen}
        onModalClose={onModalClose}
      />
    </>
  );
};

export default Club_rolodex_card;
