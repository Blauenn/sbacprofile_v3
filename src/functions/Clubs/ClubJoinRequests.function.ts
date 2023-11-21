import { API_ENDPOINT } from "../../constants/ENDPOINTS";

export const handleClubJoinRequestCreate = async (
  club_ID: number,
  student_ID: number,
) => {
  const clubJoinRequestToCreate = {
    club_join_request_status: 1,
    club_join_request_club_ID: club_ID,
    club_join_request_student_ID: student_ID,
  };
  const clubJoinRequestToCreateJSON = JSON.stringify(clubJoinRequestToCreate);

  // Create the club join request //
  try {
    const response = await fetch(
      `${API_ENDPOINT}/api/v1/clubJoinRequest/create`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: clubJoinRequestToCreateJSON,
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

export const handleClubJoinRequestUpdate = async (
  club_join_request_ID: number,
  club_join_request_status: number
) => {
  const clubJoinRequestToUpdate = {
    id: club_join_request_ID,
    clubJoinRequestInfo: {
      club_join_request_status: club_join_request_status,
    },
  };
  const clubJoinRequestToUpdateJSON = JSON.stringify(clubJoinRequestToUpdate);

  try {
    const response = await fetch(
      `${API_ENDPOINT}/api/v1/clubJoinRequest/update`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: clubJoinRequestToUpdateJSON,
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

export const handleClubJoinRequestDelete = async (
  club_join_request_ID: number
) => {
  const clubJoinRequestToDelete = {
    id: club_join_request_ID,
  };
  const clubJoinRequestToDeleteJSON = JSON.stringify(clubJoinRequestToDelete);

  // Delete the club join request //
  try {
    const response = await fetch(
      `${API_ENDPOINT}/api/v1/clubJoinRequest/delete`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: clubJoinRequestToDeleteJSON,
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
