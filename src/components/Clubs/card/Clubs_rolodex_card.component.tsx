import { useEffect, useState } from "react";
import {
  Club,
  ClubManager,
  ClubMembership,
} from "../../../interfaces/common.interface";
import Clubs_rolodex_modal from "../modal/Clubs_rolodex_modal.component";
import Club_rolodex_avatar from "../Club_rolodex_avatar.component";
import {
  get_teacher_image_from_ID,
  get_teacher_major_from_ID,
} from "../../../functions/getFromID.function";
import { Major_To_Text_Color } from "../../../constants/Majors.constant";
import { hover_transition } from "../../../constants/styles/transitions.style";
import { CDN_ENDPOINT } from "../../../constants/ENDPOINTS";

// Contexts //
import { useContext_Clubs } from "../../../context/Clubs.context";
import { useContext_Teachers } from "../../../context/Teachers.context";

interface CurrentComponentProp {
  club: Club;
}

// TODO: FIX THE ERRORS IN THIS COMPONENT. //

const Clubs_rolodex_card = (props: CurrentComponentProp) => {
  const { club } = props;

  const {
    clubManagers,
    fetchClubManagers,
    clubMemberships,
    fetchClubMemberships,
  } = useContext_Clubs();
  const { teachers, fetchTeachers } = useContext_Teachers();

  const [currentClubTeachers, setCurrentClubTeachers] = useState<ClubManager[]>(
    []
  );
  const [currentClubMembers, setCurrentClubMembers] = useState<
    ClubMembership[]
  >([]);

  useEffect(() => {
    if (clubMemberships.length === 0) {
      fetchClubMemberships();
    }
    if (clubManagers.length === 0) {
      fetchClubManagers();
    }
    if (teachers.length === 0) {
      fetchTeachers();
    }

    if (clubMemberships.length !== 0) {
      const currentClubMemberships = clubMemberships.filter(
        (clubMembership: ClubMembership) =>
          clubMembership.club_membership_club_ID === club.club_ID
      );
      setCurrentClubMembers(currentClubMemberships);
    }

    if (clubManagers.length !== 0) {
      const currentClubManagers = clubManagers.filter(
        (clubManger: ClubManager) =>
          clubManger.club_manager_club_ID === club.club_ID
      );
      setCurrentClubTeachers(currentClubManagers);
    }
  }, [clubMemberships, clubManagers]);

  const [modalOpen, setModalOpen] = useState(false);
  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div
        className={`bg-white border rounded-xl overflow-hidden ${hover_transition} hover:bg-slate-200 cursor-pointer`}
        onClick={() => setModalOpen(true)}>
        {/* Club image */}
        {club.club_image !== "" &&
        club.club_image !== "/assets/profilePic/clubs/" ? (
          <img
            src={`${CDN_ENDPOINT}${club.club_image}`}
            className="h-[200px] w-full"
          />
        ) : null}
        <div className="flex flex-col gap-4 px-4 py-6">
          {/* Club name */}
          <h1
            className={`text-xl font-semibold ${
              Major_To_Text_Color[club.club_major]
            }`}>
            {club.club_name}
          </h1>
          <div className="flex flex-row gap-4">
            <div className="flex -space-x-4">
              {currentClubTeachers.map((clubManager: ClubManager) => (
                <Club_rolodex_avatar
                  key={clubManager.club_manager_ID}
                  imageURL={get_teacher_image_from_ID(
                    clubManager.club_manager_teacher_ID,
                    teachers
                  )}
                  profileMajor={get_teacher_major_from_ID(
                    clubManager.club_manager_teacher_ID,
                    teachers
                  )}
                />
              ))}
            </div>
            <div className="flex -space-x-4">
              {currentClubMembers.map((clubMembership: ClubMembership) => (
                <Club_rolodex_avatar
                  key={clubMembership.club_membership_ID}
                  imageURL={get_teacher_image_from_ID(
                    clubMembership.club_membership_student_ID,
                    teachers
                  )}
                  profileMajor={get_teacher_major_from_ID(
                    clubMembership.club_membership_student_ID,
                    teachers
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Clubs_rolodex_modal
        club={club}
        currentClubMembers={currentClubMembers}
        currentClubTeachers={currentClubTeachers}
        open={modalOpen}
        onModalClose={onModalClose}
      />
    </>
  );
};

export default Clubs_rolodex_card;
