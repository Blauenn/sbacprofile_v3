import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ClubMembership } from "../../interfaces/common.interface";
import { teacher_access_only } from "../../functions/permissionChecks.function";
import { handleClubMembershipDelete } from "../../functions/Clubs/ClubsMemberships.function";
import Club_student_interact_button from "./clubRequests/Club_student_interact_button.component";
import Club_studentInfo from "./clubRequests/Club_studentInfo.component";

// Contexts //
import { useContext_Account } from "../../context/Account.context";
import { useContext_Clubs } from "../../context/Clubs.context";
import { useContext_Students } from "../../context/Students.context";

interface CurrentComponentProp {
  selfClubMembers: ClubMembership[];
  title: string;
}

const Club_information_members = (props: CurrentComponentProp) => {
  const { selfClubMembers, title } = props;

  const { userInfo } = useContext_Account();
  const { fetchClubMemberships } = useContext_Clubs();
  const { students, fetchStudents } = useContext_Students();

  const { t } = useTranslation();

  useEffect(() => {
    if (students.length === 0) {
      fetchStudents();
    }
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  const setObjectAndSubmit = async (
    club_ID: number,
    club_student_ID: number
  ) => {
    setIsSubmitting(true);

    const submissionStatus = await handleClubMembershipDelete(
      club_ID,
      club_student_ID
    );

    if (submissionStatus) {
      fetchClubMemberships();
      setIsUpdateSuccess(true);
    } else {
      setIsUpdateSuccess(false);
    }
    setIsSubmitting(false);
  };

  return selfClubMembers.length !== 0 ? (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <h1 className="opacity-50">{title}</h1>
        {isUpdateSuccess ? (
          <h1>
            {t("Teacher_club_members_updated_message")}
            <i className="fa-solid fa-circle-check ms-2 text-green-500"></i>
          </h1>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        {selfClubMembers.map((clubMembership: ClubMembership) => (
          <div
            key={clubMembership.club_membership_ID}
            className="flex flex-row justify-between items-center">
            <Club_studentInfo
              student_ID={clubMembership.club_membership_student_ID}
            />
            {teacher_access_only(userInfo.profile_position) ? (
              <div className="flex flex-row gap-4">
                <div className="flex flex-row gap-2">
                  {/* Approve button */}
                  <Club_student_interact_button
                    functionToRun={() => {
                      setObjectAndSubmit(
                        clubMembership.club_membership_club_ID,
                        clubMembership.club_membership_student_ID
                      );
                    }}
                    isSubmitting={isSubmitting}
                    title={t("Teacher_club_requests_remove_button_title")}
                    icon="fa-solid fa-minus"
                    color="border border-red-500 hover:bg-red-500"
                    textColor="text-red-500"
                  />
                </div>
              </div>
            ) : null}
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
