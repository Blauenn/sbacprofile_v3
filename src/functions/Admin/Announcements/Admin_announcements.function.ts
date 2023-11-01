import { z } from "zod";
import dayjs from "dayjs";
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

const validateAnnoucementObject = (
  announcementObject: any,
  setValidationErrors: any
) => {
  const AnnouncementSchema = z.object({
    announcement_status: z.number(),
    announcement_title: z.string().min(1),
    announcement_description: z.string().min(1),
    announcement_image: z.string(),
  });

  const validationErrors: any = {
    announcement_title: "",
    announcement_status: "",
    announcement_description: "",
  };

  // Perform validation and collect error messages. //
  const validationResult = AnnouncementSchema.safeParse(announcementObject);

  // If validation fails. //
  // Don't submit. //
  if (!validationResult.success) {
    validationResult.error.issues.forEach((issue) => {
      // Add custom error messages based on which validation fails. //
      switch (issue.path[0]) {
        case "announcement_title":
          validationErrors.announcement_title =
            "The title should not be empty.";
          break;
        case "announcement_description":
          validationErrors.announcement_description =
            "The description should not be empty.";
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

const uploadAnnouncementImage = async (
  announcementImage: any,
  announcementImageName: string
) => {
  const announcementImageForm = new FormData();
  announcementImageForm.append("image", announcementImage);
  announcementImageForm.append("filename", `${announcementImageName}`);

  try {
    await fetch(`${API_ENDPOINT}/api/v1/upload/image/announcement`, {
      method: "POST",
      body: announcementImageForm,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const handleAnnouncementCreate = async (
  announcementCreateObject: any,
  announcementImageObject: any,
  announcementImageName: string,
  setValidationErrors: any
) => {
  const currentDate = dayjs();

  const validation = validateAnnoucementObject(
    announcementCreateObject,
    setValidationErrors
  );

  // If the validation passes. //
  if (validation) {
    // Announcement image //
    if (announcementImageObject != null) {
      uploadAnnouncementImage(announcementImageObject, announcementImageName);
    }

    // Announcement information //
    const announcementToCreateObject = {
      announcement_status: announcementCreateObject.announcement_status,
      announcement_title: announcementCreateObject.announcement_title,
      announcement_description:
        announcementCreateObject.announcement_description,
      announcement_image: `/assets/files/announcements/${announcementImageName}`,
      announcement_create_datetime: currentDate,
    };
    const announcementCreateObjectJSON = JSON.stringify(
      announcementToCreateObject
    );

    // Upload the announcement information. //
    try {
      const response = await fetch(
        `${API_ENDPOINT}/api/v1/announcement/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: announcementCreateObjectJSON,
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

export const handleAnnouncementUpdate = async (
  announcementUpdateObject: any,
  announcementImageObject: any,
  announcementImageName: string,
  setValidationErrors: any
) => {
  const updatedAnnouncementToUpdate = {
    announcement_ID: announcementUpdateObject.announcement_ID,
    announcement_status: parseInt(
      announcementUpdateObject.announcement_status,
      10
    ),
    announcement_title: announcementUpdateObject.announcement_title,
    announcement_description: announcementUpdateObject.announcement_description,
    announcement_create_datetime:
      announcementUpdateObject.announcement_create_datetime,
    announcement_image: announcementUpdateObject.announcement_image,
  };

  const validation = validateAnnoucementObject(
    updatedAnnouncementToUpdate,
    setValidationErrors
  );

  // If the validation passes. //
  if (validation) {
    // Announcement image. //
    if (announcementImageObject != null) {
      uploadAnnouncementImage(announcementImageObject, announcementImageName);
    }

    // Announcement information. //
    const announcementUpdateObjectToPost = {
      id: updatedAnnouncementToUpdate.announcement_ID,
      announcementInfo: {
        announcement_status: updatedAnnouncementToUpdate.announcement_status,
        announcement_title: updatedAnnouncementToUpdate.announcement_title,
        announcement_description:
          updatedAnnouncementToUpdate.announcement_description,
        announcement_image: `/assets/files/announcements/${announcementImageName}`,
        announcement_create_datetime:
          updatedAnnouncementToUpdate.announcement_create_datetime,
      },
    };
    const announcementUpdateObjectJSON = JSON.stringify(
      announcementUpdateObjectToPost
    );

    // Upload the announcement information. //
    try {
      const response = await fetch(
        `${API_ENDPOINT}/api/v1/announcement/update`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: announcementUpdateObjectJSON,
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

export const handleAnnouncementDelete = async (announcement_ID: number) => {
  const announcementToDelete = {
    id: announcement_ID,
  };
  const announcementToDeleteJSON = JSON.stringify(announcementToDelete);

  try {
    const response = await fetch(`${API_ENDPOINT}/api/v1/announcement/remove`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: announcementToDeleteJSON,
    });

    if (response.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const get_announcement_status_text = (status: number | undefined) => {
  let status_text;

  if (status === 1) {
    status_text = "Shown";
  } else {
    status_text = "Hidden";
  }

  return status_text;
};
export const get_announcement_status_icon = (status: number | undefined) => {
  let status_text;

  if (status === 1) {
    status_text = "fa-solid fa-eye";
  } else {
    status_text = "fa-solid fa-eye-slash";
  }

  return status_text;
};
