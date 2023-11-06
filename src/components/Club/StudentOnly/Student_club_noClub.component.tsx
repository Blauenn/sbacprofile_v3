import { useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Club, ClubJoinRequest } from "../../../interfaces/common.interface";
import { change_to_date } from "../../../functions/getDates.function";
import Info_create_button from "../../Dashboard/Buttons/Info_create_button.component";
import Student_club_modal_cancel from "./modal/Student_club_modal_cancel.component";
import Loading from "../../misc/Loading.component";
import {
  Major_Name,
  Major_Name_German,
  Major_Name_Korean,
  Major_Name_Thai,
  Major_To_Text_Color,
} from "../../../constants/Majors.constant";
import { hover_transition } from "../../../constants/styles/transitions.style";

// Contexts //
import { useContext_Clubs } from "../../../context/Clubs.context";
import { useContext_Account } from "../../../context/Account.context";

const Student_club_noClub = () => {
  const { clubs, clubJoinRequests } = useContext_Clubs();
  const { userInfo } = useContext_Account();

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const selfClubJoinRequest = clubJoinRequests.find(
    (clubJoinRequest: ClubJoinRequest) =>
      clubJoinRequest.club_join_request_student_ID === userInfo.profile_ID &&
      clubJoinRequest.club_join_request_status === 1
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
          <div className={`${information_card_style}`}>
            <div className="flex flex-col gap-2">
              <div>
                <h1 className="opacity-50">
                  {t("Student_club_requestedClub_title")}
                </h1>
                <h1
                  className={`${
                    Major_To_Text_Color[
                      selfClubJoinRequestInformation.club_major
                    ]
                  } text-2xl font-semibold mb-2`}>
                  {selfClubJoinRequestInformation.club_name}
                </h1>
                <h1 className="opacity-50">
                  {i18n.language === "th"
                    ? Major_Name_Thai[selfClubJoinRequestInformation.club_major]
                    : i18n.language === "ko"
                    ? Major_Name_Korean[
                        selfClubJoinRequestInformation.club_major
                      ]
                    : i18n.language === "de"
                    ? Major_Name_German[
                        selfClubJoinRequestInformation.club_major
                      ]
                    : Major_Name[selfClubJoinRequestInformation.club_major]}
                </h1>
              </div>
            </div>
          </div>
          <div className={`${information_card_style}`}>
            <div className="flex flex-col gap-2">
              <div>
                <h1 className="opacity-50">
                  {t("Student_club_requestStatus_title")}
                </h1>
                <h1 className="text-xl font-semibold mb-2">
                  {t("Student_club_pendingApproval_message")}...
                </h1>
                <h1 className="opacity-50 mb-4">
                  {formatDistanceToNow(
                    change_to_date(
                      selfClubJoinRequest.club_join_request_create_datetime
                    ),
                    { addSuffix: true }
                  ).replace("about ", "")}
                </h1>
              </div>
            </div>
            {/* Cancel modal */}
            <Student_club_modal_cancel
              clubJoinRequest={selfClubJoinRequest}
              open={cancelModalOpen}
              onModalClose={onCancelModalClose}
            />
            <Info_create_button
              text={t("Student_club_cancelRequest_button_title")}
              icon="fa-solid fa-right-from-bracket rotate-180"
              color="border-red-500 hover:bg-red-500 text-red-500"
              setModalOpen={() => {
                setCancelModalOpen(true);
              }}
              fullWidth
            />
          </div>
        </>
      ) : !isLoading ? (
        <>
          {/* No club */}
          <div className={`${information_card_style}`}>
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
          </div>
          <div className="col-span-5 md:col-span-2">
            <NavLink to="/clubs">
              <button
                type="button"
                className={`border border-primary text-primary hover:bg-primary hover:text-white rounded-full px-4 py-2 w-full ${hover_transition}`}>
                <i className="fa-solid fa-right-from-bracket me-2"></i>
                {t("Student_club_joinClub_button_title")}
              </button>
            </NavLink>
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
