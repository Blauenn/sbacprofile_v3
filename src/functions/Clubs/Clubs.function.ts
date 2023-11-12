import dayjs from "dayjs";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";

export const handleClubJoinRequestCreate = async (
  club_ID: number,
  student_ID: number,
  currentDatetime: string
) => {
  const clubJoinRequestToCreate = {
    club_join_request_status: 1,
    club_join_request_club_ID: club_ID,
    club_join_request_student_ID: student_ID,
    club_join_request_create_datetime: currentDatetime,
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
  const currentDate = dayjs().toISOString();

  const clubJoinRequestToUpdate = {
    id: club_join_request_ID,
    clubJoinRequestInfo: {
      club_join_request_status: club_join_request_status,
      club_join_requst_status_change_datetime: currentDate,
    },
  };
  const clubJoinRequestToUpdateJSON = JSON.stringify(clubJoinRequestToUpdate);
  console.log(clubJoinRequestToUpdateJSON);

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
      `${API_ENDPOINT}/api/v1/clubJoinRequest/remove`,
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
