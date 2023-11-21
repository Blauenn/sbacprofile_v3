import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "../../../misc/Loading.component";
import { Club, ClubJoinRequest } from "../../../../interfaces/common.interface";
import Info_create_button from "../../../Dashboard/Buttons/Info_create_button.component";
import Student_club_information_requestStatus from "../Student_club_information_requestStatus.component";
import Student_club_modal_cancel_clubJoinRequest from "../modal/Student_club_modal_cancel_clubJoinRequest.component";
import Student_club_noClub_requestedClub from "./Student_club_noClub_requestedClub.component";
import { hover_transition } from "../../../../constants/styles/transitions.style";

// Contexts //
import { useContext_Account } from "../../../../context/Account.context";
import { useContext_Clubs } from "../../../../context/Clubs.context";

const Student_club_noClub = () => {
  const { userInfo } = useContext_Account();
  const { clubs, fetchClubs, clubJoinRequests, fetchClubJoinRequests } =
    useContext_Clubs();

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (clubs.length === 0) {
      fetchClubs();
    }
    if (clubJoinRequests.length === 0) {
      fetchClubJoinRequests();
    }
    setIsLoading(false);
  }, []);

  const selfClubJoinRequest: ClubJoinRequest = clubJoinRequests.find(
    (clubJoinRequest: ClubJoinRequest) =>
      (clubJoinRequest.club_join_request_student_ID === userInfo.profile_ID &&
        clubJoinRequest.club_join_request_status === 1) ||
      clubJoinRequest.club_join_request_status === 3
  );
  let selfClubJoinRequestInformation;
  if (selfClubJoinRequest) {
    selfClubJoinRequestInformation = clubs.find(
      (club: Club) =>
        club.club_ID === selfClubJoinRequest.club_join_request_club_ID
    );
  }

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const onCancelModalClose = () => {
    setCancelModalOpen(false);
  };

  const information_card_style =
    "col-span-5 bg-white shadow-sm rounded-xl p-4 w-full";

  return (
    <div className="grid grid-cols-5 gap-4">
      {selfClubJoinRequest && selfClubJoinRequestInformation ? (
        <>
          <div className={`${information_card_style} md:col-span-3`}>
            <Student_club_noClub_requestedClub
              club_name={selfClubJoinRequestInformation.club_name}
              club_major={selfClubJoinRequestInformation.club_major}
            />
          </div>
          <div className={`${information_card_style} md:col-span-2`}>
            <div className="flex flex-col gap-2">
              <h1 className="opacity-50">
                {t("Student_club_requestStatus_title")}
              </h1>
              <Student_club_information_requestStatus
                status={selfClubJoinRequest.club_join_request_status}
                create_datetime={
                  selfClubJoinRequest.club_join_request_create_datetime
                }
              />
            </div>
            {/* Cancel modal */}
            <Student_club_modal_cancel_clubJoinRequest
              clubJoinRequest={selfClubJoinRequest}
              open={cancelModalOpen}
              onModalClose={onCancelModalClose}
            />
            <Info_create_button
              text={t("Student_club_cancelJoinRequest_button_title")}
              icon="fa-solid fa-right-from-bracket rotate-180"
              color="border-red-500 hover:bg-red-500 text-red-500"
              setModalOpen={() => {
                setCancelModalOpen(true);
              }}
              fullWidth
            />
            <h1 className="opacity-50 mt-2">
              {t("Student_club_cancelJoinRequest_message")}
            </h1>
          </div>
        </>
      ) : !isLoading ? (
        <>
          {/* No club */}
          <div className={`${information_card_style} md:col-span-2`}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div>
                  <h1 className="opacity-50">
                    {t("Student_club_currentClub_title")}
                  </h1>
                  <h1 className={`text-2xl font-semibold`}>
                    {t("Student_club_noClub_message")}
                  </h1>
                </div>
              </div>
              <div>
                <NavLink to="/clubs">
                  <button
                    type="button"
                    className={`border border-primary text-primary hover:bg-primary hover:text-white rounded-full px-4 py-2 w-full ${hover_transition}`}>
                    <i className="fa-solid fa-right-from-bracket me-2"></i>
                    {t("Student_club_joinClub_button_title")}
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="col-span-5">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Student_club_noClub;
