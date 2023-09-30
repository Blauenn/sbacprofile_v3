import { z } from "zod";
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

export const handleClubUpdate = async (
  clubToUpdate: any,
  setValidationErrors: any,
  setIsSubmitting: any,
  setIsUpdateSuccess: any,
  callback: any
) => {
  // Disable the submit button. //
  setIsSubmitting(true);

  const ClubSchema = z.object({
    club_ID: z.number(),
    club_name: z.string().nonempty(),
    club_major: z.number(),
    club_teacher: z.string(),
    club_status: z.number(),
    club_description: z.string(),
    club_image: z.string(),
    club_capacity: z.number(),
  });

  const validationErrors: any = {
    club_ID: "",
    club_name: "",
    club_major: "",
    club_teacher: "",
    club_status: "",
    club_description: "",
    club_image: "",
    club_capacity: "",
  };

  // Perform validation. //
  const validationResult = ClubSchema.safeParse(clubToUpdate);

  // If validation fails. //
  if (!validationResult.success) {
    validationResult.error.issues.forEach((issue: any) => {
      // Add custom error messages based on which validation fails. //
      switch (issue.path[0]) {
        case "club_ID":
          validationErrors.club_name = issue.message || "Club ID is invalid";
          break;
        case "club_name":
          validationErrors.club_name = issue.message || "Club name is invalid";
          break;
        case "club_major":
          validationErrors.club_name = issue.message || "Club major is invalid";
          break;
        case "club_teacher":
          validationErrors.club_name =
            issue.message || "Club teacher is invalid";
          break;
        case "club_status":
          validationErrors.club_name =
            issue.message || "Club status is invalid";
          break;
        case "club_description":
          validationErrors.club_name =
            issue.message || "Club description is invalid";
          break;
        case "club_image":
          validationErrors.club_name = issue.message || "Club image is invalid";
          break;
        case "club_capacity":
          validationErrors.club_name =
            issue.message || "Club capacity is invalid";
          break;
        default:
          break;
      }
    });
    setValidationErrors(validationErrors);
    setIsSubmitting(false);
    return;
  } else {
    setValidationErrors(validationErrors);
  }

  // If validation passes. //
  // Update the club. //
  const clubToUpdateObject = {
    id: clubToUpdate.club_ID,
    clubInfo: {
      club_name: clubToUpdate.club_name,
      club_major: clubToUpdate.club_major,
      club_teacher: clubToUpdate.club_teacher,
      club_description: clubToUpdate.club_description,
      club_status: clubToUpdate.club_status,
      club_capacity: clubToUpdate.club_capacity,
    },
  };
  const clubUpdateJSON = JSON.stringify(clubToUpdateObject);

  // Update the club information. //
  try {
    const response = await fetch(`${API_ENDPOINT}/api/v1/club/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: clubUpdateJSON,
    });

    if (response.ok) {
      setIsUpdateSuccess(true);
      callback();
    } else {
      console.log("Error:", response.status, response.statusText);
      setIsUpdateSuccess(false);
    }
  } catch (error) {
    setIsUpdateSuccess(false);
  }

  setIsSubmitting(false);
  callback();
};
