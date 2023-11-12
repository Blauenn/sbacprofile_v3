import { Club, ClubMembership } from "../../../interfaces/common.interface";
import Teacher_club_information from "./Teacher_club_information.component";
import Teacher_club_noClub from "./Teacher_club_noClub.component";

// Contexts //
import { useContext_Account } from "../../../context/Account.context";
import { useContext_Clubs } from "../../../context/Clubs.context";
import { useEffect } from "react";

const Teacher_club = () => {
  const { userInfo } = useContext_Account();
  const { clubs, fetchClubs, clubMemberships, fetchClubMemberships } =
    useContext_Clubs();

  useEffect(() => {
    if (clubs.length === 0) {
      fetchClubs();
    }
    if (clubMemberships.length === 0) {
      fetchClubMemberships();
    }
  }, []);

  const selfClub = clubs.find((club: Club) =>
    club.club_teacher.teachers.includes(userInfo.profile_ID)
  );
  let selfClubInformation;
  let selfClubMembers;
  if (selfClub) {
    // For easier readability, there're now 2 variables with the same value. //
    selfClubInformation = selfClub;
    selfClubMembers = clubMemberships.filter(
      (clubMembership: ClubMembership) =>
        clubMembership.club_membership_club_ID === selfClub.club_ID
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* If user maintains a club */}
      {selfClub && selfClubInformation ? (
        <Teacher_club_information
          selfClubInformation={selfClubInformation}
          selfClubMembers={selfClubMembers}
        />
      ) : (
        // If the user doesn't maintain a club. //
        <Teacher_club_noClub />
      )}
    </div>
  );
};

export default Teacher_club;
