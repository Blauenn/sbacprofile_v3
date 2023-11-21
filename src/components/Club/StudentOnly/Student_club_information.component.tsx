import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Club,
  ClubManager,
  ClubMembership,
} from "../../../interfaces/common.interface";
import Club_information_teachers from "../Club_information_teachers.component";
import Club_information_members from "../Club_information_members.component";
import Club_clubName from "../Club_clubName.component";
import Student_club_information_leaveRequests from "./Student_club_information_leaveRequests.component";

// Contexts //
import { useContext_Teachers } from "../../../context/Teachers.context";
import { useContext_Clubs } from "../../../context/Clubs.context";

interface CurrentComponentProp {
  selfClubInformation: Club;
  selfClubMembers: ClubMembership[];
}

const Student_club_information = (props: CurrentComponentProp) => {
  const { selfClubInformation, selfClubMembers } = props;

  const { t } = useTranslation();

  const { teachers, fetchTeachers } = useContext_Teachers();
  const { clubManagers, fetchClubManagers, clubMemberships } = useContext_Clubs();

  const [selfClubTeachers, setSelfClubTeachers] = useState<ClubManager[]>([]);

  useEffect(() => {
    if (teachers.length === 0) {
      fetchTeachers();
    }
    if (clubManagers.length === 0) {
      fetchClubManagers();
    }

    setSelfClubTeachers(
      clubManagers.filter(
        (clubManager: ClubManager) =>
          clubManager.club_manager_club_ID === selfClubInformation.club_ID
      )
    );
  }, [clubManagers, clubMemberships]);

  const information_card_style =
    "col-span-5 bg-white shadow-sm rounded-xl p-4 w-full";

  return (
    <div className="grid grid-cols-5 gap-4">
      {/* Club name */}
      <div className={`${information_card_style} md:col-span-3`}>
        <Club_clubName selfClubInformation={selfClubInformation} />
      </div>
      {/* Club teachers */}
      {selfClubTeachers.length > 0 ? (
        <div className={`${information_card_style} md:col-span-2`}>
          <Club_information_teachers
            clubTeachers={selfClubTeachers}
            title={t("Student_club_teachers_title")}
          />
        </div>
      ) : null}
      {/* Club members */}
      <div className={information_card_style}>
        <Club_information_members
          selfClubMembers={selfClubMembers}
          title={t("Student_club_members_title", {
            members: selfClubMembers.length,
          })}
        />
      </div>
      {/* Club leave request */}
      <div className={`${information_card_style} md:col-span-2`}>
        <Student_club_information_leaveRequests
          selfClubInformation={selfClubInformation}
        />
      </div>
    </div>
  );
};

export default Student_club_information;
