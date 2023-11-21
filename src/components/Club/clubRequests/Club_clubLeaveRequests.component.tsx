import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useContext_Students } from "../../../context/Students.context";
import { Club, ClubLeaveRequest } from "../../../interfaces/common.interface";
import { handleClubLeaveRequestUpdate } from "../../../functions/Clubs/ClubLeaveRequests.function";
import { handleClubMembershipDelete } from "../../../functions/Clubs/ClubsMemberships.function";
import Club_student_interact_button from "./Club_student_interact_button.component";
import Club_studentInfo from "./Club_studentInfo.component";

// Contexts //
import { useContext_Clubs } from "../../../context/Clubs.context";

interface CurrentComponentProp {
  selfClubInformation: Club;
}

const Club_clubLeaveRequests = (props: CurrentComponentProp) => {
  const { selfClubInformation } = props;

  const { students, fetchStudents } = useContext_Students();
  const { fetchClubMemberships, clubLeaveRequests, fetchClubLeaveRequests } =
    useContext_Clubs();

  const { t } = useTranslation();

  useEffect(() => {
    if (students.length === 0) {
      fetchStudents();
    }
    if (clubLeaveRequests.length === 0) {
      fetchClubLeaveRequests();
    }
  }, []);

  const selfClubLeaveRequests = clubLeaveRequests.filter(
    (clubLeaveRequest: ClubLeaveRequest) =>
      clubLeaveRequest.club_leave_request_club_ID ===
        selfClubInformation.club_ID &&
      clubLeaveRequest.club_leave_request_status === 1
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  const setObjectAndSubmit = async (
    clubLeaveRequest: ClubLeaveRequest,
    status: number
  ) => {
    setIsSubmitting(true);

    let clubLeaveRequestSubmissionStatus: boolean | undefined = false;

    // If the student leave request is approved. //
    if (status === 2) {
      // Update the club leave request. //
      clubLeaveRequestSubmissionStatus = await handleClubLeaveRequestUpdate(
        clubLeaveRequest.club_leave_request_ID,
        2
      );

      if (clubLeaveRequestSubmissionStatus) {
        // Remove the club membership. //
        await handleClubMembershipDelete(
          clubLeaveRequest.club_leave_request_club_ID,
          clubLeaveRequest.club_leave_request_student_ID
        );
      }
    }
    // If the student leave request is rejected. //
    else {
      clubLeaveRequestSubmissionStatus = await handleClubLeaveRequestUpdate(
        clubLeaveRequest.club_leave_request_ID,
        3
      );
    }

    if (clubLeaveRequestSubmissionStatus) {
      fetchClubMemberships();
      fetchClubLeaveRequests();
      setIsUpdateSuccess(true);
    } else {
      setIsUpdateSuccess(false);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      {selfClubLeaveRequests.length !== 0 ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <h1 className="opacity-50">
              <i className="fa-solid fa-right-from-bracket me-2"></i>
              {t("Teacher_club_leaveRequests_title")}
            </h1>
            {isUpdateSuccess ? (
              <h1>
                {t("Teacher_club_leaveRequests_updated_message")}
                <i className="fa-solid fa-circle-check ms-2 text-green-500"></i>
              </h1>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            {selfClubLeaveRequests.map((clubLeaveRequest: ClubLeaveRequest) => (
              <div
                key={clubLeaveRequest.club_leave_request_ID}
                className="flex flex-row justify-between items-center">
                <Club_studentInfo
                  student_ID={clubLeaveRequest.club_leave_request_student_ID}
                />
                <div className="flex flex-row gap-4">
                  <div className="flex flex-row gap-2">
                    {/* Delete button */}
                    <Club_student_interact_button
                      functionToRun={() => {
                        setObjectAndSubmit(clubLeaveRequest, 2);
                      }}
                      isSubmitting={isSubmitting}
                      title={t("Teacher_club_requests_remove_button_title")}
                      icon="fa-solid fa-minus"
                      color="border border-red-500 hover:bg-red-500"
                      textColor="text-red-500"
                    />
                    {/* Reject button */}
                    <Club_student_interact_button
                      functionToRun={() => {
                        setObjectAndSubmit(clubLeaveRequest, 3);
                      }}
                      isSubmitting={isSubmitting}
                      title={t("Teacher_club_requests_reject_button_title")}
                      icon="fa-solid fa-xmark"
                      color="border border-primary hover:bg-primary"
                      textColor="text-primary"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <h1 className="opacity-50">
            {t("Teacher_club_leaveRequests_title")}
          </h1>
          <h1 className="text-2xl font-semibold">
            {t("Teacher_club_noLeaveRequest_message")}
          </h1>
        </div>
      )}
    </>
  );
};

export default Club_clubLeaveRequests;
