import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Club,
  ClubManager,
  ClubMembership,
} from "../../../interfaces/common.interface";
import Club_information_members from "../Club_information_members.component";
import Club_clubName from "../Club_clubName.component";
import Club_clubJoinRequests from "../clubRequests/Club_clubJoinRequests.component";
import Club_information_teachers from "../Club_information_teachers.component";
import Club_clubLeaveRequests from "../clubRequests/Club_clubLeaveRequests.component";

// Contexts //
import { useContext_Clubs } from "../../../context/Clubs.context";
import Teacher_club_noClub from "./Teacher_club_noClub.component";

interface CurrentComponentProp {
  selfClub: ClubManager;
}

const information_card_style =
  "col-span-5 bg-white shadow-sm rounded-xl p-4 w-full";

const Teacher_club_information = (props: CurrentComponentProp) => {
  const { selfClub } = props;

  const {
    clubs,
    fetchClubs,
    clubManagers,
    fetchClubManagers,
    clubMemberships,
    fetchClubMemberships,
  } = useContext_Clubs();

  const [selfClubInformation, setSelfClubInformation] = useState<Club>();
  const [selfClubMembers, setSelfClubMembers] = useState<ClubMembership[]>([]);
  const [selfClubTeachers, setSelfClubTeachers] = useState<ClubManager[]>([]);

  useEffect(() => {
    if (clubs.length === 0) {
      fetchClubs();
    }
    if (clubManagers.length === 0) {
      fetchClubManagers();
    }
    if (clubMemberships.length === 0) {
      fetchClubMemberships();
    }

    setSelfClubInformation(
      clubs.find((club: Club) => club.club_ID === selfClub.club_manager_club_ID)
    );
    setSelfClubMembers(
      clubMemberships.filter(
        (clubMembership: ClubMembership) =>
          clubMembership.club_membership_club_ID ===
          selfClub.club_manager_club_ID
      )
    );
    setSelfClubTeachers(
      clubManagers.filter(
        (clubManager: ClubManager) =>
          clubManager.club_manager_club_ID === selfClubInformation?.club_ID
      )
    );
  }, [clubs, clubMemberships, selfClubInformation]);

  const { t } = useTranslation();

  return selfClubInformation ? (
    <div className="grid grid-cols-5 gap-4">
      {/* Club name */}
      <div className={`${information_card_style} md:col-span-3`}>
        <Club_clubName selfClubInformation={selfClubInformation} />
      </div>
      {/* Club teachers */}
      <div className={`${information_card_style} md:col-span-2`}>
        <Club_information_teachers
          clubTeachers={selfClubTeachers}
          title={t("Teacher_club_teachers_title")}
        />
      </div>
      {/* Club members */}
      <div className={`${information_card_style} md:col-span-2`}>
        <Club_information_members
          selfClubMembers={selfClubMembers}
          title={t("Teacher_club_members_title", {
            members: selfClubMembers.length,
          })}
        />
      </div>
      {/* Club join requests */}
      <div className={`${information_card_style} md:col-span-3`}>
        <Club_clubJoinRequests selfClubInformation={selfClubInformation} />
      </div>
      {/* Club leave requests */}
      <div className={`${information_card_style} md:col-span-3`}>
        <Club_clubLeaveRequests selfClubInformation={selfClubInformation} />
      </div>
    </div>
  ) : (
    <Teacher_club_noClub />
  );
};

export default Teacher_club_information;
