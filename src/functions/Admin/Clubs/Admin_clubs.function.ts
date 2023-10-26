import { z } from "zod";
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

const validateClubObject = (clubObject: any, setValidationErrors: any) => {
  const ClubSchema = z.object({
    club_name: z.string().min(1),
    club_major: z.number().refine((value) => value !== 0, {
      message: "Please select a major.",
    }),
    club_status: z.number(),
    club_description: z.string(),
    club_image: z.string(),
    club_capacity: z.number(),
  });

  const validationErrors: any = {
    club_name: "",
    club_major: "",
    club_status: "",
    club_description: "",
    club_image: "",
    club_capacity: "",
  };

  // Perform validation. //
  const validationResult = ClubSchema.safeParse(clubObject);

  // If validation fails. //
  if (!validationResult.success) {
    validationResult.error.issues.forEach((issue: any) => {
      // Add custom error messages based on which validation fails. //
      switch (issue.path[0]) {
        case "club_name":
          validationErrors.club_name = issue.message || "Club name is invalid";
          break;
        case "club_major":
          validationErrors.club_major =
            issue.message || "Club major is invalid";
          break;
        case "club_status":
          validationErrors.club_status =
            issue.message || "Club status is invalid";
          break;
        case "club_description":
          validationErrors.club_description =
            issue.message || "Club description is invalid";
          break;
        case "club_image":
          validationErrors.club_image =
            issue.message || "Club image is invalid";
          break;
        case "club_capacity":
          validationErrors.club_capacity = "Club capacity is invalid";
          break;
        default:
          break;
      }
    });
    setValidationErrors(validationErrors);
    return false;
  } else {
    setValidationErrors(validationErrors);
    return true;
  }
};

export const handleClubUpdate = async (
  clubUpdateObject: any,
  setValidationErrors: any
) => {
  const validation = validateClubObject(clubUpdateObject, setValidationErrors);

  // If validation passes. //
  if (validation) {
    // Update the club. //
    const clubToUpdateObject = {
      id: clubUpdateObject.club_ID,
      clubInfo: {
        club_name: clubUpdateObject.club_name,
        club_major: clubUpdateObject.club_major,
        club_teacher: clubUpdateObject.club_teacher,
        club_description: clubUpdateObject.club_description,
        club_status: clubUpdateObject.club_status,
        club_capacity: clubUpdateObject.club_capacity,
      },
    };
    const clubToUpdateJSON = JSON.stringify(clubToUpdateObject);

    // Update the club information. //
    try {
      const response = await fetch(`${API_ENDPOINT}/api/v1/club/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: clubToUpdateJSON,
      });

      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};
