import { API_ENDPOINT } from "../../constants/ENDPOINTS";

export const handleClubLeaveRequestCreate = async (
  club_ID: number,
  student_ID: number,
) => {
  const clubLeaveRequestToCreate = {
    club_leave_request_status: 1,
    club_leave_request_club_ID: club_ID,
    club_leave_request_student_ID: student_ID,
  };
  const clubLeaveRequestToCreateJSON = JSON.stringify(clubLeaveRequestToCreate);

  // Create the club join request //
  try {
    const response = await fetch(
      `${API_ENDPOINT}/api/v1/clubLeaveRequest/create`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: clubLeaveRequestToCreateJSON,
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

export const handleClubLeaveRequestUpdate = async (
  club_leave_request_ID: number,
  club_leave_request_status: number
) => {
  const clubLeaveRequestToUpdate = {
    id: club_leave_request_ID,
    clubLeaveRequestInfo: {
      club_leave_request_status: club_leave_request_status,
    },
  };
  const clubLeaveRequestToUpdateJSON = JSON.stringify(clubLeaveRequestToUpdate);

  try {
    const response = await fetch(
      `${API_ENDPOINT}/api/v1/clubLeaveRequest/update`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: clubLeaveRequestToUpdateJSON,
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

export const handleClubLeaveRequestDelete = async (
  club_leave_request_ID: number
) => {
  const clubLeaveRequestToDelete = {
    id: club_leave_request_ID,
  };
  const clubLeaveRequestToDeleteJSON = JSON.stringify(clubLeaveRequestToDelete);

  // Delete the club join request //
  try {
    const response = await fetch(
      `${API_ENDPOINT}/api/v1/clubLeaveRequest/delete`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: clubLeaveRequestToDeleteJSON,
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
