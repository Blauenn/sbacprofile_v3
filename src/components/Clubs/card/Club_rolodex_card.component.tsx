import { useState } from "react";
import { Tooltip } from "@mui/material";
import {
  Club,
  ClubMembership,
  Student,
  Teacher,
} from "../../../interfaces/common.interface";
import { UserInfo } from "../../../interfaces/account.interface";
import {
  get_student_image_from_ID,
  get_student_name_from_ID,
  get_teacher_image_from_ID,
  get_teacher_name_from_ID,
} from "../../../functions/getFromID.function";
import Club_rolodex_modal from "../modal/Club_rolodex_modal.component";
import { defaultImage } from "../../../constants/Misc.constant";
import { CDN_ENDPOINT } from "../../../constants/ENDPOINTS";
import {
  MajorName,
  MajorToBackgroundColor,
  MajorToBorderColor,
} from "../../../constants/Majors.constant";

interface CurrentComponentProp {
  club: Club;
  clubMemberships: ClubMembership[];
  setClubMemberships: any;
  teachers: Teacher[];
  students: Student[];
  userInfo: UserInfo;
}

const Club_rolodex_card = (props: CurrentComponentProp) => {
  const {
    club,
    clubMemberships,
    setClubMemberships,
    teachers,
    students,
    userInfo,
  } = props;

  let currentClub: ClubMembership[] = [];
  const clubMembers = () => {
    currentClub = clubMemberships.filter(
      (clubMembership: ClubMembership) => clubMembership.club_ID == club.club_ID
    );

    return currentClub.length != 0;
  };

  // Modal states //
  const [modalOpen, setModalOpen] = useState(false);
  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div
        className={`h-full relative flex flex-col bg-opacity-5 border border-opacity-25 rounded-xl overflow-hidden | transition-all duration-150 ease-in-out hover:scale-101 ${
          MajorToBackgroundColor[club.club_major]
        } ${MajorToBorderColor[club.club_major]}`}
        onClick={() => setModalOpen(true)}>
        {club.club_image != "/assets/profilePic/clubs/default.jpg" ? (
          <div
            className="w-full h-[200px] bg-top bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${CDN_ENDPOINT}${club.club_image})`,
            }}></div>
        ) : null}
        <div className="px-4 py-4">
          <h1 className="text-2xl font-semibold">{club.club_name}</h1>
          <h1 className="text-lg opacity-50 mb-4">
            {MajorName[club.club_major]}
          </h1>
          {/* Members icons */}
          <div className="flex flex-row gap-2 sm:gap-[2px] overflow-x-hidden">
            {/* Teachers */}
            <div className="flex flex-row -space-x-4">
              {club.club_teacher.teachers[0] != 0
                ? club.club_teacher.teachers.map((teacher: number) => (
                    <Tooltip
                      key={teacher}
                      title={get_teacher_name_from_ID(teacher, teachers)}
                      placement="bottom"
                      arrow>
                      <img
                        src={`${CDN_ENDPOINT}${get_teacher_image_from_ID(
                          teacher,
                          teachers
                        )}`}
                        className={`w-[40px] h-[40px] rounded-full border-2 flex-shrink-0 ${
                          MajorToBorderColor[club.club_major]
                        }`}
                      />
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
                          <img
                            src={`${CDN_ENDPOINT}${get_student_image_from_ID(
                              clubMembership.club_student,
                              students
                            )}`}
                            className={`w-[40px] h-[40px] rounded-full border-2 flex-shrink-0 ${
                              club
                                ? MajorToBorderColor[club.club_major]
                                : "text-blue-500"
                            }`}
                            onError={(e) => {
                              e.currentTarget.src = defaultImage;
                            }}
                          />
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
        clubMemberships={clubMemberships}
        setClubMemberships={setClubMemberships}
        teachers={teachers}
        students={students}
        userInfo={userInfo}
        open={modalOpen}
        onModalClose={onModalClose}
      />
    </div>
  );
};

export default Club_rolodex_card;
