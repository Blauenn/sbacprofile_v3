import { Club, ClubMembership } from "../../../interfaces/common.interface";
import Teacher_club_information from "./Teacher_club_information.component";

// Contexts //
import { useContext_Account } from "../../../context/Account.context";
import { useContext_Clubs } from "../../../context/Clubs.context";

const Teacher_club = () => {
  const { clubs, clubMemberships } = useContext_Clubs();
  const { userInfo } = useContext_Account();

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
        clubMembership.club_ID === selfClub.club_ID
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
        <h1>You have no club.</h1>
      )}
    </div>
  );
};

export default Teacher_club;
