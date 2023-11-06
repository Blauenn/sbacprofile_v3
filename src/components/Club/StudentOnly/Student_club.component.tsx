import { Club, ClubMembership } from "../../../interfaces/common.interface";
import Student_club_noClub from "./Student_club_noClub.component";
import Student_club_information from "./Student_club_information.component";

// Contexts //
import { useContext_Account } from "../../../context/Account.context";
import { useContext_Clubs } from "../../../context/Clubs.context";

const Student_club = () => {
  const { clubs, clubMemberships } = useContext_Clubs();
  const { userInfo } = useContext_Account();

  const selfClub = clubMemberships.find(
    (clubMembership: ClubMembership) =>
      clubMembership.club_student === userInfo.profile_ID
  );
  let selfClubInformation;
  let selfClubMembers;
  if (selfClub) {
    selfClubInformation = clubs.find(
      (club: Club) => club.club_ID === selfClub.club_ID
    );
    selfClubMembers = clubMemberships.filter(
      (clubMembership: ClubMembership) =>
        clubMembership.club_ID === selfClub.club_ID
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* If user is in a club. */}
      {selfClub && selfClubInformation ? (
        <Student_club_information
          selfClubInformation={selfClubInformation}
          selfClubMembers={selfClubMembers}
        />
      ) : (
        // If user has no club. //
        <Student_club_noClub />
      )}
    </div>
  );
};

export default Student_club;
