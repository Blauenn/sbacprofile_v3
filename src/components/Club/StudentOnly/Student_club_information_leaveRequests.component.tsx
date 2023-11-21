import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Club, ClubLeaveRequest } from "../../../interfaces/common.interface";
import Info_create_button from "../../Dashboard/Buttons/Info_create_button.component";
import Student_club_modal_leave from "./modal/Student_club_modal_leave.component";
import Student_club_information_requestStatus from "./Student_club_information_requestStatus.component";
import Student_club_modal_cancel_clubLeaveRequest from "./modal/Student_club_modal_cancel_clubLeaveRequest.component";

// Contexts //
import { useContext_Account } from "../../../context/Account.context";
import { useContext_Clubs } from "../../../context/Clubs.context";

interface CurrentComponentProp {
  selfClubInformation: Club;
}

const Student_club_information_leaveRequests = (
  props: CurrentComponentProp
) => {
  const { selfClubInformation } = props;

  const { userInfo } = useContext_Account();
  const { clubLeaveRequests, fetchClubLeaveRequests } = useContext_Clubs();

  const { t } = useTranslation();

  useEffect(() => {
    if (clubLeaveRequests.length === 0) {
      fetchClubLeaveRequests();
    }
  }, []);

  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const onLeaveModalClose = () => {
    setLeaveModalOpen(false);
  };

  const selfLeaveRequest: ClubLeaveRequest = clubLeaveRequests.find(
    (clubLeaveRequest: ClubLeaveRequest) =>
      clubLeaveRequest.club_leave_request_student_ID === userInfo.profile_ID &&
      clubLeaveRequest.club_leave_request_status === 1
  );

  return selfLeaveRequest ? (
    <div className="flex flex-col gap-2">
      {/* If there's a leave request */}
      <div>
        <h1 className="opacity-50">
          {t("Student_club_leaveRequestStatus_title")}
        </h1>
        <Student_club_information_requestStatus
          status={selfLeaveRequest.club_leave_request_status}
          create_datetime={selfLeaveRequest.club_leave_request_create_datetime}
        />
        {/* Cancel modal */}
        <Student_club_modal_cancel_clubLeaveRequest
          clubLeaveRequest={selfLeaveRequest}
          open={leaveModalOpen}
          onModalClose={onLeaveModalClose}
        />
        <Info_create_button
          text={t("Student_club_cancelLeaveRequest_button_title")}
          icon="fa-solid fa-right-from-bracket rotate-180"
          color="border-red-500 hover:bg-red-500 text-red-500"
          setModalOpen={() => {
            setLeaveModalOpen(true);
          }}
          fullWidth
        />
      </div>
    </div>
  ) : (
    <>
      {/* If there's no leave request */}
      <Student_club_modal_leave
        club={selfClubInformation}
        open={leaveModalOpen}
        onModalClose={onLeaveModalClose}
      />
      <Info_create_button
        text={t("Student_club_leaveRequest_button_title")}
        icon="fa-solid fa-right-from-bracket rotate-180"
        color="border-red-500 hover:bg-red-500 text-red-500"
        setModalOpen={() => {
          setLeaveModalOpen(true);
        }}
        fullWidth
      />
    </>
  );
};

export default Student_club_information_leaveRequests;
