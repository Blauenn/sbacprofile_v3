import i18n from "i18next";
import { CDN_ENDPOINT } from "../../constants/ENDPOINTS";
import { Major_To_Background_Color } from "../../constants/Majors.constant";
import { useContext_Students } from "../../context/Students.context";
import {
  get_student_image_from_ID,
  get_student_major_from_ID,
  get_student_name_from_ID,
  get_student_name_thai_from_ID,
} from "../../functions/getFromID.function";
import { ClubMembership } from "../../interfaces/common.interface";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

interface CurrentComponentProp {
  selfClubMembers: any;
  title: string;
}

const Club_information_members = (props: CurrentComponentProp) => {
  const { selfClubMembers, title } = props;

  const { students, fetchStudents } = useContext_Students();

  const { t } = useTranslation();

  useEffect(() => {
    if (students.length === 0) {
      fetchStudents();
    }
  }, []);

  return selfClubMembers.length !== 0 ? (
    <div className="flex flex-col gap-4">
      <h1 className="opacity-50">{title}</h1>
      <div className="flex flex-col gap-2">
        {selfClubMembers.map((clubMembership: ClubMembership) => (
          <div
            key={clubMembership.club_membership_ID}
            className="flex flex-row items-center gap-4">
            <img
              src={`${CDN_ENDPOINT}${get_student_image_from_ID(
                clubMembership.club_membership_student_ID,
                students
              )}`}
              className={`${
                Major_To_Background_Color[
                  get_student_major_from_ID(
                    clubMembership.club_membership_student_ID,
                    students
                  )
                ]
              } w-[32px] h-[32px] rounded-full`}
            />
            <h1 className="line-clamp-1">
              {i18n.language === "th"
                ? get_student_name_thai_from_ID(
                    clubMembership.club_membership_student_ID,
                    students
                  )
                : get_student_name_from_ID(
                    clubMembership.club_membership_student_ID,
                    students
                  )}
            </h1>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-col">
      <h1 className="opacity-50">{t("Club_member_title")}</h1>
      <h1 className="text-2xl font-semibold">
        {t("Club_member_noMember_message")}
      </h1>
    </div>
  );
};

export default Club_information_members;
