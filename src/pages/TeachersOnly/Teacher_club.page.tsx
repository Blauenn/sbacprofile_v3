import { useEffect } from "react";
import { ClubManager } from "../../interfaces/common.interface";
import Teacher_club_information from "../../components/Club/TeacherOnly/Teacher_club_information.component";
import Teacher_club_noClub from "../../components/Club/TeacherOnly/Teacher_club_noClub.component";

// Contexts //
import { useContext_Account } from "../../context/Account.context";
import { useContext_Clubs } from "../../context/Clubs.context";

const Teacher_club = () => {
  const { userInfo } = useContext_Account();
  const {
    clubs,
    fetchClubs,
    clubMemberships,
    fetchClubMemberships,
    clubManagers,
    fetchClubManagers,
  } = useContext_Clubs();

  useEffect(() => {
    if (clubs.length === 0) {
      fetchClubs();
    }
    if (clubMemberships.length === 0) {
      fetchClubMemberships();
    }
    if (clubManagers.length === 0) {
      fetchClubManagers();
    }
  }, []);

  const selfClub = clubManagers.filter(
    (clubManager: ClubManager) =>
      clubManager.club_manager_teacher_ID === userInfo.profile_ID
  );

  return (
    <div className="flex flex-col gap-4">
      {/* If user maintains a club */}
      {selfClub ? (
        <div className="flex flex-col gap-16">
          {selfClub.map((selfClub: ClubManager) => (
            <Teacher_club_information
              key={selfClub.club_manager_ID}
              selfClub={selfClub}
            />
          ))}
        </div>
      ) : (
        // If the user doesn't maintain a club. //
        <Teacher_club_noClub />
      )}
    </div>
  );
};

export default Teacher_club;
