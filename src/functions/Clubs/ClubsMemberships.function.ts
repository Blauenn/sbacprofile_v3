import { API_ENDPOINT } from "../../constants/ENDPOINTS";

export const handleClubMembershipCreate = async (
  club_ID: number,
  club_student_ID: number
) => {
  const clubMembershipToCreate = {
    club_membership_club_ID: club_ID,
    club_membership_student_ID: club_student_ID,
  };
  const clubMembershipToCreateJSON = JSON.stringify(clubMembershipToCreate);

  // Create the club membership //
  try {
    const response = await fetch(
      `${API_ENDPOINT}/api/v1/clubMembership/create`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: clubMembershipToCreateJSON,
      }
    );

    if (response.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const handleClubMembershipDelete = async (
  club_ID: number,
  club_student_ID: number
) => {
  const clubMembershipToDelete = {
    club_membership_club_ID: club_ID,
    club_membership_student_ID: club_student_ID,
  };
  const clubMembershipToDeleteJSON = JSON.stringify(clubMembershipToDelete);

  // Delete the club membership //
  try {
    const response = await fetch(
      `${API_ENDPOINT}/api/v1/clubMembership/delete`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: clubMembershipToDeleteJSON,
      }
    );

    if (response.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
