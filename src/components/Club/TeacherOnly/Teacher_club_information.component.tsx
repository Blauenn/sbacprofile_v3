import i18n from "i18next";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import {
  ClubJoinRequest,
  ClubMembership,
} from "../../../interfaces/common.interface";
import {
  get_student_image_from_ID,
  get_student_major_from_ID,
  get_student_name_from_ID,
  get_student_name_thai_from_ID,
  get_teacher_image_from_ID,
  get_teacher_major_from_ID,
  get_teacher_name_from_ID,
  get_teacher_name_thai_from_ID,
} from "../../../functions/getFromID.function";
import { teacher_check } from "../../../functions/miscelleneous.function";
import {
  Major_Name,
  Major_Name_German,
  Major_Name_Korean,
  Major_Name_Thai,
  Major_To_Background_Color,
  Major_To_Text_Color,
} from "../../../constants/Majors.constant";
import { API_ENDPOINT, CDN_ENDPOINT } from "../../../constants/ENDPOINTS";
import { hover_transition } from "../../../constants/styles/transitions.style";

// Contexts //
import { useContext_Students } from "../../../context/Students.context";
import { useContext_Teachers } from "../../../context/Teachers.context";
import { useContext_Clubs } from "../../../context/Clubs.context";
import { useState } from "react";
import {
  handleClubJoinRequestUpdate,
  handleClubMembershipCreate,
} from "../../../functions/Clubs/Clubs.function";
import { getData } from "../../../functions/fetchFromAPI.function";

interface CurrentComponentProp {
  selfClubInformation: any;
  selfClubMembers: any;
}

const Teacher_club_information = (props: CurrentComponentProp) => {
  const { selfClubInformation, selfClubMembers } = props;

  const { clubJoinRequests } = useContext_Clubs();

  const { t } = useTranslation();

  const { students } = useContext_Students();
  const { teachers } = useContext_Teachers();
  const { clubMemberships, setClubMemberships, setClubJoinRequests } =
    useContext_Clubs();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  const selfClubJoinRequests = clubJoinRequests.filter(
    (clubJoinRequest: ClubJoinRequest) =>
      clubJoinRequest.club_join_request_club_ID ===
        selfClubInformation.club_ID &&
      clubJoinRequest.club_join_request_status === 1
  );

  const defineCurrentDate = () => {
    return dayjs().toISOString();
  };

  const fetchClubMemberships = async () => {
    if (clubMemberships.length === 0) {
      await getData(
        `${API_ENDPOINT}/api/v1/clubMembership/getAll`,
        (result: any) => {
          setClubMemberships(result);
        }
      );
    }
  };
  const fetchClubJoinRequests = async () => {
    const clubJoinRequest = [
      {
        club_join_request_ID: 1,
        club_join_request_status: 1,
        club_join_request_club_ID: 3,
        club_join_request_student_ID: 17903,
        club_join_request_create_datetime: "2023-11-01T06:36:49.000Z",
        club_join_request_status_change_datetime: "",
      },
      {
        club_join_request_ID: 2,
        club_join_request_status: 1,
        club_join_request_club_ID: 3,
        club_join_request_student_ID: 17898,
        club_join_request_create_datetime: "2023-11-01T06:36:49.000Z",
        club_join_request_status_change_datetime: "",
      },
    ];

    setClubJoinRequests(clubJoinRequest);
  };

  const setObjectAndSubmit = async (clubJoinRequest: any, status: number) => {
    setIsSubmitting(true);

    const currentDateString: string = defineCurrentDate();
    let clubJoinRequestSubmissionStatus: boolean | undefined = false;

    // If the student join request is approved. //
    if (status === 2) {
      // Update the club join request. //
      clubJoinRequestSubmissionStatus = await handleClubJoinRequestUpdate(
        clubJoinRequest.club_join_request_ID,
        status,
        currentDateString
      );

      if (clubJoinRequestSubmissionStatus) {
        // Create the club membership. //
        await handleClubMembershipCreate(
          clubJoinRequest.club_join_request_club_ID,
          clubJoinRequest.club_join_request_student_ID
        );
      }
    }
    // If the student join request is rejected. //
    else {
      clubJoinRequestSubmissionStatus = await handleClubJoinRequestUpdate(
        clubJoinRequest.club_join_request_ID,
        3,
        currentDateString
      );
    }

    if (clubJoinRequestSubmissionStatus) {
      fetchClubMemberships();
      fetchClubJoinRequests();
      setIsUpdateSuccess(true);
    } else {
      setIsUpdateSuccess(false);
    }

    setIsSubmitting(false);
  };

  const information_card_style =
    "col-span-5 bg-white shadow-sm rounded-xl p-4 w-full";
  const approve_request_button_style = `flex justify-center items-center group rounded-full w-[25px] h-[25px] ${hover_transition}`;
  const approve_request_button_text_style = `text-sm group-hover:text-white ${hover_transition}`;

  // const select_request_button_style = `flex justify-center items-center group rounded-md w-[25px] h-[25px] ${hover_transition}`;

  return (
    <div className="grid grid-cols-5 gap-4">
      {/* Club name */}
      <div className={`${information_card_style} md:col-span-3`}>
        <div className="flex flex-col">
          <h1 className="opacity-50">{t("Teacher_club_currentClub_title")}</h1>
          <h1
            className={`${
              Major_To_Text_Color[selfClubInformation.club_major]
            } text-2xl font-semibold mb-2`}>
            {selfClubInformation.club_name}
          </h1>
          <h1 className="opacity-50">
            {i18n.language === "th"
              ? Major_Name_Thai[selfClubInformation.club_major]
              : i18n.language === "ko"
              ? Major_Name_Korean[selfClubInformation.club_major]
              : i18n.language === "de"
              ? Major_Name_German[selfClubInformation.club_major]
              : Major_Name[selfClubInformation.club_major]}
          </h1>
        </div>
      </div>
      {/* Club teachers */}
      <div className={`${information_card_style} md:col-span-2`}>
        <div className="flex flex-col gap-4">
          <h1 className="opacity-50">{t("Teacher_club_teachers_title")}</h1>
          <div className="flex flex-col gap-2">
            {selfClubInformation.club_teacher.teachers.map((teacher: number) =>
              // Only show the teacher that exists. //
              teacher_check(teacher, teachers) ? (
                <div key={teacher} className="flex flex-row items-center gap-4">
                  <img
                    src={`${CDN_ENDPOINT}${get_teacher_image_from_ID(
                      teacher,
                      teachers
                    )}`}
                    className={`${
                      Major_To_Background_Color[
                        get_teacher_major_from_ID(teacher, teachers)
                      ]
                    } w-[32px] h-[32px] rounded-full`}
                  />
                  <h1 className="line-clamp-1">
                    {i18n.language === "th"
                      ? get_teacher_name_thai_from_ID(teacher, teachers)
                      : get_teacher_name_from_ID(teacher, teachers)}
                  </h1>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
      {/* Club members */}
      <div className={`${information_card_style} md:col-span-2`}>
        <div className="flex flex-col gap-4">
          <h1 className="opacity-50">
            {t("Teacher_club_members_title", {
              members: selfClubMembers.length,
            })}
          </h1>
          <div className="flex flex-col gap-2">
            {selfClubMembers.map((clubMembership: ClubMembership) => (
              <div
                key={clubMembership.club_membership_ID}
                className="flex flex-row items-center gap-4">
                <img
                  src={`${CDN_ENDPOINT}${get_student_image_from_ID(
                    clubMembership.club_student,
                    students
                  )}`}
                  className={`${
                    Major_To_Background_Color[
                      get_student_major_from_ID(
                        clubMembership.club_student,
                        students
                      )
                    ]
                  } w-[32px] h-[32px] rounded-full`}
                />
                <h1 className="line-clamp-1">
                  {i18n.language === "th"
                    ? get_student_name_thai_from_ID(
                        clubMembership.club_student,
                        students
                      )
                    : get_student_name_from_ID(
                        clubMembership.club_student,
                        students
                      )}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Club join requests */}
      <div className={`${information_card_style} md:col-span-3`}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <h1 className="opacity-50">{t("Teacher_club_joinRequests_title")}</h1>
            {isUpdateSuccess ? (
              <h1>
                Updated
                <i className="fa-solid fa-circle-check ms-2 text-green-500"></i>
              </h1>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            {selfClubJoinRequests.map((clubJoinRequest: ClubJoinRequest) => (
              <div
                key={clubJoinRequest.club_join_request_ID}
                className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-4">
                  <img
                    src={`${CDN_ENDPOINT}${get_student_image_from_ID(
                      clubJoinRequest.club_join_request_student_ID,
                      students
                    )}`}
                    className={`${
                      Major_To_Background_Color[
                        get_student_major_from_ID(
                          clubJoinRequest.club_join_request_student_ID,
                          students
                        )
                      ]
                    } w-[32px] h-[32px] rounded-full`}
                  />
                  <h1 className="line-clamp-1">
                    {i18n.language === "th"
                      ? get_student_name_thai_from_ID(
                          clubJoinRequest.club_join_request_student_ID,
                          students
                        )
                      : get_student_name_from_ID(
                          clubJoinRequest.club_join_request_student_ID,
                          students
                        )}
                  </h1>
                </div>
                <div className="flex flex-row gap-4">
                  <div className="flex flex-row gap-2">
                    {/* Approve button */}
                    <div
                      onClick={() => {
                        setObjectAndSubmit(clubJoinRequest, 2);
                      }}
                      className={`${approve_request_button_style}  ${
                        isSubmitting
                          ? "bg-gray-500"
                          : "border border-green-500 hover:bg-green-500"
                      }`}>
                      <i
                        className={`${approve_request_button_text_style} fa-solid fa-check ${
                          isSubmitting ? "text-white" : "text-green-500"
                        }`}></i>
                    </div>
                    {/* Reject button */}
                    <div
                      onClick={() => {
                        setObjectAndSubmit(clubJoinRequest, 3);
                      }}
                      className={`${approve_request_button_style}  ${
                        isSubmitting
                          ? "bg-gray-500"
                          : "border border-red-500 hover:bg-red-500"
                      }`}>
                      <i
                        className={`${approve_request_button_text_style} fa-solid fa-xmark ${
                          isSubmitting ? "text-white" : "text-red-500"
                        }`}></i>
                    </div>
                  </div>
                  {/* Select button */}
                  {/* <div
                    className={`${select_request_button_style} border-blue-500 hover:bg-blue-500`}>
                    <i className="${approve_request_button_text_style} fa-solid fa-check text-blue-500"></i>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher_club_information;
