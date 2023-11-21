import { z } from "zod";
import { ValidationErrors } from "../../interfaces/common.interface";
import { uploadFile } from "../fileUpload.function";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";

const validateClubObject = (
  clubObject: any,
  setValidationErrors: React.Dispatch<React.SetStateAction<any>>
) => {
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

  const validationErrors: ValidationErrors = {
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

export const handleClubCreate = async (
  clubCreateObject: any,
  clubImageObject: any,
  clubImageName: string,
  setValidationErrors: React.Dispatch<React.SetStateAction<any>>
) => {
  const updatedClubUpdateObject = {
    club_name: clubCreateObject.club_name,
    club_major: parseInt(clubCreateObject.club_major, 10),
    club_status: parseInt(clubCreateObject.club_status, 10),
    club_description: clubCreateObject.club_description,
    club_image: clubCreateObject.club_image,
    club_capacity: parseInt(clubCreateObject.club_capacity, 10),
  };

  const validation = validateClubObject(
    updatedClubUpdateObject,
    setValidationErrors
  );

  // If the validation passes. //
  if (validation) {
    // Club image //
    if (clubImageObject != null) {
      await uploadFile(
        clubImageObject,
        clubImageName,
        "/api/v1/upload/image/club"
      );
    }

    // Club information //
    const clubToCreateObject = {
      club_name: updatedClubUpdateObject.club_name,
      club_major: updatedClubUpdateObject.club_major,
      club_description: updatedClubUpdateObject.club_description,
      club_image: `/assets/profilePic/clubs/${clubImageName}`,
      club_status: updatedClubUpdateObject.club_status,
      club_capacity: updatedClubUpdateObject.club_capacity,
    };
    const clubToCreateObjectJSON = JSON.stringify(clubToCreateObject);

    // Upload the club information. //
    try {
      const response = await fetch(`${API_ENDPOINT}/api/v1/club/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: clubToCreateObjectJSON,
      });

      if (response.status) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

export const handleClubManagerCRUD = async (
  club_ID: number,
  originalClubTeachers: number[],
  clubTeachers: number[]
) => {
  const clubManagers_toCreate = clubTeachers.filter(
    (teacher: number) => !originalClubTeachers.includes(teacher)
  );
  const clubManagers_toDelete = originalClubTeachers.filter(
    (teacher: number) => !clubTeachers.includes(teacher)
  );

  // Create //
  if (clubManagers_toCreate.length > 0) {
    const clubManagerToCreate = {
      club_ID: club_ID,
      clubManagers: clubManagers_toCreate.map((teacher_ID) => teacher_ID),
    };
    const clubManagerToCreateJSON = JSON.stringify(clubManagerToCreate);

    try {
      const response = await fetch(
        `${API_ENDPOINT}/api/v1/clubManager/createMultiple`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: clubManagerToCreateJSON,
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
  }

  // Delete //
  if (clubManagers_toDelete.length > 0) {
    const clubManagerToDelete = {
      club_ID: club_ID,
      clubManagers: clubManagers_toDelete.map((teacher_ID) => teacher_ID),
    };
    const clubManagerToDeleteJSON = JSON.stringify(clubManagerToDelete);

    // Delete the club manager //
    try {
      const response = await fetch(
        `${API_ENDPOINT}/api/v1/clubManager/deleteMultiple`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: clubManagerToDeleteJSON,
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
  }
};

export const handleClubUpdate = async (
  clubUpdateObject: any,
  clubImageObject: any,
  clubImageName: string,
  setValidationErrors: React.Dispatch<React.SetStateAction<any>>
) => {
  const validation = validateClubObject(clubUpdateObject, setValidationErrors);

  // If validation passes. //
  if (validation) {
    // Club image //
    if (clubImageObject != null) {
      await uploadFile(
        clubImageObject,
        clubImageName,
        "/api/v1/upload/image/club"
      );
    }

    // Update the club. //
    const clubToUpdateObject = {
      id: clubUpdateObject.club_ID,
      clubInfo: {
        club_name: clubUpdateObject.club_name,
        club_major: clubUpdateObject.club_major,
        club_description: clubUpdateObject.club_description,
        club_status: clubUpdateObject.club_status,
        club_capacity: clubUpdateObject.club_capacity,
        club_image: `/assets/profilePic/clubs/${clubImageName}`,
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

export const handleClubDelete = async (club_ID: number) => {
  const clubDelete = {
    id: club_ID,
  };
  const clubDeleteJSON = JSON.stringify(clubDelete);

  try {
    const response = await fetch(`${API_ENDPOINT}/api/v1/club/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: clubDeleteJSON,
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
