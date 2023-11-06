import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { ClubMembership } from "../../../interfaces/common.interface";
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
import { CDN_ENDPOINT } from "../../../constants/ENDPOINTS";

// Contexts //
import { useContext_Students } from "../../../context/Students.context";
import { useContext_Teachers } from "../../../context/Teachers.context";

interface CurrentComponentProp {
  selfClubInformation: any;
  selfClubMembers: any;
}

const Student_club_information = (props: CurrentComponentProp) => {
  const { selfClubInformation, selfClubMembers } = props;

  const { t } = useTranslation();

  const { students } = useContext_Students();
  const { teachers } = useContext_Teachers();

  const information_card_style =
    "col-span-5 bg-white shadow-sm rounded-xl p-4 w-full";

  return (
    <div className="grid grid-cols-5 gap-4">
      {/* Club name */}
      <div className={`${information_card_style} md:col-span-3`}>
        <div className="flex flex-col">
          <h1 className="opacity-50">{t("Student_club_currentClub_title")}</h1>
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
          <h1 className="opacity-50">{t("Student_club_teachers_title")}</h1>
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
      <div className={information_card_style}>
        <div className="flex flex-col gap-4">
          <h1 className="opacity-50">
            {t("Student_club_members_title", {
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
    </div>
  );
};

export default Student_club_information;
