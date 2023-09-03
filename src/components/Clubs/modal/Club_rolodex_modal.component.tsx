import { useState } from "react";
import { createPortal } from "react-dom";
import { Modal, Tooltip } from "@mui/material";
import {
  Club,
  ClubMembership,
  Student,
  Teacher,
} from "../../../interfaces/common.interface";
import { UserInfo } from "../../../interfaces/account.interface";
import { getData } from "../../../functions/fetchFromAPI.function";
import {
  get_student_image_from_ID,
  get_student_name_from_ID,
  get_teacher_image_from_ID,
  get_teacher_name_from_ID,
} from "../../../functions/getFromID.function";
import { studentAccessOnly } from "../../../functions/permissionChecks.function";
import ModalCloseButton from "../../misc/common/ModalCloseButton.component";
import {
  MajorName,
  MajorToBackgroundColor,
  MajorToBorderColor,
} from "../../../constants/Majors.constant";
import { defaultImage } from "../../../constants/Misc.constant";
import { API_ENDPOINT, CDN_ENDPOINT } from "../../../constants/ENDPOINTS";
import { style_modal_parent } from "../../../constants/styles/modal.style";

interface CurrentComponentProp {
  club: Club;
  clubMemberships: ClubMembership[];
  setClubMemberships: any;
  teachers: Teacher[];
  students: Student[];
  userInfo: UserInfo;
  open: boolean;
  onModalClose: any;
}

const Club_rolodex_modal = (props: CurrentComponentProp) => {
  const {
    club,
    clubMemberships,
    setClubMemberships,
    teachers,
    students,
    userInfo,
    open,
    onModalClose,
  } = props;

  const [isJoinSuccess, setIsJoinSuccess] = useState(false);

  const fetchClubMemberships = () => {
    getData(`${API_ENDPOINT}/api/v1/clubMembership/getAll`, (result: any) => {
      setClubMemberships(result);
    });
  };

  let currentClub: ClubMembership[] = [];
  const clubMembers = () => {
    currentClub = clubMemberships.filter(
      (clubMembership: ClubMembership) => clubMembership.club_ID == club.club_ID
    );
    return currentClub.length !== 0;
  };

  const selfClubCheck = () => {
    // Return true if the student already has a club. //
    return !!clubMemberships.find(
      (clubMembership: ClubMembership) =>
        clubMembership.club_student == userInfo.profile_ID
    );
  };

  const handleClubJoin = async (club_ID: number) => {
    const clubJoinObject = {
      club_ID: club_ID,
      club_student: userInfo.profile_ID,
    };
    const clubJoinJSON = JSON.stringify(clubJoinObject);

    // Fetch club membership before the student can join a club to check if they...
    // already has a club or not. //
    let newClubMemberships: ClubMembership[] = [];
    let existingClubMembership: ClubMembership | undefined;
    await getData(
      `${API_ENDPOINT}/api/v1/clubMembership/getAll`,
      (result: any) => {
        newClubMemberships = result;
      }
    );

    if (newClubMemberships) {
      existingClubMembership = newClubMemberships.find(
        (clubMembership: ClubMembership) =>
          clubMembership.club_student == userInfo.profile_ID
      );
    }

    // Join the club for the current user. //
    // If the current user doesn't have a club. //
    if (!existingClubMembership) {
      try {
        const response = await fetch(
          `${API_ENDPOINT}/api/v1/clubMembership/create`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: clubJoinJSON,
          }
        );

        if (response.status) {
          setIsJoinSuccess(true);
          console.log(isJoinSuccess);
          fetchClubMemberships();
        } else {
          setIsJoinSuccess(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("The user already has a club.");
    }
  };

  const modal = document.getElementById("modal");

  return modal
    ? createPortal(
        <div>
          <Modal
            open={open}
            onClose={onModalClose}
            className="flex justify-center items-center"
            sx={{ backdropFilter: "blur(2px)" }}>
            <div className={style_modal_parent}>
              <ModalCloseButton functionToRun={onModalClose} />
              <div className="flex flex-col py-8 px-4 w-full lg:gap-x-4">
                <div className="flex flex-col justify-center mt-8">
                  <div className="w-full flex justify-center">
                    {club.club_image !=
                    "/assets/profilePic/clubs/default.jpg" ? (
                      <div
                        className="w-[300px] h-[200px] sm:w-[400px] sm:h-[300px] bg-top bg-cover bg-no-repeat mb-8"
                        style={{
                          backgroundImage: `url(${CDN_ENDPOINT}${club.club_image})`,
                        }}></div>
                    ) : null}
                  </div>
                  <h1 className="text-3xl font-semibold mb-2">
                    {club.club_name}
                  </h1>
                  <h1 className="text-xl opacity-50 mb-4">
                    {MajorName[club.club_major]}
                  </h1>
                  {club.club_description != "" ? (
                    <p className="text-lg mb-8">{club.club_description}</p>
                  ) : (
                    <p className="text-lg opacity-50 mb-8">(No description)</p>
                  )}
                  <div className="mb-4">
                    <h1 className="text-xl font-semibold mb-2">Teachers</h1>
                    {club.club_teacher.teachers[0] != 0 ? (
                      <div className="mb-4">
                        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-4 gap-2">
                          {club.club_teacher.teachers.map((teacher: number) => (
                            <div
                              key={teacher}
                              className="flex flex-row items-center gap-2 border border-standardBlack border-opacity-25 rounded-xl px-2 py-1">
                              <img
                                src={`${CDN_ENDPOINT}${get_teacher_image_from_ID(
                                  teacher,
                                  teachers
                                )}`}
                                className="w-[40px] h-[40px] rounded-full"
                                onError={(e) => {
                                  e.currentTarget.src = defaultImage;
                                }}
                              />
                              <h1 className="text-md">
                                {get_teacher_name_from_ID(teacher, teachers)}
                              </h1>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <h1 className="text-xl mb-2">No teachers.</h1>
                    )}
                  </div>
                  {clubMemberships ? (
                    clubMembers() ? (
                      <div className="mb-4">
                        <h1 className="text-xl font-semibold mb-2">
                          Members{" "}
                          <small className="text-xl opacity-50 inline-block">
                            {`: ${currentClub.length}/${club.club_capacity}`}
                          </small>
                        </h1>
                        <div className="flex flex-row -space-x-4">
                          {currentClub.map((clubMembership: ClubMembership) => (
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
                                className={`w-[40px] h-[40px] rounded-full border-2 ${
                                  club
                                    ? MajorToBorderColor[club.club_major]
                                    : "text-blue-500"
                                }`}
                                onError={(e) => {
                                  e.currentTarget.src = defaultImage;
                                }}
                              />
                            </Tooltip>
                          ))}
                        </div>
                      </div>
                    ) : (
                      // If there's no student in this club. //
                      <div className="mb-4">
                        <h1 className="text-xl font-semibold mb-2">Members</h1>
                        <h1 className="text-xl mb-2">No members.</h1>
                      </div>
                    )
                  ) : null}
                  {userInfo && studentAccessOnly(userInfo.profile_position) ? (
                    !selfClubCheck() ? (
                      <div className="mt-4">
                        <button
                          onClick={() => handleClubJoin(club.club_ID)}
                          type="button"
                          className={`text-white ${
                            MajorToBackgroundColor[club.club_major]
                          } rounded-xl px-4 py-2`}>
                          Join club
                        </button>
                      </div>
                    ) : null
                  ) : null}
                </div>
              </div>
            </div>
          </Modal>
        </div>,
        modal
      )
    : null;
};

export default Club_rolodex_modal;