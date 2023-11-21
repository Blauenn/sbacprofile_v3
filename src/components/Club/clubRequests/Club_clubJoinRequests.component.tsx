import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Club, ClubJoinRequest } from "../../../interfaces/common.interface";
import { handleClubMembershipCreate } from "../../../functions/Clubs/ClubsMemberships.function";
import { handleClubJoinRequestUpdate } from "../../../functions/Clubs/ClubJoinRequests.function";
import Club_student_interact_button from "./Club_student_interact_button.component";
import Club_studentInfo from "./Club_studentInfo.component";

// Contexts //
import { useContext_Students } from "../../../context/Students.context";
import { useContext_Clubs } from "../../../context/Clubs.context";

interface CurrentComponentProp {
  selfClubInformation: Club;
}

const Club_clubJoinRequests = (props: CurrentComponentProp) => {
  const { selfClubInformation } = props;

  const { students, fetchStudents } = useContext_Students();
  const {
    clubMemberships,
    fetchClubMemberships,
    clubJoinRequests,
    fetchClubJoinRequests,
  } = useContext_Clubs();

  const { t } = useTranslation();

  useEffect(() => {
    if (students.length === 0) {
      fetchStudents();
    }
    if (clubJoinRequests.length === 0) {
      fetchClubJoinRequests();
    }
  }, [clubMemberships]);

  const selfClubJoinRequests = clubJoinRequests.filter(
    (clubJoinRequest: ClubJoinRequest) =>
      clubJoinRequest.club_join_request_club_ID ===
        selfClubInformation.club_ID &&
      clubJoinRequest.club_join_request_status === 1
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  const setObjectAndSubmit = async (
    clubJoinRequest: ClubJoinRequest,
    status: number
  ) => {
    setIsSubmitting(true);

    let clubJoinRequestSubmissionStatus: boolean | undefined = false;

    // If the student join request is approved. //
    if (status === 2) {
      // Update the club join request. //
      clubJoinRequestSubmissionStatus = await handleClubJoinRequestUpdate(
        clubJoinRequest.club_join_request_ID,
        2
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
        3
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

  return (
    <>
      {selfClubJoinRequests.length !== 0 ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <h1 className="opacity-50">
              <i className="fa-solid fa-right-from-bracket me-2"></i>
              {t("Teacher_club_joinRequests_title")}
            </h1>
            {isUpdateSuccess ? (
              <h1>
                {t("Teacher_club_joinRequests_updated_message")}
                <i className="fa-solid fa-circle-check ms-2 text-green-500"></i>
              </h1>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            {selfClubJoinRequests.map((clubJoinRequest: ClubJoinRequest) => (
              <div
                key={clubJoinRequest.club_join_request_ID}
                className="flex flex-row justify-between items-center">
                <Club_studentInfo
                  student_ID={clubJoinRequest.club_join_request_student_ID}
                />
                <div className="flex flex-row gap-4">
                  <div className="flex flex-row gap-2">
                    {/* Approve button */}
                    <Club_student_interact_button
                      functionToRun={() => {
                        setObjectAndSubmit(clubJoinRequest, 2);
                      }}
                      isSubmitting={isSubmitting}
                      title={t("Teacher_club_requests_approve_button_title")}
                      icon="fa-solid fa-check"
                      color="border border-green-500 hover:bg-green-500"
                      textColor="text-green-500"
                    />
                    {/* Reject button */}
                    <Club_student_interact_button
                      functionToRun={() => {
                        setObjectAndSubmit(clubJoinRequest, 3);
                      }}
                      isSubmitting={isSubmitting}
                      title={t("Teacher_club_requests_reject_button_title")}
                      icon="fa-solid fa-xmark"
                      color="border border-red-500 hover:bg-red-500"
                      textColor="text-red-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <h1 className="opacity-50">{t("Teacher_club_joinRequests_title")}</h1>
          <h1 className="text-2xl font-semibold">
            {t("Teacher_club_noJoinRequest_message")}
          </h1>
        </div>
      )}
    </>
  );
};

export default Club_clubJoinRequests;
